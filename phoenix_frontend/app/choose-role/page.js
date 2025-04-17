'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ChooseRolePage() {
  const [showModal, setShowModal] = useState(false);
  const [shopName, setShopName] = useState('');
  const [isValidShopName, setIsValidShopName] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const inputRef = useRef(null);

  // Focus on the input field when the modal opens
  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const handleMerchantClick = () => {
    setShowModal(true);
  };

  const handleStart = () => {
    // Only proceed if shopName is valid
    if (isValidShopName && shopName) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        window.location.href = '/signup/';
      }, 1500); // 1.5 seconds delay before redirecting
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShopNameChange = (e) => {
    const name = e.target.value;
    setShopName(name);
    // Check if the shop name is valid (at least 3 characters)
    setIsValidShopName(name.length >= 3);
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[rgba(195,254,121,1)] to-white relative flex flex-col items-center justify-center px-4">
      {/* Logo at top left */}
      <Link href="/" className="absolute top-4 left-4 p-2 bg-white rounded-full">
        <Image src="/p2.svg" alt="Logo" width={80} height={80} />
      </Link>

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center text-black z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[rgba(0,191,99,1)]">
          Before you sign up?
        </h1>
        <p className="text-lg sm:text-xl mb-16 text-green-600">
          Tell us more about yourself
        </p>

        {/* Role Buttons */}
        <div className="flex flex-col sm:flex-row gap-10 w-full max-w-md mt-12">
          <Link href="/signup" className="flex-1">
            <button className="w-full bg-white text-green-700 font-semibold py-4 rounded-full border-4 hover:bg-green-100 text-lg">
              I&apos;m a customer
            </button>
          </Link>

          <button
            onClick={handleMerchantClick}
            className="flex-1 w-full bg-white text-green-700 font-semibold py-4 rounded-full border-4 hover:bg-green-100 text-lg"
          >
            I&apos;m a merchant
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm"
          initial={{ opacity: 0, y: -100 }}  // Initial state (off-screen, invisible)
          animate={{ opacity: 1, y: 0 }}     // Final state (visible and centered)
          exit={{ opacity: 0, y: -100 }}     // State when exiting (off-screen, invisible)
          transition={{ duration: 0.5 }}      // Animation duration
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[80%] max-w-md sm:w-[90%] md:w-[70%] lg:w-[50%] text-center relative z-30 flex flex-col justify-center min-h-[320px] transition-all">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-2xl text-green-700 font-semibold"
            >
              &times;
            </button>

            {/* Modal Heading */}
            <h2 className="text-green-700 font-semibold text-xl italic mb-6">
              Enter Shop name
            </h2>

            <input
              ref={inputRef}
              type="text"
              placeholder="Enter shop name"
              value={shopName}
              onChange={handleShopNameChange}
              className="w-full border-b-2 border-green-500 text-center text-green-700 text-lg font-semibold outline-none mb-6"
            />

            {/* Show error message if shop name is invalid */}
            {shopName && !isValidShopName && (
              <p className="text-red-500 text-sm">Shop name must be at least 3 characters.</p>
            )}

            {showSuccessMessage && (
              <p className="text-green-700 font-semibold">Redirecting you to the sign-up page...</p>
            )}

            {/* Get Started Button */}
            <button
              onClick={handleStart}
              className={`bg-white border-2 border-green-600 text-green-700 font-semibold py-2 px-6 rounded-full hover:bg-green-100 mt-4 ${
                !isValidShopName || !shopName ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isValidShopName || !shopName}
            >
              Get started!
            </button>
          </div>
        </motion.div>
      )}
    </main>
  );
}
