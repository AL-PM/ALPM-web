import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import StudyHome from "./Study/StudyHome/StudyHome";
import CodeGroupHome from "./CodeGroupCommunity/CodeGroupHome/CodeGroupHome";
import CodeGroupDetail from "./CodeGroupCommunity/CodeGroupDetail/CodeGroupDetail";
import CodeDetail from "./CodeCommunity/CodeDetail/CodeDetail";
import NewCodeUpload from "./MyPage/NewCodeUpload/NewCodeUpload";
import MyProfile from "./MyPage/MyProfile/MyProfile";
import MyCodeBoard from "./MyPage/MyCodeBoard/MyCodeBoard";
import MyCodeGroup from "./MyPage/MyCodeGroup/MyCodeGroup";
import MyUploadCode from "./MyPage/MyUploadCode/MyUploadCode";
import CodeMod from "./CodeCommunity/CodeMod/CodeMod";
import Login from "./Login/Login";



function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/study/" element={<StudyHome />} />
                <Route path="/code/" element={<CodeHome />} />
                <Route path="/code/Detail" element={<CodeDetail />} />
                <Route path="/code/Mod" element={<CodeMod />} />
                <Route path="/codegroup/" element={<CodeGroupHome />} />
                <Route path="/codegroup/Detail" element={<CodeGroupDetail />} />
                <Route path="/mypage/" element={<MyProfile />} />
                <Route path="/mypage/MyCodeBoard" element={<MyCodeBoard />} />
                <Route path="/mypage/MyCodeGroup" element={<MyCodeGroup />} />
                <Route path="/mypage/MyUploadCode" element={<MyUploadCode />} />
                <Route path="/mypage/NewCode" element={<NewCodeUpload />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;