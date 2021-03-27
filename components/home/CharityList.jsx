import React from 'react';
import CharityCard from '../CharityCard';

const CharityList = () => {
  const charityData = [
    {
      title: 'Justice for Jacob Blake',
      category: 'Social',
      url:
        'https://www.change.org/p/human-rights-campaign-justice-for-jacob-blake',
      img: 'jacob-blake.png'
    },
    {
      title: 'Humanitarian Crisis',
      category: 'Social',
      url: 'https://www.change.org/p/stop-the-war-and-end-the-famine-in-yemen',
      img: 'crisis.png'
    },
    {
      title: 'Covid Healthcare workers',
      category: 'Medical',
      url: 'https://donateppe.org/',
      img: 'covid-healthcare.png'
    }
  ];
  return (
    <div className="bg-primary pt-24 pb-36">
      <div className="max-w-screen-xl mx-auto px-8 py-8 xl:px-0">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-16">
            <h1 className="text-yellow-400 text-5xl font-bold mb-4">
              Featured Projects
            </h1>
            <p className="text-xl text-gray-200 font-normal">
              Let’s make the world a better place with art and blockchain.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-16 lg:gap-x-36">
            {charityData.map((el, idx) => (
              <CharityCard
                key={idx}
                title={el?.title}
                category={el?.category}
                img={el?.img}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityList;
