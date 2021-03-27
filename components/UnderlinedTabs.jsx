import React from 'react';
import UnderlinedTab from './UnderlinedTab';

const UnderlinedTabs = ({ children, buttonStatus, setButtonStatus }) => {
  const onClickTabItem = (tab) => {
    setButtonStatus(tab.target.dataset.value);
  };
  return (
    <div className="float-left w-full mb-14 mt-2">
      {children.map((child, idx) => (
        <UnderlinedTab
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

export default UnderlinedTabs;