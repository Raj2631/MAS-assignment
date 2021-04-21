import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import useAuth from '../../components/useAuth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import classes from './index.module.css';

const requiredError = 'This field is required';
let validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(requiredError)
    .min(3, 'Name must have more than 3 characters'),
  email: yup.string().required(requiredError).email('Email must be valid'),
  password: yup
    .string()
    .required(requiredError)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
    ),
  confirmPassword: yup
    .string()
    .required(requiredError)
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

function Register() {
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

  const onSubmit = async ({ name, email, password }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
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
          name="name"
          placeholder="Name"
          register={register}
          errors={errors}
        />
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
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          errors={errors}
        />
        <Button>Register</Button>
      </form>
      <p className={classes.Para}>
        Already have an account?
        <Link className={classes.Link} to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
