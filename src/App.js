import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProfile from './MyPage/MyProfile/MyProfile';
import StudyHome from './Study/StudyHome/StudyHome';
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import CodeGroupHome from './CodeGroupCommunity/CodeGroupHome/CodeGroupHome';


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudyHome />} />
                <Route path="/mypage" element={<MyProfile />} />
                <Route path="/code" element={<CodeHome />} />
                <Route path="/codegroup" element={<CodeGroupHome />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;