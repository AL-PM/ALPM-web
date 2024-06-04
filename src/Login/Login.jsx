import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import googleLogo from './img/Google-Logo.png';
import { HashLoader } from 'react-spinners';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true); // Set loading to true when the login button is clicked
    // Redirect the user to Google login screen
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://alpm.pages.dev/&client_id=974624999104-as2donm7225f9ofp74er00qvfob57hgm.apps.googleusercontent.com`;
  };

  useEffect(() => {
    // Check if the URL contains the 'code' parameter after redirection
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Use Axios to send the request
      axios.get(`https://alpm.duckdns.org:8080/oauth2/code/google`, {
        params: { code },
        // This will handle CORS automatically
        withCredentials: true, // Include credentials if needed
      })
        .then(response => {
          // Save access_token and refresh_token to localStorage
          localStorage.setItem('uid', response.data.user.id);
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);

          alert(" 안녕하세요 " + response.data.user.name + " 사용자님! \n 정상적으로 로그인되었습니다.");

          // Navigate to /study on successful login
          navigate('/study');
        })
        .catch(error => {
          alert("로그인에 실패하였습니다. 다시 시도해주세요.");
          // Redirect to the login page on failure
          window.location.href = 'https://alpm.pages.dev/';
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the response
        });
    } else {
      setLoading(false); // Set loading to false if there is no code parameter
    }
  }, [navigate]);

  return (
    <div id='Login'>
      <span id='LoginMainLogo'>AL-PM</span>
      <span id='LoginDesctiption'>새로운 알고리즘 학습의 시작!</span>
      {loading ?
            <div style={{display : "flex", flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              <HashLoader color={"red"} speedMultiplier={0.8} />
              <span style={{marginTop : "30px", color:"red"}}>로그인 시도중</span>
            </div>
           : 
          <div id='GoogleBtnContainer'>
            <button id='GoogleBtn' onClick={handleLogin} disabled={loading}>
              <img id='loginGoogleLogo' src={googleLogo} alt="googleLogo" />
              <span> 구글로 로그인하기 </span>
            </button>
          </div>  
          }
     </div> 
  );
}

export default Login;
