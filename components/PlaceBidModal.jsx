import React from 'react';
import { motion } from 'framer-motion';

const PlaceBidModal = ({ setBidModalOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      id="overlay"
      className="fixed inset-0 z-50 overflow-auto h-screen w-full flex flex-row items-center justify-center md:px-0 px-12"
    >
      <div className="flex items-center justify-center py-8 px-4">
        <div className="relative md:w-96 rounded shadow-lg p-6 dark:bg-gray-800 bg-white">
          <svg
            className="cursor-pointer w-6 h-6 absolute top-1 right-1 text-gray-300 cursor-pointer"
            onClick={() => setBidModalOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="mx-auto text-center w-full">
            <img
              alt="NFT Logo"
              src="/images/coin.gif"
              className="w-48 mx-auto"
            />
          </div>
          <p className="text-center pt-3 text-sm leading-5 text-gray-600">
            You should connect your wallet to sign messages and send
            transactions.
          </p>
          <button className="bg-yellow-400 p-2 w-full rounded-full mt-4 text-primary font-bold">
            Connect to wallet
          </button>
          <div className="flex items-center justify-center pt-6">
            <div className="w-1.5 h-1.5 bg-indigo-700 rounded-full mr-2" />
            <div className="w-1.5 h-1.5 dark:bg-black bg-gray-300 rounded-full mr-2" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceBidModal;
