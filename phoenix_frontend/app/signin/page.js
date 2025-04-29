'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // You can replace this with your API call for login.
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to dashboard or home on successful login
        router.push('/merchant');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[rgba(250,240,230,1)] relative flex flex-col items-center justify-center px-4">
      {/* Logo at top left */}
      <Link href="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md">
        <Image src="/p2.svg" alt="Logo" width={80} height={80} />
      </Link>

      {/* Login Form Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6">Login</h1>

        {/* Social Media Login */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <button
            aria-label="Log in with Google"
            className="flex items-center justify-center gap-3 border-2 border-gray-300 bg-white text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm sm:text-base">Log in with Google</span>
          </button>

          <button
            aria-label="Log in with Facebook"
            className="flex items-center justify-center gap-3 border-2 border-gray-300 bg-white text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition"
          >
            <FaFacebookF className="text-lg" />
            <span className="text-sm sm:text-base">Log in with Facebook</span>
          </button>
        </div>

        {/* Email & Password Fields */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 placeholder:text-gray-600 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[rgba(4,192,100,1)] to-[rgba(188,253,114,1)] text-white py-3 px-10 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm sm:text-base">
          <p className="text-gray-800">
            Don’t have an account?{' '}
            <Link className="text-green-600 hover:underline" href="/signup">
              Sign Up
            </Link>
          </p>
          <br />
          <Link href="/forgot-password">
            <p className="text-green-600 hover:underline">Forgot Password?</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
