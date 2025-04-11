// app/api/products/route.js

export async function GET() {
    const products = [
      {
        id: 1,
        title: 'Afro Combo',
        price: 4500,
        rating: 4,
        image: '/comb.jpg',
      },
      {
        id: 2,
        title: 'Wave Kit',
        price: 5200,
        rating: 5,
        image: '/comb.jpg',
      },
      {
        id: 1,
        title: 'Afro Combo',
        price: 4500,
        rating: 4,
        image: '/comb.jpg',
      },
      {
        id: 1,
        title: 'Afro Combo',
        price: 4500,
        rating: 4,
        image: '/comb.jpg',
      },
      {
        id: 1,
        title: 'Afro Combo',
        price: 4500,
        rating: 4,
        image: '/comb.jpg',
      },
      {
        id: 1,
        title: 'Afro Combo',
        price: 4500,
        rating: 4,
        image: '/comb.jpg',
      },
      // add more products
    ];
  
    return Response.json(products);
  }
  