import React from "react";

const CollectibleCard = ({name, img, eth, type, qty}) => {
  return (
    <div
      data-name={name.split(" ")[0].toLowerCase()}
      className='group bg-white shadow-lg rounded-4xl p-7 pt-8 transform hover:scale-105 transition ease-in-out duration-300 hover:bg-primary stroke-current text-black border-solid border-4 border-gray-300'>
      <img className='w-full mx-auto' src={`/images/${img}`} alt={name} />
      <h2 className='text-primary text-1xl font-bold mt-4'>
        {name}
      </h2>
      <p className='text-sm inline leading-5 text-black font-bold mt-2'>
        {eth}
      </p>
      <p className='text-sm leading-5 text-pri-faded text-right mt-2'>
        {qty}
      </p>
    </div>
  );
};

export default CollectibleCard;