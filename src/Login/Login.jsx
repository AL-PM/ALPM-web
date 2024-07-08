import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import googleLogo from './img/Google-Logo.png';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  font-family: 'SUITE-Regular';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  text-align: center;
  z-index: 1000;
  font-size: 18px;
  transition: transform 0.5s ease-in-out;
  background-color: ${props => (props.type === 'success' ? '#4bc5fe' : '#ff8f87')};
  color: white;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainLogo = styled.span`
  margin-top: 35vh;
  font-size: 90px;
`;

const Description = styled.span`
  margin-top: 1vh;
  font-size: 30px;
  margin-bottom: 15vh;
`;

const GoogleBtnContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const GoogleLogo = styled.img`
  height: 5vh;
`;

const GoogleBtn = styled.button`
  display: flex;
  gap: 30px;
  border: 0;
  padding-right: 30px;
  padding-left: 30px;
  align-items: center;
  justify-items: center;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoaderText = styled.span`
  margin-top: 30px;
  color: #5C4EFF;
`;

function Banner({ message, type }) {
  return (
    <BannerWrapper type={type}>
      {message}
    </BannerWrapper>
  );
}

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState({ show: false, message: '', type: '' });

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
      setLoading(true); // Ensure loading is true while processing the login response
      // Use Axios to send the request
      axios.get(`https://alpm.duckdns.org:8080/oauth2/code/google`, {
        params: { code },
        // This will handle CORS automatically
        withCredentials: true, // Include credentials if needed
      })
        .then(response => {
          console.log(response);
          // Save access_token and refresh_token to localStorage
          localStorage.setItem('uid', response.data.user.id);
          localStorage.setItem('access_token', response.data.accessToken);
          localStorage.setItem('refresh_token', response.data.refreshToken);

          setBanner({ show: true, message: `안녕하세요 ${response.data.user.name} 사용자님! 정상적으로 로그인되었습니다.`, type: 'success' });

          // Navigate to /study after 3 seconds
          setTimeout(() => {
            navigate('/study');
          }, 3000);
        })
        .catch(error => {
          setBanner({ show: true, message: '로그인에 실패하였습니다. 다시 시도해주세요.', type: 'error' });

          // Reset loading state and show the Google button again after 3 seconds
          setTimeout(() => {
            setLoading(false);
            window.location.href = `https://alpm.pages.dev/`;
          }, 3000);
        });
    } else {
      setLoading(false); // Set loading to false if there is no code parameter
    }
  }, [navigate]);

  return (
    <LoginWrapper>
      {banner.show && <Banner message={banner.message} type={banner.type} />}
      <MainLogo>AL-PM</MainLogo>
      <Description>새로운 알고리즘 학습의 시작!</Description>
      {loading ?
        <LoaderWrapper>
          <HashLoader color={"#5C4EFF"} speedMultiplier={0.8} />
          <LoaderText>로그인 시도중</LoaderText>
        </LoaderWrapper>
        :
        <GoogleBtnContainer>
          <GoogleBtn onClick={handleLogin} disabled={loading}>
            <GoogleLogo src={googleLogo} alt="googleLogo" />
            <span> 구글로 로그인하기 </span>
          </GoogleBtn>
        </GoogleBtnContainer>
      }
    </LoginWrapper>
  );
}

export default Login;
