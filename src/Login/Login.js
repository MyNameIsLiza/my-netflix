import React from 'react';
import { signInWithGoogle } from '../authentication';
import PropTypes from "prop-types";

function Login({ onReRender } = () => {}) {
  const handleSignIn = () => {
    signInWithGoogle(onReRender);
  };

  return (
    <div className="Login">
      <h1>Hello User</h1>
      <h2>Press button and sign in. It will be funny!</h2>
      <button type="submit" onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}

Login.propTypes = {
    onReRender: PropTypes.func
};

export default Login;
