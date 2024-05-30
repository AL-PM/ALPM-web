import React, { useEffect } from 'react';
import './Login.css';

function Login() {

  const handleLogin = () => {
    // Redirect the user to Google login screen
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://alpm.pages.dev/&client_id=974624999104-as2donm7225f9ofp74er00qvfob57hgm.apps.googleusercontent.com`;
  };

  useEffect(() => {
    // Check if the URL contains the 'code' parameter after redirection
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      // Log the 'code' value to the console
      console.log(code);
  
      // Use 'no-cors' mode and handle the response
      fetch(`https://alpm.duckdns.org:8080/oauth2/code/google?code=${code}`, {
        mode: 'no-cors'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Since we can't use response.json() with 'no-cors'
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
      // You can perform further actions here, such as exchanging the code for an access token
    }
  }, []); // This effect will run only once after component mount
  
  return (
    <div id='Login'>
      <span id='LoginMainLogo'>AL-PM</span>
      <span id='LoginDesctiption'>새로운 알고리즘 학습의 시작!</span>
      <div id='GoogleBtnContainer'>
        <button onClick={handleLogin}>Sign in with Google 🚀</button>
      </div>
    </div>
  );
}

export default Login;
