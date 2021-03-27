import React, { useState } from 'react';
import CollectibleCard from '../CollectibleCard';
import Tabs from '@/components/home/Tabs';
import Navbar from '@/components/home/Navbar';
import Banner from '@/components/home/Banner';
import Footer from '@/components/home/Footer';

const Collectibles = () => {
  const CollectibleData = Array(12).fill({
    name: '#003 - Keko Egg',
    img: 'keko-egg.svg',
    eth: '0.389 ETH',
    type: 'games',
    qty: '1 of 1'
  });

  const [buttonStatus, setButtonStatus] = useState('All');

  return (
    <div className="bg-pri-indigo">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col items-center justify-center mx-16">
          <h1 className="text-primary text-pri-yellow text-5xl font-bold mb-6 w-full">
            Explore Collectibles
          </h1>
          <Tabs buttonStatus={buttonStatus} setButtonStatus={setButtonStatus}>
            <div label="All"></div>
            <div label="Art"></div>
            <div label="Photography"></div>
            <div label="Games"></div>
            <div label="Memes"></div>
          </Tabs>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 md:gap-12 lg:gap-x-8">
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
      <Banner />
      <Footer />
    </div>
  );
};

export default Collectibles;
