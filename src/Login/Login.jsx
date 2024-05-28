import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn';

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://alpm.duckdns.org/oauth2/authorization/google";
  };

  return (
    <div>
      <p>On Boarding Page Design</p>
      <button onClick={handleGoogleLogin}>Google Login</button>
      <GoogleLoginBtn />
    </div>
  );
}

export default Login;
