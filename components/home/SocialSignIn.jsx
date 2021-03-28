import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuth } from '@/lib/auth';
import { PROFILE_URL } from '@/lib/constants';
import { useRouter } from 'next/router';

const SocialSignIn = ({ setOpen }) => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      className="fixed inset-0 z-50 overflow-auto h-screen w-full flex flex-row items-center justify-center md:px-0 px-12"
    >
      <div className="z-20 bg-primary shadow-lg rounded-sm relative p-4 w-full max-w-md m-auto flex-col flex border-yellow-400 border-t-4 pb-8">
        <svg
          className="w-6 h-6 absolute top-4 right-4 text-gray-300 cursor-pointer"
          onClick={() => setOpen(false)}
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
        <div className="flex flex-col justify-center items-center w-full p-4">
          <div className="flex flex-col items-center space-x-2 pr-1">
            <Image src="/images/logo.png" alt="me" width="75" height="75" />
            <h1 className="mt-4 lg:ml-2 font-bold text-white text-3xl tracking-wide">
              NFT<span className="text-yellow-400">4</span>Good
            </h1>
          </div>
          <p className="text-center text-md mt-4 text-white">
            Log in to get access to your account
          </p>
        </div>
        <div className="mt-4 px-4 flex flex-col space-y-4 items-center justify-center">
          <button
            onClick={() => auth.signInWithGoogle().then(() => router.push(PROFILE_URL))}
            className="bg-white w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <div className="bg-white inline-block p-2 rounded m-1">
              <FcGoogle size={32} />
            </div>
            <span className="mx-auto pr-8 text-lg text-blue-600 font-semibold">
              Google
            </span>
          </button>
          <button
            onClick={() => auth.signInWithGithub().then(() => router.push(PROFILE_URL))}
            className="bg-gray-900 w-full flex flex-row justify-center items-center rounded shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <div className="bg-transparent inline-block p-2 rounded m-1">
              <FaGithub fill="white" size={32} />
            </div>
            <span className="mx-auto pr-8 text-lg text-white font-semibold">
              GitHub
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SocialSignIn;
