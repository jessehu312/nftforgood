import React from "react";
import RightChevron from "@/components/shared/RightChevron";

const StepCard = ({ iter, name, desc, img }) => {
  return (
    <div className='relative text-center flex flex-col justify-center items-center'>
      <img className={`w-36 mx-auto`} src={`/images/${img}`} alt={name} />
      {iter < 2 && (
        <div className='hidden md:block animate-pulse absolute top-1/3 -right-1/4'>
          <RightChevron />
        </div>
      )}
      <h2 className='text-primary  text-2xl font-bold text-center mt-4'>
        {name}
      </h2>
      <p className='text-sm text-center leading-5 text-white mt-2'>{desc}</p>
    </div>
  );
};

export default StepCard;
