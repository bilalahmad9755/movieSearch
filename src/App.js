import './App.css';
import {createContext, useState} from 'react';
import {Interface} from './components/interface';
export const AuthUser = createContext({user:"login", setUser: ()=>{}});

function App() 
{
  const [user, setUser] = useState("login");
  const value = {user, setUser};
  return (
  <div className='App'>
    <AuthUser.Provider value={value}>
      <Interface />
      </AuthUser.Provider>
  </div>
  );
}

export default App;
