'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function WaitlistSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-green-200 to-white flex flex-col items-center justify-center relative">
      
      {/* Logo */}
      <div className="absolute top-4 left-4 p-2 bg-white rounded-full">
        <Image src="/p2.svg" alt="Logo" width={100} height={100} />
      </div>

      {/* Success Content */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">You`re on the wait list!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your interest in our e-commerce platform. We`ve added you to our wait list and
          will notify you as soon as we`re ready for you.
        </p>
        <Link href="/">
          <button className="bg-[#5e852c] text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-800">
            Return to our homepage
          </button>
        </Link>
      </div>
    </main>
  );
}
