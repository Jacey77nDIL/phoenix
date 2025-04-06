'use client';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[rgba(195,254,121,1)] to-white relative flex flex-col items-center justify-center px-4">
      {/* Logo at top left */}
      <Link href="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md">
        <Image src="/p2.svg" alt="Logo" width={80} height={80} />
      </Link>

      {/* Login Form Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6">Login</h1>

        {/* Social Media Login */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="flex items-center justify-center gap-3 border-2 border-gray-300 bg-white text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" />
            <span className="text-sm sm:text-base">Log in with Google</span>
          </button>

          <button className="flex items-center justify-center gap-3 border-2 border-gray-300 bg-white text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition">
            <FaFacebookF className="text-lg" />
            <span className="text-sm sm:text-base">Log in with Facebook</span>
          </button>
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-sm sm:text-base text-gray-700 font-medium">Username</label>
          <input
            type="text"
            required
            placeholder="Enter your username"
            className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 placeholder:text-gray-600 text-black"
          />
        </div>

        {/* Email & Password Fields */}
        <form>
          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 placeholder:text-gray-600 text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm sm:text-base text-gray-700 font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 text-black"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#5e852c] text-white py-3 px-10 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Log In
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
