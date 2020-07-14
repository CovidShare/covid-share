import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext'

function App() {
  // Get data from the context (this is the consumer)
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // Testing
  console.log(user);
  console.log(isAuthenticated);

  return (
    <p>Testing</p>
  );
}

export default App;
