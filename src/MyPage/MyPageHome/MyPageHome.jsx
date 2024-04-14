import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./MyPageHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import MyProfile from "../MyProfile/MyProfile.jsx";
import MyCodeBoard from "../MyCodeBoard/MyCodeBoard.jsx";
import MyCodeGroup from "../MyCodeGroup/MyCodeGroup.jsx";
import MyUploadCode from "../MyUploadCode/MyUploadCode.jsx";
import NewCodeUpload from "../NewCodeUpload/NewCodeUpload.jsx";


function MyProfileDetailmenubar({MyPage, setMyPage}){
    const navigator = useNavigate();
    return(
        <div>
            <div id="MyProfileDetailmenubar">
                <span style={{fontWeight : MyPage === "1" ? "bold" : "normal", color : MyPage ==="1" ? "#EF4949" : "black"}} onClick={()=>setMyPage("1")}>내 정보</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "2" ? "bold" : "normal", color : MyPage ==="2" ? "#EF4949" : "black"}} onClick={()=>setMyPage("2")}>내 코드 보드 관리</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "3" ? "bold" : "normal", color : MyPage ==="3" ? "#EF4949" : "black"}} onClick={()=>setMyPage("3")}>내 코드 그룹 관리</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "4" ? "bold" : "normal", color : MyPage ==="4" ? "#EF4949" : "black"}} onClick={()=>setMyPage("4")}>내가 작성한 코드 관리</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "5" ? "bold" : "normal", color : MyPage ==="5" ? "#EF4949" : "black"}} onClick={()=>navigator('/mypage/NewCode')}>새로운 코드 업로드</span>
            </div>
        </div>
    )
}


function MyPageHome(){
        let [MyPage, setMyPage] = useState("1");
    return(
        <div id = "MyPageHome">
            <MainMenuBar page={"MyPage"} />
            <MyProfileDetailmenubar MyPage={MyPage} setMyPage={setMyPage} />
            {MyPage ==="1" ? <MyProfile />  : null}
            {MyPage ==="2" ? <MyCodeBoard /> : null}
            {MyPage ==="3" ? <MyCodeGroup /> : null}
            {MyPage ==="4" ? <MyUploadCode /> : null}
            {MyPage ==="5" ? <NewCodeUpload /> : null}
        </div>
    )
}
export default MyPageHome;