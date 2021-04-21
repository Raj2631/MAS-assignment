import { createContext, useState } from 'react';

export const AuthContext = createContext();

let state = false;

const userToken = localStorage.getItem('UserToken');
if (userToken) {
  state = true;
}
const AuthContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(state);
  const authenticateUser = (user) => {
    localStorage.setItem('UserToken', JSON.stringify(user.token));
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('UserToken');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
