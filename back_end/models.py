from pydantic import BaseModel
class User(BaseModel):
    username: str
    full_name: str

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    password: str
    full_name: str

class Token(BaseModel):
    access_token: str
    token_type: str
    # Product model
class Product(BaseModel):
    title: str
    price: float
    image: str  
    rating: int = 4