import React from 'react';

const Collectible = ({ name, img, fiatPrice, inStock, totalQuantity }) => {
  return (
    <div className="flex justify-center sm:px-6 px-4">
      <div className="max-w-sm w-full relative rounded-lg shadow bg-gray-800 dark:bg-gray-800">
        <div className="absolute m-4 top-0 right-0"></div>
        <img
          className="h-[15rem] w-full bg-center	object-cover rounded-tl-lg rounded-tr-lg"
          src={`/images/${img}`}
          alt="Keko Egg"
        />
        <div className="py-6 px-6 flex md:items-center justify-between">
          <div>
            <p className="sm:text-lg text-base font-semibold leading-5 text-gray-100">
              {name}
            </p>
            <p className="font-bold sm:text-base text-sm leading-4 pt-3 text-gray-300">
              {fiatPrice}
              <span className="font-normal ml-4">
                {inStock} of {totalQuantity}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collectible;
