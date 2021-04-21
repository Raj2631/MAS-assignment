import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './index.module.css';

const requiredError = 'This field is required';
let validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(requiredError)
    .min(3, 'First name must have more than 3 characters'),
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
          <input name="name" placeholder="Name" {...register('name')} />

          <ErrorMessage
            render={({ message }) => <small>{message}</small>}
            errors={errors}
            name="name"
          />
        </div>
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
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          <ErrorMessage
            render={({ message }) => <small>{message}</small>}
            errors={errors}
            name="confirmPassword"
          />
        </div>
        <button>Register</button>
      </form>
      <p>
        Already have an account?
        <Link className={classes.Link} to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
