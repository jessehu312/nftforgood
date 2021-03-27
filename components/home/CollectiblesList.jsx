import React from 'react';
import Collectible from '../CollectibleCard';

const CollectiblesList = () => {
  const collectibleData = Array(9).fill({
    name: '003 - Keko Egg',
    fiatPrice: '0.389 ETH',
    img: 'keko-egg.png',
    inStock: 1,
    totalQuantity: 1
  });
  return (
    <div className="bg-primary pb-36">
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-yellow-400 text-5xl font-bold text-center mb-16">
            Trending Collectibles
          </h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-16">
            {collectibleData.map(({name, fiatPrice, img, inStock, totalQuantity}, idx) => (
              <Collectible iter={idx} key={idx} {...{name, img, eth: fiatPrice, qty:`${inStock} of ${totalQuantity}`}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiblesList;
