import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Login.css';
import GoogleLogin from './GoogleLogin';

function Login() {
  return (
    <GoogleOAuthProvider clientId='974624999104-as2donm7225f9ofp74er00qvfob57hgm.apps.googleusercontent.com'>
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
}

export default Login;
