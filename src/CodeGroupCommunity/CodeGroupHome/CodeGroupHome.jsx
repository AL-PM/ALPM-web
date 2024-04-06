import React from "react";
import "./CodeGroupHome.css";
import CodeGroupSearchIcon from "./img/SearchIcon.png";

function CodeGroupHomemenubar(){
    return(
        <div id="CodeGroupHomeMenuBar">
            <span id = "CodeGroupLogo" >A.L.P.M</span>
            <span>|</span>
            <span id = "CodeGroupStudyHome" >STUDY HOME</span>
            <span>|</span>
            <span id = "CodeGroupCode" >CODE COMMUNITY</span>
            <span>|</span>
            <span id = "CodeGroupCodeGroup" >CODE GROUP COMMUNITY</span>
            <span>|</span>
            <span id = "CodeGroupMypage" >MY PAGE</span>
        </div>
    )
}

function CodeGroupHomeSearchBar(props){
    return(
        <div id="CodeGroupHomeSearchBar">
            <span id = "CodeGroupSettingKeyword" >학습 언어</span>
            <span>|</span>
            <span id = "CodeGroupLanguageSetting1" >PYTHON</span>
            <span id = "CodeGroupLanguageSetting1" >JAVA</span>
            <span id = "CodeGroupLanguageSetting1" >C++</span>
            <span></span>
            <span id = "CodeGroupSettingKeyword" >그룹 제작자</span>
            <span>|</span>
            <span id = "CodeGroupType1" >ALL</span>
            <span id = "CodeGroupType2" >REFERENCE</span>
            <span id = "CodeGroupType3" >USER_MADE</span>
            <span></span>
            <span id = "CodeGroupSettingKeyword" >검색어</span>
            <span>|</span>
            <input id = "CodeGroupHomeSearchInput" type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            <img id = "CodeGroupHomeSearchButton" src={CodeGroupSearchIcon} alt="CodeGroupSearchIcon"></img>
        </div>
    )
}

function CodeGroupHomebody(){

    return(
        <div id="CodeGroupHomeBody">
        </div>
    )
}


function CodeGrupHome(){

    return(
        <div id = "CodeGroupHome">
            <CodeGroupHomemenubar />
            <CodeGroupHomeSearchBar />
            <CodeGroupHomebody />
        </div>
       
    )
}

export default CodeGrupHome;