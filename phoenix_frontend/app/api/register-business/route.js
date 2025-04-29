export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const category = formData.get('category');
    const bio = formData.get('bio');
    const instagram = formData.get('instagram');
    const twitter = formData.get('twitter');
    const logo = formData.get('logo'); // this is a Blob

    // Optional: convert Blob to Buffer if you need to upload to a DB or cloud storage
    // const arrayBuffer = await logo.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    console.log('Business Registered:', {
      name,
      category,
      bio,
      instagram,
      twitter,
      logoName: logo?.name,
    });

    return new Response(JSON.stringify({ message: 'Business registered successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to register business' }), {
      status: 500,
    });
  }
}
