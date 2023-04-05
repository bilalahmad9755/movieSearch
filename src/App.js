import './App.css';
import {createContext, useState} from 'react';
import {Interface} from './components/interface';
export const AuthUser = createContext({user:"login", setUser: ()=>{}});
function App() {
  const [user, setUser] = useState("login");
  const value = {user, setUser};

  return (
  <body className='App'>
    <div>
      <AuthUser.Provider value={value}>
      <Interface />
      </AuthUser.Provider>
    </div>
  </body>
  );
}

export default App;
