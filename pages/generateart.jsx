import React, { useState, useRef } from 'react';
import { server } from '@/lib/constants';
import axios from 'axios';
import Navbar from '@/components/home/Navbar';

const GenerateArt = () => {
  const previewRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewRef.current.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="border-b">
        <Navbar />
      </div>
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="grid items-start md:grid-cols-2 gap-24 py-16">
          <div className="flex flex-col space-y-16 w-full items-center justify-center bg-grey-lighter">
            <label className="transition-colors w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
                value={selectedFile}
                onChange={handleFileInput}
                type="file"
                className="hidden"
              />
            </label>
            <img
              className="rounded-lg shadow-lg block w-1/2"
              ref={previewRef}
            />
          </div>
          <div className="w-full rounded shadow bg-white py-12">
            some images yeet
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateArt;
