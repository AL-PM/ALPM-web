import React, { useState } from "react";
import "./MyPageHome.css";
import UserEx from "./img/UserEx.png";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"


function MyProfileDetailmenubar({MyPage, setMyPage}){
    return(
        <div>
            <div id="MyProfileDetailmenubar">
                <span id = "DetailMyProfile" style={{fontWeight : MyPage === "1" ? "bold" : "normal", color : MyPage ==="1" ? "#EF4949" : "black"}} onClick={()=>setMyPage("1")}>내 정보</span>
                <span>|</span>
                <span id = "DetailMyCodeBoard" style={{fontWeight : MyPage === "2" ? "bold" : "normal", color : MyPage ==="2" ? "#EF4949" : "black"}} onClick={()=>setMyPage("2")}>내 코드 보드 관리</span>
                <span>|</span>
                <span id = "DetaulMyCodeGroup" style={{fontWeight : MyPage === "3" ? "bold" : "normal", color : MyPage ==="3" ? "#EF4949" : "black"}} onClick={()=>setMyPage("3")}>내 코드 그룹 관리</span>
                <span>|</span>
                <span id = "DetaulMyCode" style={{fontWeight : MyPage === "4" ? "bold" : "normal", color : MyPage ==="4" ? "#EF4949" : "black"}} onClick={()=>setMyPage("4")}>내가 작성한 코드 관리</span>
                <span>|</span>
                <span id = "DetailNewCode" style={{fontWeight : MyPage === "5" ? "bold" : "normal", color : MyPage ==="5" ? "#EF4949" : "black"}} onClick={()=>setMyPage("5")}>새로운 코드 업로드</span>
            </div>
        </div>
    )
}

function MyProfileUserBody(){
    return(
        <div id="MyProfileUserBody">
            <img id="MyProfileUserImage" src={UserEx} alt="UserEx" />
            <div id="MyProfildUserInformationContainer">
                <div id="MyProfileUserUpdown">
                    <span id = "MyProfileUserLeftright" >이름</span>
                    <span id = "MyProfileUserLeftright" >|</span>
                    <span id = "MyProfileUserLeftright">홍길동</span>
                </div>
                <div>
                    <span id = "MyProfileUserLeftright" >사용자 소개</span>
                    <span id = "MyProfileUserLeftright">|</span>
                    <span id = "MyProfileUserLeftright" >안녕하세요 백엔드 개발자 준비중인 홍길동입니다.</span>
                </div>
            </div>
        </div>
    )
}

function MyProfileStudyHistory(){
    return(
        <div id="MyProfileStudyHistory">
            <div id="MyProfileStudyHistoryLogo">
                    <span id = "MyProfileUserLeftright" >|</span>
                    <span id = "MyProfileUserLeftright">사용자 학습 통계</span>
                    <span id = "MyProfileUserLeftright" >|</span>
            </div>
            <div id="MyProfileStudyHistoryBody">
                <div id="MyProfileStudyHistoryNumeric">
                    <div id="MyProfileHistoryUpdown">
                        <span id="MyProfileHistoryLeftright">총 학습한 타자의 수</span>
                        <span id="MyProfileHistoryLeftright">|</span>
                        <span id="MyProfileHistoryLeftright">20192830</span>
                    </div>
                    <div id="MyProfileHistoryUpdown">
                        <span id="MyProfileHistoryLeftright">총 학습한 단어의 수</span>
                        <span id="MyProfileHistoryLeftright">|</span>
                        <span id="MyProfileHistoryLeftright">20192830</span>
                    </div>
                    <div >
                        <span id="MyProfileHistoryLeftright">총 학습한 빈칸의 수</span>
                        <span id="MyProfileHistoryLeftright">|</span>
                        <span id="MyProfileHistoryLeftright">20192830</span>
                    </div>
                </div>
                <div id="MyProfileStudyHistoryGrass"></div>
            </div>
        </div>
    )
}

function MyProfile(){
        let [MyPage, setMyPage] = useState("1");
    return(
        <div id = "MyProfile">
            <MainMenuBar page={"MyPage"} />
            <MyProfileDetailmenubar MyPage={MyPage} setMyPage={setMyPage} />
            {MyPage ==="1" ? <div><MyProfileUserBody /><MyProfileStudyHistory /></div>  : null}
        </div>
    )
}
export default MyProfile;