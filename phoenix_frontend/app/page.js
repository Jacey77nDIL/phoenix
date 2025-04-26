// pages/index.js

'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-white">
      {/* Main content container */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-6 sm:px-10 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black">
            The Simpler Way To Sell Online
          </h1>
          <p className="text-gray-800 mb-6 sm:mb-8 text-base sm:text-lg">
            Focus on your products, we’ll handle the rest. Our intuitive platform makes it easy
            to create a stunning online store and reach your customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors">
                Sign Up
              </button>
            </Link>
            <Link href="/signin" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border border-green-600 text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Divider with Logo (hidden on small screens) */}
        <div className="hidden md:flex w-[100px] bg-[rgba(193,255,114,1)] justify-center items-center">
          <Image
            src="/p2.svg"
            alt="Logo"
            width={200}
            height={200}
            className="z-20"
          />
        </div>

        {/* Left Image (hidden on mobile) */}
        <div className="hidden md:block w-full md:w-1/2 relative m-6">
          <Image
            src="/p_image.jpeg"
            alt="Landing visual"
            layout="fill"
            objectFit="cover"
            className="rounded-l-2xl"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[rgba(247,247,247,1)] py-4 text-center text-black text-sm px-4">
        Be the first to experience our innovative features and start building your dream business.
      </footer>
    </main>
  );
}
