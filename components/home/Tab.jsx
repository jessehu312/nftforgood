import React from 'react';

const Tab = ({ label, activeTab, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-block cursor-pointer rounded-2xl shadow-sm mr-5 px-9 ${
        activeTab ? 'bg-pri-yellow text-pri-indigo' : 'bg-pri-indigo text-white border'
      } py-2 text-md font-semibold`}
    >
      {label}
    </div>
  );
};

export default Tab;