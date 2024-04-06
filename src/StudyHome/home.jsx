import React from "react";
import "./home.css";

function Homemenubar(){
    return(
        <div id="homemenubar">
            <span id = "Logo" >A.L.P.M</span>
            <span>|</span>
            <span id = "StudyHome" >STUDY HOME</span>
            <span>|</span>
            <span id = "Code" >CODE COMMUNITY</span>
            <span>|</span>
            <span id = "CodeGroup" >CODE GROUP COMMUNITY</span>
            <span>|</span>
            <span id = "Mypage" >MY PAGE</span>
        </div>
    )
}

function Homestudybar(props){
    return(
        <div id="homestudybar">
            <span id = "SettingKeyword" >학습 언어</span>
            <span>|</span>
            <span id = "LanguageSetting1" >PYTHON</span>
            <span id = "LanguageSetting2" >JAVA</span>
            <span id = "LanguageSettissng3" >C++</span>
            <span></span>
            <span id = "SettingKeyword" >학습 방법</span>
            <span>|</span>
            <span id = "MethodSetting1" >따라치기</span>
            <span id = "MethodSetting2" >블록 순서맞추기</span>
            <span id = "MethodSetting3" >줄별 순서맞추기</span>
            <span id = "MethodSetting4" >빈칸 채우기</span>
            <span></span>
            <span id = "SettingKeyword" >코드그룹</span>
            <span>|</span>
            <span id = "GroupSetting1" >블록 순서맞추기</span>
        </div>
    )
}

function Homebody(){
    return(
        <div id="homebody">
        </div>
    )
}


function Home(){

    return(
        <div id = "home">
            <Homemenubar />
            <Homestudybar />
            <Homebody />
        </div>
       
    )
}

export default Home;