import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import GoogleLoginBtn from './GoogleLoginBtn';
import './GoogleLoginNew.css';

function GoogleLoginNew() {
    axios.defaults.withCredentials = true;
    const googleLogin = useGoogleLogin({
      flow: 'auth-code',
      onSuccess: async (codeResponse) => {
        console.log(codeResponse);
        try {
          const tokens = await axios.get(`${"http://alpm.duckdns.org"}/${codeResponse.code}/google"`,{
          });
          console.log(tokens);
        } catch (error) {
          console.error(error);
        }
      },
      onError: errorResponse => console.log(errorResponse),
    });
  
    return (
      <div id='Login'>
        <span id='LoginMainLogo'>AL-PM</span>
        <span id='LoginDesctiption'>새로운 알고리즘 학습의 시작!</span>
        <div id='GoogleBtnContainer'>
          <button onClick={() => googleLogin()}>Sign in with Google 🚀</button>
          <GoogleLoginBtn />
        </div>
        
      </div>
    );
}

export default GoogleLoginNew;