import React from "react";
import "./CodeHome.css";
import CodeSearchIcon from "./img/SearchIcon.png";
import MainMenuBar from "/Users/chane/alpm_web/src/Etc/MainMenuBar/MainMenuBar.jsx";


function CodeHomeSearchBar(props){
    return(
        <div id="CodeHomeSearchBar">
            <span id = "CodeSettingKeyword" >학습 언어</span>
            <span>|</span>
            <span id = "CodeLanguageSetting1" >PYTHON</span>
            <span id = "CodeLanguageSetting2" >JAVA</span>
            <span id = "CodeLanguageSettissng3" >C++</span>
            <span></span>
            <span id = "CodeSettingKeyword" >코드 유형</span>
            <span>|</span>
            <span id = "CodeType1" >ALL</span>
            <span id = "CodeType2" >REFERENCE</span>
            <span id = "CodeType3" >USER_MADE</span>
            <span></span>
            <span id = "CodeSettingKeyword" >검색어</span>
            <span>|</span>
            <input id = "CodeHomeSearchInput" type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            <img id = "CodeHomeSearchButton" src={CodeSearchIcon} alt="CodeSearchIcon"></img>
        </div>
    )
}

function CodeHomebody(){

    return(
        <div id="CodeHomeBody">
        </div>
    )
}

function CodeHomeUploadButton(){
    return(
        <button id="CodeHomeUploadButton">새로운 코드 업로드</button>
    )
}


function CodeCommunity(){

    return(
        <div id = "Codehome">
            <MainMenuBar page={"Code"} />
            <CodeHomeSearchBar />
            <CodeHomebody />
            <CodeHomeUploadButton />
        </div>
       
    )
}

export default CodeCommunity;