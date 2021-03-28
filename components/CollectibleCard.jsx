import React from 'react';
import { COLLECTIBLE_URL } from '@/lib/constants';
import { useRouter } from 'next/router';

const CollectibleCard = ({
  name,
  img,
  fiatPrice = <br />,
  inStock,
  totalQuantity,
  id
}) => {
  const router = useRouter();
  return (
    <a onClick={() => router.push(COLLECTIBLE_URL + id)}>
      <div
        data-name={name.split(' ')[0].toLowerCase()}
        className="cursor-pointer h-88 group bg-white shadow-lg rounded-4xl p-7 pt-8 transform hover:scale-105 transition ease-in-out duration-300 hover:bg-white stroke-current text-black border-solid border-4 border-gray-300"
      >
        <img className="w-full mx-auto rounded-xl h-48 w-3/12" src={img} alt={name} />
        <h2 className="text-black text-1xl font-bold mt-4">{name}</h2>
        <p className="text-sm inline leading-5 text-black font-bold mt-2">
          {fiatPrice}
        </p>
        <p className="text-sm leading-5 text-pri-faded text-right mt-2">
          {`${inStock} of ${totalQuantity}`}
        </p>
      </div>
    </a>
  );
};

export default CollectibleCard;
