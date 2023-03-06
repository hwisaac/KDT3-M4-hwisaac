import React, { useState } from 'react';

const useGridFilter = () => {
  const grids = ['list', 'image', 'bigImage', 'gallery'];
  const [grid, setGrid] = useState('');
  return { grids, grid, setGrid };
};

export default useGridFilter;
