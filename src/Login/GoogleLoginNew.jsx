import { useGoogleLogin } from '@react-oauth/google';
import GoogleLoginBtn from './GoogleLoginBtn';
import './GoogleLoginNew.css';

function GoogleLoginNew() {
  const signIn = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (res) => {
      try {
        console.log(res);
        const response = await fetch(`https://alpm.duckdns.org/oauth2/code/google?code=${res.code}`, {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => { console.log(error); }
  });

  return (
    <div id='Login'>
      <span id='LoginMainLogo'>AL-PM</span>
      <span id='LoginDesctiption'>새로운 알고리즘 학습의 시작!</span>
      <div id='GoogleBtnContainer'>
        <button onClick={() => signIn()}>Sign in with Google 🚀</button>
        <GoogleLoginBtn />
      </div>
    </div>
  );
}

export default GoogleLoginNew;
