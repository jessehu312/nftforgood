import React, { useState } from 'react';
import CollectibleCard from '../CollectibleCard';
import Tabs from '@/components/home/Tabs';
import Navbar from '@/components/home/Navbar';
import Banner from '@/components/home/Banner';
import Footer from '@/components/home/Footer';

const Collectibles = (props) => {
  const [buttonStatus, setButtonStatus] = useState('all');

  return (
    <div className="bg-pri-indigo">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col items-center justify-center mx-16">
          <h1 className="text-primary text-pri-yellow text-5xl font-bold mb-6 w-full">
            Explore Collectibles
          </h1>
          <Tabs buttonStatus={buttonStatus} setButtonStatus={setButtonStatus}>
            <div label="All" value="all"></div>
            <div label="Art" value="art"></div>
            <div label="Photography" value="photography"></div>
            <div label="Games" value="game"></div>
            <div label="Memes" value="meme"></div>
          </Tabs>
          <div className="grid gap-8 md:grid-cols-3 md:gap-12 lg:gap-x-8">
            {props[buttonStatus].map((el, idx) => (
              <CollectibleCard key={idx} {...el} />
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
