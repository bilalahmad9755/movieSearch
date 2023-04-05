import React, { useState , useContext} from 'react';
import {getAuth, signInAnonymously, onAuthStateChanged} from 'firebase/auth';
import { AuthUser } from '../App';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, antiquewhite 30%, white 90%)',
    borderRadius: 3,
    border: 0,
    color: '#0fac98',
    height: 30,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px #0fac98',
  },
});
const AnonymousSignIn = () => {
  const [error, setError] = useState(null);
  const classes = useStyles();
  const {user, setUser} = useContext(AuthUser);
  const handleSignIn = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log('user logged in');
        onAuthStateChanged(auth, (user) => {
          if (user) 
          {
            const uid = user.uid;
            console.log("user_id: ", uid);
            setUser(uid);
          } 
          else 
          {
            alert("Failed to login!");
          }
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <Button className={classes.root} variant='outlined' onClick={handleSignIn}>{user}</Button>
    </div>
  );
};

export default AnonymousSignIn;
