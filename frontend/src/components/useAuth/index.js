import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Something went wrong');
  }
  return context;
};

export default useAuth;
