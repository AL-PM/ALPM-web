import React from "react";
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import StudyHome from "./Study/StudyHome/StudyHome";
import MyProfile from "./MyPage/MyProfile/MyProfile";
import CodeGroupHome from "./CodeGroupCommunity/CodeGroupHome/CodeGroupHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudyHome />} />
                <Route path="/mypage/myprofile" element={<MyProfile />} />
                <Route path="/code" element={<CodeHome />} />
                <Route path="/codegroup" element={<CodeGroupHome />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;