// src/components/LayoutN.js

import React from 'react';
import NavbarUserN from './NavbarUserN';

const LayoutN = ({ children }) => {
  return (
    <div>
      <NavbarUserN />
      <div>{children}</div>
    </div>
  );
};

export default LayoutN;
