import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import useAuth from '../../components/useAuth';

import classes from './index.module.css';
import Button from '../../components/Button';
import Input from '../../components/Input';

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
        <Input
          name="email"
          placeholder="Email"
          register={register}
          errors={errors}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
        />
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
