import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../components/useAuth';

const Home = () => {
  const context = useAuth();
  return (
    <>
      {!context.authenticated && <Redirect to="/login" />}
      <h1 className="text-center my-24 font-black tracking-tight text-6xl">
        Hey! You are now logged in.
      </h1>
      <button
        className="mb-4 text-sm hover:bg-blue-700 focus:outline-none block mx-auto py-2 px-3 bg-blue-600 text-white text-center"
        onClick={() => context.logout()}
      >
        Logout
      </button>
    </>
  );
};

export default Home;
