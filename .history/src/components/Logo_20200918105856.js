import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/app-logo.png"
      {...props}
    />
  );
}

export default Logo;
