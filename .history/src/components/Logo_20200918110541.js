import React from 'react';
import './logostyle.css';
const Logo = (props) => {
  return (
    <img 
    className="app-logo"
      alt="Logo"
      src="/static/app-logo.png"
      {...props}
    />
  );
}

export default Logo;
