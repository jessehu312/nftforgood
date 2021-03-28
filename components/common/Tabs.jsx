import React from 'react';
import Tab from './Tab'

const Tabs = ({ children, buttonStatus, setButtonStatus, Component=Tab }) => {
  const onClickTabItem = (tab) => {
    setButtonStatus(tab.target.dataset.value);
  };
  return (
    <div className="float-left w-full mb-14 mt-2">
      {children.map((child, idx) => (
        <Component
          activeTab={buttonStatus === child.props.value}
          key={idx}
          label={child.props.label}
          value={child.props.value}
          onClick={onClickTabItem}
        />
      ))}
    </div>
  );
};

export default Tabs;
