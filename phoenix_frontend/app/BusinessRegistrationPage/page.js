'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ import router

export default function BusinessRegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    bio: '',
    instagram: '',
    twitter: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const router = useRouter(); // ✅ use router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([\w\d\.-]+)\.([a-z\.]{2,6})(\/[\w\.-]*)*\/?$/;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all required fields
    if (!formData.name || !formData.category || !formData.bio || !formData.instagram) {
      alert('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    // Validate the Instagram URL
    if (formData.instagram && !validateUrl(formData.instagram)) {
      alert("Invalid Instagram URL.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('bio', formData.bio);
    data.append('instagram', formData.instagram);
    data.append('twitter', formData.twitter);
    if (logoFile) {
      data.append('logo', logoFile);
    }

    try {
      const res = await fetch('/api/register-business', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage("Business registered successfully!");
        setTimeout(() => {
          router.push('/merchant'); // Redirect after success
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        alert(result.error || 'Something went wrong.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  // Clear form after submission if needed
  useEffect(() => {
    if (successMessage) {
      setFormData({ name: '', category: '', bio: '', instagram: '', twitter: '' });
      setLogoFile(null);
      setLogoPreview(null);
    }
  }, [successMessage]);

  return (
    <main className="min-h-screen bg-[rgba(250,240,230,1)] flex flex-col items-center justify-center relative px-4 py-8 sm:py-12">
      <Link href="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md">
        <img src="/p2.svg" alt="Logo" width={80} height={80} />
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6">Register Your Business</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Business Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter business name"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 text-black"
            >
              <option value="">Select category</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="food">Food</option>
              <option value="services">Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full mt-2 text-sm text-gray-700"
            />
            {logoPreview && (
              <div className="mt-2">
                <img src={logoPreview} alt="Logo Preview" width="100" height="100" className="rounded-xl" />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Business Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Tell us about your business"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Social Media Links</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram link"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 text-black focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 mb-2"
            />
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Twitter link"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl text-black focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[rgba(4,192,100,1)] to-[rgba(188,253,114,1)] text-white py-3 px-10 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 text-green-500 text-center">{successMessage}</div>
        )}
      </div>
    </main>
  );
}
