import React from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../../components/Button';
import useAuth from '../../components/useAuth';

const Home = () => {
  const context = useAuth();
  return (
    <>
      {!context.authenticated && <Redirect to="/login" />}
      <h1>Hey! You are now logged in.</h1>
      <Button onClick={() => context.logout()}>Logout</Button>
    </>
  );
};

export default Home;
