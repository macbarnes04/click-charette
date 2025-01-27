import React from 'react';
import Box from './Box';

const Grid = () => {
  return (
    <div id="grid">
      {Array.from({ length: 20 }).map((_, index) => (
        <Box key={index + 1} boxId={index + 1}>
          {/* Add the children for each box like circles, squares, etc */}
        </Box>
      ))}
    </div>
  );
};

export default Grid;