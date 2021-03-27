import React from 'react';

const Banner = () => {
  return (
    <div className="bg-primary py-16">
      <div className="max-w-screen-xl mx-auto px-2 md:px-8 py-16 xl:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="w-3/4 text-4xl md:text-5xl max-w-lg md:text-5xl text-white font-bold">
            Purchase digital assets and make the world a better place.
          </h1>
          <img
            className="mt-16 w-96 md:mt-0 md:w-1/4"
            src="/images/cta.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
