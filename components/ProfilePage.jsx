import React, { useState } from 'react';
import Navbar from '@/components/home/Navbar';
import CollectibleCard from '@/components/CollectibleCard';
import UnderlinedTabs from '@/components/UnderlinedTabs';
import Footer from '@/components/home/Footer';

const ProfilePage = () => {
    const [buttonStatus, setButtonStatus] = useState("On Sale");
  const CollectibleData = [
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    },
    {
      name: "#003 - Keko Egg",
      img: "keko-egg.svg",
      eth: "0.389 ETH",
      type: "games",
      qty: "1 of 1"
    }
  ];

  return (
    <div className='bg-pri-indigo'>
      <Navbar />
      <div className='max-w-screen-xl mx-auto px-8 py-8 xl:px-0'>
        <div className='flex flex-col items-center justify-center mx-16'>
          <img src="/images/ten-hundred.svg" className='mt-24'></img>
          <h1 className='text-white font-bold text-4xl my-2'>Ten Hundred</h1>
          <h2 className='text-white font-light mb-36'>So in love with crypto and art</h2>
          <UnderlinedTabs
            buttonStatus={buttonStatus}
            setButtonStatus={setButtonStatus}
          >
            <div label="On Sale"></div>
            <div label="My Collectibles"></div>
          </UnderlinedTabs>
          <div className='grid gap-8 md:grid-cols-3 lg:grid-cols-4 md:gap-12 lg:gap-x-8'>
          {CollectibleData.map((el, idx) => (
              <CollectibleCard
                key={idx}
                name={el?.name}
                img={el?.img}
                eth={el?.eth}
                type={el?.type}
                qty={el?.qty}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='my-32'></div>
      <Footer />
    </div>
  );
}

export default ProfilePage;