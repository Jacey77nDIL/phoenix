// app/api/upload-product/route.js
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { join } from 'path';

export async function POST(request) {
  try {
    // Get form data
    const formData = await request.formData();
    
    // Extract file and other data
    const name = formData.get('name');
    const price = formData.get('price');
    const imageFile = formData.get('image');
    
    // Validate the inputs
    if (!name || !price || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }
    
    // Get file data
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `product_${timestamp}_${imageFile.name.replace(/\s/g, '_')}`;
    
    // Save to the public directory
    // NOTE: In production, you'd upload to a cloud storage service like S3
    const publicDirectory = path.join(process.cwd(), 'public', 'uploads');
    
    // Make sure the directory exists or create it
    try {
      await writeFile(
        join(publicDirectory, filename),
        buffer
      );
    } catch (e) {
      console.error('Error writing file:', e);
      return NextResponse.json(
        { error: "Failed to save image" }, 
        { status: 500 }
      );
    }
    
    // Return the URL to the saved image
    const imageUrl = `/uploads/${filename}`;
    
    // Here you would typically save product info to your database
    // For now, we just return the image URL
    
    return NextResponse.json({ 
      message: "Product added successfully",
      imageUrl
    });
  } catch (error) {
    console.error('Error handling product upload:', error);
    return NextResponse.json(
      { error: "Failed to process product" }, 
      { status: 500 }
    );
  }
}
