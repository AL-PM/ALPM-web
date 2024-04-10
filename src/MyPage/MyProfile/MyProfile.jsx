import React, { useState } from "react";
import "./MyProfile.css";
import UserEx from "./img/UserEx.png";
import MainMenuBar from "/Users/chane/alpm_web/src/Etc/MainMenuBar/MainMenuBar.jsx";


function MyProfileDetailmenubar(){
    let [test, testf] = useState("1");
    return(
        <div>
            <div id="MyProfileDetailmenubar">
                <span id = "DetailMyProfile" style={{fontWeight : test === "1" ? "bold" : "normal", color : test ==="1" ? "#EF4949" : "black"}} onClick={()=>testf("1")}>내 정보</span>
                <span>|</span>
                <span id = "DetailMyCodeBoard" style={{fontWeight : test === "2" ? "bold" : "normal", color : test ==="2" ? "#EF4949" : "black"}} onClick={()=>testf("2")}>내 코드 보드 관리</span>
                <span>|</span>
                <span id = "DetaulMyCodeGroup" style={{fontWeight : test === "3" ? "bold" : "normal", color : test ==="3" ? "#EF4949" : "black"}} onClick={()=>testf("3")}>내 코드 그룹 관리</span>
                <span>|</span>
                <span id = "DetaulMyCode" style={{fontWeight : test === "4" ? "bold" : "normal", color : test ==="4" ? "#EF4949" : "black"}} onClick={()=>testf("4")}>내가 작성한 코드 관리</span>
                <span>|</span>
                <span id = "DetailNewCode" style={{fontWeight : test === "5" ? "bold" : "normal", color : test ==="5" ? "#EF4949" : "black"}} onClick={()=>testf("5")}>새로운 코드 업로드</span>
            </div>
            {test ==="1" ? <MyProfileUserBody />  : null}
            {test ==="1" ? <MyProfileStudyHistory />  : null} 
        </div>
    )
}
/*
function MyProfileDetailmenubar(){
    const menuItems = [
        { id: "DetailMyProfile", text: "내 정보" },
        { id: "DetailMyCodeBoard", text: "내 코드 보드 관리" },
        { id: "DetaulMyCodeGroup", text: "내 코드 그룹 관리" },
        { id: "DetaulMyCode", text: "내가 작성한 코드 관리" },
        { id: "DetailNewCode", text: "새로운 코드 업로드" }
    ];

    const [activeItem, setActiveItem] = useState("DetailMyProfile");

    const handleClick = (itemId) => {
        setActiveItem(itemId);
    };

    return(
        <div>
            <div id="MyProfileDetailmenubar">
                {menuItems.map(item => (
                    <span key={item.id} id={item.id} style={{ fontWeight: activeItem === item.id ? "bold" : "normal", color: activeItem === item.id ? "#EF4949" : "black" }} onClick={() => handleClick(item.id)}>
                        {item.text}
                    </span>
                ))}
            </div>
            {activeItem === "DetailMyProfile" && <MyProfileUserBody />}
            {activeItem === "DetailMyProfile" && <MyProfileStudyHistory />} 
        </div>
    );
}
*/

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
    return(
        <div id = "MyProfile">
            <MainMenuBar page={"MyPage"} />
            <MyProfileDetailmenubar />
        </div>
    )
}
export default MyProfile;