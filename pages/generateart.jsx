import React, { useState, useEffect, useRef } from 'react';
import { server } from '@/lib/constants';
import axios from 'axios';
import Navbar from '@/components/home/Navbar';
import deepai from 'deepai';
import { storage } from '@/lib/firebase';
import { getUser, decrementCoinResource } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import Loader from '@/components/common/Loader';

const GenerateArt = () => {
  const auth = useAuth();
  const previewRef = useRef();
  const [goodCoins, setGoodCoins] = useState();
  const [styleIndex, setStyleIndex] = useState(0);
  const [selectedFileLink, setSelectedFileLink] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ref = storage.ref().child(`images/${Date.now()}`);

    ref.put(file, { contentType: 'image/png' }).then((data) => {
      data.ref.getDownloadURL().then((url) => {
        setSelectedFileLink(url);
      });
    });

    const reader = new FileReader();
    reader.addEventListener('load', async () => {
      previewRef.current.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchGoodCoins = async () => {
      const user = await getUser(auth?.user?.uid);
      if (user) {
        setGoodCoins(await user?.goodCoins);
      }
    };

    fetchGoodCoins();
    deepai.setApiKey(process.env.NEXT_PUBLIC_DEEPAI_API_KEY);
  }, [goodCoins, auth]);

  const handleSubmit = async () => {
    if (!selectedFileLink) return;
    if (goodCoins <= 0) {
      alert('Not enough Good Coins!');
      return;
    }

    setLoading(true);

    const resp = await deepai.callStandardApi('fast-style-transfer', {
      content: selectedFileLink,
      style: imageStyles[styleIndex]
    });

    const { output_url: ganArt } = resp;

    decrementCoinResource(auth?.user?.uid).then(() =>
      setGoodCoins(goodCoins - 1)
    );

    setLoading(false);

    window.open(ganArt, '_blank').focus();

    /* Download Image: WIP
    let link = document.createElement('a');
    link.download = 'art.png';

    const file = new Blob([ganArt], { type: 'image/png' }, 1);
    link.href = URL.createObjectURL(file);

    link.click();

    URL.revokeObjectURL(link.href);
    */
  };

  const imageStyles = [
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F1.png?alt=media&token=09272c2f-a2c0-451b-a49c-1927a70c010a',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F2.png?alt=media&token=9507e401-641e-4cbc-9e50-9113d35f615d',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F3.png?alt=media&token=7bc8d323-b8f1-49a0-aff2-30db1a2105e5',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F4.png?alt=media&token=d534b9e5-f71f-4f73-b709-0e06f37187ef',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F5.png?alt=media&token=da894aca-8f37-494c-b241-9d097ed2c4e1',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F6.png?alt=media&token=2c57dd5b-006c-4104-bee2-13ee5269887c',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F7.png?alt=media&token=4d9c1537-5667-4be1-924a-eb298be4bc08',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F8.png?alt=media&token=217c849c-4569-4274-9be1-e8842a73e278',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F9.png?alt=media&token=94ea99c7-a358-4be2-bc3b-153e9900dade',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F10.png?alt=media&token=62d1a307-a66f-4bda-9550-844e2dadf999',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F11.png?alt=media&token=61949924-a063-4a1c-8951-d3705bdd1afb',
    'https://firebasestorage.googleapis.com/v0/b/nft4good.appspot.com/o/images%2F12.png?alt=media&token=9f17df41-3a2e-47fc-b917-742f2652174d'
  ];

  return (
    <div className="min-h-screen bg-primary">
      <div className="border-b">
        <Navbar />
      </div>
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="grid items-start md:grid-cols-2 gap-24 py-16">
          <div className="flex flex-col space-y-8 w-full items-start justify-center bg-grey-lighter">
            <h1 className="text-white font-bold text-2xl">Upload photo</h1>
            <div className="flex flex-row items-center justify-start space-x-4 font-bold">
              <img className="w-12 h-12" src="/images/logo.png" />
              <span className="text-lg text-yellow-400">
                Good coin: {goodCoins ?? 0}
              </span>
            </div>
            <label className="w-full transition-colors flex flex-col items-center px-4 py-6 bg-transparent text-blue rounded-lg shadow-lg tracking-wide uppercase border-4 border-blue cursor-pointer hover:text-white border-dashed py-12">
              <svg
                className="text-white w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="text-white mt-2 text-base leading-normal">
                Select a file
              </span>
              <input
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
          <div className="w-full">
            <div className="w-full flex flex-row items-center justify-between mb-12">
              <h1 className="text-white font-bold text-2xl">Choose Style</h1>
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-400 p-2 w-[8rem] rounded-lg mt-4 text-primary font-bold"
                >
                  Submit
                </button>
              )}
            </div>
            <div className="bg-white rounded shadow-sm h-96 overflow-y-scroll">
              <div className="grid grid-cols-3 gap-2 p-4">
                {imageStyles.map((item, idx) => (
                  <img
                    key={item}
                    onClick={() => setStyleIndex(idx)}
                    className={`cursor-pointer rounded-lg ${
                      idx === styleIndex && 'border-8 border-blue-500'
                    }`}
                    src={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateArt;
