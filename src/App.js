import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import StudyHome from "./Study/StudyHome/StudyHome";
import MyPageHome from "./MyPage/MyPageHome/MyPageHome";
import CodeGroupHome from "./CodeGroupCommunity/CodeGroupHome/CodeGroupHome";
import CodeGroupDetail from "./CodeGroupCommunity/CodeGroupDetail/CodeGroupDetail";
import CodeDetail from "./CodeCommunity/CodeDetail/CodeDetail";
import NewCodeUpload from "./MyPage/NewCodeUpload/NewCodeUpload";


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudyHome />} />
                <Route path="/mypage/" element={<MyPageHome />} />
                <Route path="/code/" element={<CodeHome />} />
                <Route path="/code/Detail" element={<CodeDetail />} />
                <Route path="/codegroup/" element={<CodeGroupHome />} />
                <Route path="/codegroup/Detail" element={<CodeGroupDetail />} />
                <Route path="/mypage/NewCode" element={<NewCodeUpload />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;