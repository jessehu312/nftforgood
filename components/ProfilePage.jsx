import React, { useState } from 'react';
import Navbar from '@/components/home/Navbar';
import CollectibleCard from '@/components/CollectibleCard';
import Tabs from '@/components/common/Tabs';
import UnderlinedTab from '@/components/common/UnderlinedTab';
import Footer from '@/components/home/Footer';

const ProfilePage = ({ user, collectibles }) => {
  const [buttonStatus, setButtonStatus] = useState('sale');
  if (!user) {
    return null;
  }
  return (
    <div className="bg-pri-indigo">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col items-center justify-center mx-16">
          <img src={user.photoUrl} className="mt-24 rounded-full"></img>
          <h1 className="text-white font-bold text-4xl my-4">{user.name}</h1>
          <h2 className="text-white font-light mb-36">
            So in love with crypto and art
          </h2>
          <Tabs
            buttonStatus={buttonStatus}
            setButtonStatus={setButtonStatus}
            component={UnderlinedTab}
          >
            <div label="On Sale" value="sale"></div>
            <div label="My Collectibles" value="all"></div>
          </Tabs>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-12 lg:gap-x-8">
            {collectibles[buttonStatus].map((el, idx) => (
              <CollectibleCard key={idx} {...el} />
            ))}
          </div>
        </div>
      </div>
      <div className="my-32"></div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
