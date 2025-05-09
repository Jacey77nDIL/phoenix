from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from models import User,UserCreate,UserInDB,Token,Product
from dotenv import load_dotenv
import motor.motor_asyncio
import os
from urllib.parse import quote_plus
from datetime import datetime, timedelta


load_dotenv()
from fastapi.middleware.cors import CORSMiddleware

if __name__ == "__main__":
    # Make sure FastAPI listens on the environment-provided PORT
    port = int(os.getenv("PORT", 8000))  # default to 8000 if not provided
    uvicorn.run(app, host="0.0.0.0", port=PORT)


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

MONGO_URI = f"mongodb+srv://{quote_plus(MONGO_USERNAME)}:{quote_plus(MONGO_PASSWORD)}@cluster0.fupms7g.mongodb.net/{MONGO_DB_NAME}?retryWrites=true&w=majority"


app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB_NAME]
users_collection = db["users"]
collection = db["products"]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend domain, e.g., [""]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/products")
async def get_products():
    products = await collection.find().to_list(100)
    return products
@app.post("/api/products")
async def create_product(product: Product):
    result = await collection.insert_one(product.dict())
    return {"id": str(result.inserted_id)}


@app.on_event("startup")
async def startup_event():
    try:
        await client.server_info()
        print(" Connected to MongoDB")
        await users_collection.create_index("username", unique=True)
    except Exception as e:
        print(" MongoDB connection failed:", e)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password):
    return pwd_context.hash(password)

async def get_user(username: str):
    user = await users_collection.find_one({"username": username})
    if user:
        user.pop("_id", None)
        return UserInDB(**user)

async def authenticate_user(username: str, password: str):
    user = await get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user


@app.post("/register", status_code=201)
async def register_user(user: UserCreate):
    if await users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_pw = hash_password(user.password)
    new_user = {
        "username": user.username,
        "hashed_password": hashed_pw,
        "full_name": user.full_name
    }
    await users_collection.insert_one(new_user)
    return {"message": "User registered successfully"}

@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=User)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await get_user(username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
