import React from 'react';
// import './logostyle.css';
const Logo = (props) => {
  return (
    <img 
    className="app-logo"
      alt="Logo"
      src="/static/new-logo.png"
      {...props}
    />
  );
}

export default Logo;
