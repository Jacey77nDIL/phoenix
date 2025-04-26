
let products = []; 

export async function GET() {
  return Response.json(products);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newProduct = {
      id: products.length + 1,
      title: body.name,
      price: body.price,
      image: body.image,
      rating: 4
    };

    products.push(newProduct);

    return new Response(JSON.stringify({ message: "Product added", product: newProduct }), {
      status: 201,
    });
  } 
  
  catch (error) {
    return new Response(JSON.stringify({ message: "Failed to add product", error }), {
      status: 500,
    });
  }
}