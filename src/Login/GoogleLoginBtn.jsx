import React from 'react'
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode' // 추가한 코드
import {useNavigate} from 'react-router-dom';

const GoogleLoginBtn = () => {
    const navigator = useNavigate();
    const clientId1 = '417523631224-183jm8m029t0ekot9to8855p1kaenjj4.apps.googleusercontent.com'
    const clientId2 = '974624999104-as2donm7225f9ofp74er00qvfob57hgm.apps.googleusercontent.com'

    console.log(clientId1, clientId2);
  return (
    <div>
        <GoogleOAuthProvider clientId={clientId1}>
            <GoogleLogin onSuccess={(res)=>{
                let data = jwtDecode(res.credential) // 추가한 코드
                console.log(data) // 추가한 코드
                navigator('/Study');
            }}
            onFailure={(err)=>{
                console.log(err)
            }}/>
        </GoogleOAuthProvider>
    </div>
  )
}

export default GoogleLoginBtn