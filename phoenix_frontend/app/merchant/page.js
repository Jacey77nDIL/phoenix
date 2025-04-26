'use client';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';

export default function MerchantPage() {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: null, description: '' });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProductList(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setErrorMessage('Failed to fetch products.');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setConfirmationMessage('');
    setErrorMessage('');
    if (!showModal) {
      setNewProduct({ name: '', price: '', image: null, description: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setLoading(true);
      setNewProduct((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file,
      }));
      setLoading(false);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);

    if (newProduct.imageFile) {
      formData.append('image', newProduct.imageFile);
    }

    try {
      const response = await fetch('/api/upload-product', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setProductList((prev) => [
          ...prev,
          {
            id: productList.length + 1,
            title: newProduct.name,
            price: newProduct.price,
            image: result.imageUrl,
            rating: 4,
          },
        ]);
        setConfirmationMessage('Product added successfully!');
        setShowModal(false);
      } else {
        setConfirmationMessage('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setConfirmationMessage('Error adding product.');
    }
  };

  return (
    <div className="bg-[rgba(250,240,230,1)] min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-[rgba(250,240,230,1)] flex flex-col sm:flex-row items-center justify-between py-4 px-6 gap-4">
        <Link href="/">
          <Image src="/p2.svg" alt="Logo" width={100} height={100} />
        </Link>

        <div className="flex items-center flex-1 max-w-lg mx-4 bg-white rounded-md px-4 py-2">
          <BiSearchAlt className="text-gray-500 text-2xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-3 text-black rounded-md focus:outline-none"
            aria-label="Search products"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md">
            <FaShoppingCart className="text-green-600 text-2xl" />
            <span className="text-green-600 text-lg font-semibold">Cart</span>
          </div>
          <BsPlusCircle
            className="text-green-700 text-3xl hover:text-green-900 cursor-pointer"
            onClick={toggleModal}
            aria-label="Add new product"
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-64 p-6 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image src="/profile.jpg" alt="Profile" width={128} height={128} className="object-cover" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-center text-black">John Doe</h2>
          <p className="text-gray-800 text-center mb-4">Lorem ipsum dolor sit amet...</p>
          <div className="flex sm:gap-4 gap-2 justify-center">
            <FaInstagram className="text-pink-500 text-2xl cursor-pointer hover:scale-110 transition" />
            <FaWhatsapp className="text-green-500 text-2xl cursor-pointer hover:scale-110 transition" />
            <FaFacebookF className="text-blue-600 text-2xl cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productList.map((product, index) => (
              <div key={product.id || index} className="flex flex-col items-start gap-2 transform transition-transform hover:scale-105 hover:shadow-lg">
                <div className="w-full h-48 overflow-hidden rounded-lg mb-1">
                  <Image src={product.image} alt={product.title} width={192} height={192} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold text-black">{product.title}</h3>
                <p className="text-xl font-bold text-black">₦ {product.price}</p>
                <div className="flex text-yellow-500 text-3xl">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? 'text-yellow-500' : 'text-gray-400'}>★</span>
                  ))}
                </div>
                <button className="mt-2 px-6 py-2 bg-green-500 border border-black text-black rounded hover:bg-green-600 hover:scale-105 transition" aria-label="Add to Cart">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">Add New Product</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-red-500 text-2xl"
                aria-label="Close Modal"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                  aria-label="Product Name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                  aria-label="Product Price"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  accept="image/*"
                  required
                  aria-label="Product Image"
                />
                {loading && <p className="text-sm text-gray-500">Uploading image...</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </button>
            </form>
            {confirmationMessage && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 text-center rounded-md">
                {confirmationMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 text-center rounded-md">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
