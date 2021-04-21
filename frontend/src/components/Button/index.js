import React from 'react';

import classes from './index.module.css';

const Button = ({ children, ...rest }) => {
  return (
    <button className={classes.Button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
