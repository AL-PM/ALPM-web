import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginNew from './GoogleLoginNew';

function Login() {
  return (
    <div>
      <GoogleOAuthProvider clientId='974624999104-as2donm7225f9ofp74er00qvfob57hgm.apps.googleusercontent.com' >
        <GoogleLoginNew />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;
