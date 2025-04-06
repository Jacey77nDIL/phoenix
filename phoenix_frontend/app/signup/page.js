'use client';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/waitlist-success');
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[rgba(195,254,121,1)] to-white relative flex flex-col items-center justify-center px-4">
      {/* Logo at top left */}
      <Link href="/" className="absolute top-4 left-4 p-2 bg-white rounded-full">
        <Image src="/p2.svg" alt="Logo" width={80} height={80} />
      </Link>

      {/* Form Box */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-4">Sign Up</h1>

        {/* Social Sign Up Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="flex items-center justify-center gap-3 border-2 border-gray-300 bg-white text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100">
            <FcGoogle className="text-lg" />
            <span className="text-sm">Sign up with Google</span>
          </button>

          <button className="flex items-center justify-center gap-3 border-2 border-gray-300 bg-white text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50">
            <FaFacebookF className="text-lg" />
            <span className="text-sm">Sign up with Facebook</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-base sm:text-lg text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 placeholder:text-gray-600 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-base sm:text-lg text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 text-black"
          />
        </div>


        {/* Sign Up Button */}
        <button
          className="w-full bg-[#5e852c] text-white py-3 px-10 rounded-xl font-semibold hover:bg-green-800"
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm sm:text-base">
          <p className="text-gray-800">
            Already have an account? <Link className="text-green-600 hover:underline" href="/signin">Login</Link>
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
