import React from "react";
import "./StudyHome.css";
import MainMenuBar from "/Users/chane/alpm_web/src/Etc/MainMenuBar/MainMenuBar.jsx";


function StudyHomeStudybar(){
    return(
        <div id="StudyHomeStudybar">
            <span id = "StudyHomeSettingKeyword" >학습 언어</span>
            <span>|</span>
            <span id = "StudyHomeLanguageSetting1" >PYTHON</span>
            <span id = "StudyHomeLanguageSetting2" >JAVA</span>
            <span id = "StudyHomeLanguageSetting3" >C++</span>
            <span></span>
            <span id = "StudyHomeSettingKeyword" >학습 방법</span>
            <span>|</span>
            <span id = "StudyHomeMethodSetting1" >따라치기</span>
            <span id = "StudyHomeMethodSetting2" >블록 순서맞추기</span>
            <span id = "StudyHomeMethodSetting3" >줄별 순서맞추기</span>
            <span id = "StudyHomeMethodSetting4" >빈칸 채우기</span>
            <span></span>
            <span id = "StudyHomeSettingKeyword" >코드그룹</span>
            <span>|</span>
            <span id = "StudyHomeGroupSetting1" >블록 순서맞추기</span>
        </div>
    )
}

function StudyHomeBody(){
    return(
        <div id="StudyHomeBody">
        </div>
    )
}


function StudyHome(){

    return(
        <div id = "StudyHome">
            <MainMenuBar page={"Study"} />
            <StudyHomeStudybar />
            <StudyHomeBody />
        </div>
       
    )
}

export default StudyHome;