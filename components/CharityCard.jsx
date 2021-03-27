import React from 'react';

const CharityCard = ({ title, category, url, img }) => {
  return (
    <div
      onClick={() => window.open(url).focus()}
      className="group cursor-pointer bg-dark-gray shadow-lg rounded-lg h-72 transform hover:scale-105 transition ease-in-out duration-300 hover:bg-primary bg-cover mt-auto"
      style={{
        backgroundImage: `url(./images/${img})`,
        filter: 'grayscale(0.1)'
      }}
    >
      <div className="h-full mt-auto flex flex-col items-start justify-end">
        <h2 className="text-left text-white text-3xl font-bold text-center ml-4">
          {title}
        </h2>
        <p className="text-sm font-bold text-center leading-5 text-white group-hover:text-white ml-4 mb-4">
          {category}
        </p>
      </div>
    </div>
  );
};

export default CharityCard;
