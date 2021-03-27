import React from 'react';
import Tab from './Tab';

const Tabs = ({ children, buttonStatus, setButtonStatus }) => {
  const onClickTabItem = (tab) => {
    setButtonStatus(tab.target.innerText);
  };
  return (
    <div className="float-left w-full mb-14 mt-2">
      {children.map((child, idx) => (
        <Tab
          activeTab={buttonStatus === child.props.label}
          key={idx}
          label={child.props.label}
          onClick={onClickTabItem}
        />
      ))}
    </div>
  );
};

export default Tabs;
