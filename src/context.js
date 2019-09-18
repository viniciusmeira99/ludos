import React from 'react';
import Proptype from 'prop-types';

const saveUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return;
  }

  localStorage.removeItem('user');
};

const getSavedUser = () => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

const Context = React.createContext({
  user: getSavedUser(),
  setUser: () => undefined,
});


const Provider = ({
  children,
}) => {
  const [user, setUser] = React.useState(getSavedUser);
  React.useEffect(() => {
    saveUser(user);
  }, [user]);
  return (
    <Context.Provider 
      value={{
        user,
        setUser,
      }}
    > 
      {children}
    </Context.Provider>
  )
};

Provider.propTypes = {
  children: Proptype.node.isRequired,
};

export {
  Context,
  Provider,
};

