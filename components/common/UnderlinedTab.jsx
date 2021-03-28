import React from 'react';

const UnderlinedTab = ({ label, value, activeTab, onClick }) => {
  return (
    <div
      onClick={onClick}
      data-value={value}
      className={`inline-block cursor-pointer shadow-sm mr-5 px-5 text-white font-bold text-4xl my-2 ${
        activeTab ? 'border-b-4 border-pri-yellow' : 'bg-pri-indigo text-white'
      } py-2 text-md font-semibold`}
    >
      {label}
    </div>
  );
};

export default UnderlinedTab;