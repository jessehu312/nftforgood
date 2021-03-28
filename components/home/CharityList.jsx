import React from 'react';
import CharityCard from '../CharityCard';

const CharityList = () => {
  const charityData = [
    {
      title: 'Friends of Animals',
      category: 'Animal Protection Charities',
      url: 'https://www.charitywatch.org/charities/friends-of-animals',
      img: 'animals.png'
    },
    {
      title: 'National Council on Aging',
      category: 'Senior Citizens Charities',
      url: 'https://www.charitywatch.org/charities/national-council-on-aging',
      img: 'aging.png'
    },
    {
      title: 'Feeding America',
      category: 'Hunger Charities',
      url: 'https://www.charitywatch.org/charities/feeding-america',
      img: 'feeding-america.png'
    },
    {
      title: 'International Medical Corps',
      category: 'International Relief & Development Charities',
      url: 'https://www.charitywatch.org/charities/international-medical-corps',
      img: 'international-medical-corps.png'
    }
  ];
  return (
    <div className="bg-primary pt-24 pb-36">
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-16">
            <h1 className="text-yellow-400 text-center text-5xl font-bold mb-4">
              Featured Projects
            </h1>
            <p className="text-xl text-gray-200 font-normal">
              Let’s make the world a better place with art and blockchain.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-16 lg:gap-x-18">
            {charityData.map((el, idx) => (
              <CharityCard key={idx} {...el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityList;
