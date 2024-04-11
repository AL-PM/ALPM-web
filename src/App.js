import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import StudyHome from "./Study/StudyHome/StudyHome";
import MyProfile from "./MyPage/MyProfile/MyProfile";
import CodeGroupHome from "./CodeGroupCommunity/CodeGroupHome/CodeGroupHome";
import CodeGroupDetail from "./CodeGroupCommunity/CodeGroupDetail/CodeGroupDetail";


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudyHome />} />
                <Route path="/mypage/myprofile" element={<MyProfile />} />
                <Route path="/code" element={<CodeHome />} />
                <Route path="/codegroup/" element={<CodeGroupHome />} />
                <Route path="/codegroup/Detail" element={<CodeGroupDetail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;