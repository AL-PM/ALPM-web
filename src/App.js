import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyProfile from './MyPage/MyProfile/MyProfile';
import StudyHome from './Study/StudyHome/StudyHome';
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import CodeGroupHome from './CodeGroupCommunity/CodeGroupHome/CodeGroupHome';


function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/home"><StudyHome /></Route>
                <Route path="/mypage"><MyProfile /></Route>
                <Route path="/code"><CodeHome /></Route> 
                <Route path="/codegroup"><CodeGroupHome /></Route> 
            </Switch>
        </BrowserRouter>

        /*
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudyHome />} />
                <Route path="/mypage" element={<MyProfile />} />
                <Route path="/code" element={<CodeHome />} />
                <Route path="/codegroup" element={<CodeGroupHome />} />
            </Routes>
        </BrowserRouter>
        */
    )
}

export default App;