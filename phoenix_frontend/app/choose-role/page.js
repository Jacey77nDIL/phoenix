'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ChooseRolePage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[rgba(195,254,121,1)] to-white relative flex flex-col items-center justify-center px-4">
      {/* Logo at top left */}
      <Link href="/" className="absolute top-4 left-4 p-2 bg-white rounded-full">
        <Image src="/p2.svg" alt="Logo" width={80} height={80} />
      </Link>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center text-black">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[rgba(0,191,99,1)]">
          Before you sign up?
        </h1>
        <p className="text-base sm:text-lg mb-8 text-green-600">
          Tell us more about yourself
        </p>

        {/* Role Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link href="/signup" className="flex-1">
            <button className="w-full bg-white text-green-700 font-semibold py-3 rounded-full border-4 hover:bg-green-100">
              I&apos;m a customer
            </button>
          </Link>

          <Link href="/signup" className="flex-1">
            <button className="w-full bg-white text-green-700 font-semibold py-3 rounded-full border-4 hover:bg-green-100">
              I&apos;m a merchant
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
