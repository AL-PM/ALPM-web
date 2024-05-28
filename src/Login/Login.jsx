import React from 'react';
import GoogleLoginBtn from './GoogleLoginBtn';
import './Login.css';

function Login() {
  /*
  const handleGoogleLogin = () => {
    window.location.href = "http://alpm.duckdns.org/oauth2/authorization/google";
  };
  */

  return (
    <div id='Login'>
      <span id='LoginMainLogo'>AL-PM</span>
      <span id='LoginDesctiption'>새로운 알고리즘 학습의 시작!</span>
      <GoogleLoginBtn />
    </div>
  );
}

export default Login;
