import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './index.module.css';

const requiredError = 'This field is required';
let validationSchema = yup.object().shape({
  email: yup.string().required(requiredError),
  password: yup.string().required(requiredError),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => console.log(data);
  return (
    <div className={classes.Container}>
      <h1>Evernote</h1>
      <p>Remember, everything is important</p>
      <form className={classes.Form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input name="email" placeholder="Email" {...register('email')} />
          <ErrorMessage
            render={({ message }) => <small>{message}</small>}
            errors={errors}
            name="email"
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          <ErrorMessage
            render={({ message }) => <small>{message}</small>}
            errors={errors}
            name="password"
          />
        </div>
        <button>Login</button>
      </form>
      <p>
        New user? Create an account
        <Link className={classes.Link} to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
