import React, { useState, useEffect } from 'react';
import {
  getCollectibleIds,
  getCollectible,
  incrementViews
} from '@/lib/firestore';
import Navbar from '@/components/home/Navbar';
import PlaceBidModal from '@/components/PlaceBidModal';

const CollectibleProductPage = ({
  name,
  id,
  description,
  img,
  fiatPrice,
  inStock,
  totalQuantity,
  creatorName,
  creatorPhotoUrl,
  percentToCharity,
  charityName
}) => {
  const [isBidModalOpen, setBidModalOpen] = useState(false);
  const [infoTabOpen, setInfoTabOpen] = useState(true);
  useEffect(() => {
    incrementViews(id);
  }, []);
  return (
    <div className="min-h-screen bg-primary">
      <div className="border-b">
        <Navbar />
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="grid items-center md:grid-cols-2 gap-24 py-16">
          <img
            className="mx-auto text-center rounded-lg"
            src={img}
            alt={name}
          />
          <div className="transition-all border rounded-lg p-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {name}
            </h1>
            <div className="flex flex-row space-x-4 mt-2">
              <p className="text-yellow-400 text-lg font-medium">{fiatPrice}</p>
              <span className="text-gray-200 font-normal tracking-wide">
                {inStock} of {totalQuantity}
              </span>
            </div>
            <div className="mt-8 flex flex-row items-center justify-start space-x-4">
              <span
                onClick={() => setInfoTabOpen(true)}
                className={`cursor-pointer text-white font-semibold ${
                  infoTabOpen && 'border-b-2 border-yellow-400'
                }`}
              >
                Info
              </span>
              <span
                onClick={() => setInfoTabOpen(false)}
                className={`cursor-pointer text-white font-semibold ${
                  !infoTabOpen && 'border-b-2 border-yellow-400'
                }`}
              >
                Bids History
              </span>
            </div>
            {infoTabOpen ? (
              <div>
                <div className="mt-8 flex flex-col space-y-1">
                  <h2 className="text-white font-semibold">Description</h2>
                  <p className="text-gray-100 font-light">{description}</p>
                </div>
                <div className="mt-6 flex flex-col space-y-1">
                  <p className="text-white font-semibold mb-1">Creator</p>
                  <div className="flex flex-row items-center space-x-2">
                    <img
                      className="rounded-full w-12 h-12 object-cover"
                      src={creatorPhotoUrl}
                      alt={name}
                    />
                    <span className="text-white font-semibold mb-1">
                      {creatorName}
                    </span>
                  </div>
                </div>
                <div className="text-gray-100 mt-6">
                  <span className="font-medium text-yellow-400">
                    {percentToCharity}
                  </span>{' '}
                  of sales will go to this charity:
                  <p className="text-gray-100 font-bold mt-2">{charityName}</p>
                </div>
                <div className="mt-6">
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex flex-row items-center space-x-2 mb-4">
                      <img
                        className="rounded-full w-12 h-12 object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9gqFKRn28xKHD1CAbEevdzsLmsv5yQkGnQ&usqp=CAU"
                        alt={name}
                      />
                      <div className="flex flex-col justify-center items-start">
                        <div className="text-gray-800 font-semibold">
                          Highest bid by{' '}
                          <span className="font-bold">John Doe</span>
                        </div>
                        <span className="text-gray-800 font-semibold">
                          0.07 ETH
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setBidModalOpen(true)}
                      className="rounded-lg bg-primary text-white p-4 w-full"
                    >
                      Place a Bid
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-lg shadow-lg bg-yellow-500 py-2 text-white text-center">
                No active bids
              </div>
            )}
          </div>
        </div>
      </div>
      {isBidModalOpen && <PlaceBidModal setBidModalOpen={setBidModalOpen} />}
    </div>
  );
};

export async function getStaticPaths() {
  const paths = await getCollectibleIds();
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log(await getCollectible(params.id));
  return {
    props: { ...(await getCollectible(params.id)), id: params.id },
    revalidate: 1
  };
}

export default CollectibleProductPage;
