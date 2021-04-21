import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import useAuth from '../../components/useAuth';

import classes from './index.module.css';
import Button from '../../components/Button';

const requiredError = 'This field is required';
let validationSchema = yup.object().shape({
  email: yup.string().required(requiredError),
  password: yup.string().required(requiredError),
});

function Login() {
  const [error, setError] = useState('');
  const context = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      context.authenticateUser(data);
      history.push('/');
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  return (
    <div className={classes.Container}>
      {context.authenticated && <Redirect to="/" />}
      <h1>Evernote</h1>
      <p className={classes.Para}>Remember, everything is important</p>
      {error && <p className={classes.ErrorText}>{error}</p>}
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
        <Button>Login</Button>
      </form>
      <p className={classes.Para}>
        New user? Create an account
        <Link className={classes.Link} to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
