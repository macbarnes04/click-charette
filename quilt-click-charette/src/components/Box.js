import React from 'react';

const Box = ({ boxId, children }) => {
  return (
    <div id={`box${boxId}`} className={`box ${getBoxClasses(boxId)}`}>
      {children}
    </div>
  );
};

const getBoxClasses = (boxId) => {
  switch (boxId) {
    case 1:
      return 'navy';
    case 2:
      return 'light-grey';
    default:
      return 'white';
  }
};

export default Box;
