import { ErrorMessage } from '@hookform/error-message';

import classes from './index.module.css';

const Input = ({ register, errors, ...rest }) => {
  return (
    <div className={classes.Container}>
      <input className={classes.Input} {...rest} {...register(rest.name)} />
      <ErrorMessage
        render={({ message }) => (
          <small className={classes.ErrorMessage}>{message}</small>
        )}
        errors={errors}
        name={rest.name}
      />
    </div>
  );
};

export default Input;
