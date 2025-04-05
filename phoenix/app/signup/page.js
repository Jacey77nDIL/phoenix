'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-green-200 to-white relative">
      {/* Logo at top left with blend effect */}
      <div className="absolute top-4 left-4 p-2 bg-white rounded-full">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Sign Up Form Section */}
      <div className="flex justify-center items-center h-full px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-4">Sign Up</h1>

          {/* Social Media Sign Up */}
          <div className="flex gap-4 mb-8">
            <button className="w-full bg-white text-green-700 border border-green-700 py-3 rounded-xl font-semibold hover:bg-green-100">
              <span>Google</span>
            </button>
            <button className="w-full bg-white text-green-700 border border-green-700 py-3 rounded-xl font-semibold hover:bg-green-100">
              <span>Facebook</span>
            </button>
          </div>

          {/* Email and Password Form Fields */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 py-3 px-4 rounded-xl mt-2 focus:outline-none focus:border-green-600"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800">
            Sign Up
          </button>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <Link href="/login">
              <p className="text-green-600 hover:underline">Already have an account? Login</p>
            </Link>
            <br />
            <Link href="/forgot-password">
              <p className="text-green-600 hover:underline">Forgot Password?</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
