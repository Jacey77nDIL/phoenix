'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ChooseRolePage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-green-200 to-white relative">
      {/* Logo at top left with blend effect */}
      <div className="absolute top-4 left-4 p-2 bg-white rounded-full">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full px-4 pt-32"> {/* Adjusted padding-top for better vertical balance */}
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold mb-4 text-green-700">Before you sign up</h1>
          <p className="text-lg mb-10 text-green-600">Tell us more about yourself</p>

          {/* Role Buttons */}
          <div className="flex justify-between w-full max-w-md gap-8">
            <Link href="/signup" className="flex-1">
              <button className="w-full bg-white text-green-700 font-semibold py-3 rounded-xl hover:bg-green-100">
                I`m a customer
              </button>
            </Link>

            <Link href="/signup" className="flex-1">
              <button className="w-full bg-white text-green-700 font-semibold py-3 rounded-xl hover:bg-green-100">
                I`m a merchant
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
