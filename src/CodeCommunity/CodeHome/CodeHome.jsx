import React, { useState } from "react";
import "./CodeHome.css";
import CodeSearchIcon from "./img/SearchIcon.png";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult.jsx";


function CodeHomeSearchBar({language, setlanguage, reference, setreference, setkeword, searchkeyword}){
    function searchButton(){
        console.log({searchkeyword});
    }
    return(
        <div id="CodeHomeSearchBar">
            <span id = "CodeSettingKeyword" >학습 언어</span>
            <span>|</span>
            <span onClick={()=> setlanguage("PYTHON")} style={{fontWeight:language==="PYTHON" ? "bold" : "normal", color:language==="PYTHON" ? "#FF6B00" : "black"}} >PYTHON </span>
            <span onClick={()=> setlanguage("JAVA")} style={{fontWeight:language==="JAVA" ? "bold" : "normal", color:language==="JAVA" ? "#FF6B00" : "black"}} >JAVA</span>
            <span onClick={()=> setlanguage("C++")} style={{fontWeight:language==="C++" ? "bold" : "normal", color:language==="C++" ? "#FF6B00" : "black"}} >C++</span>
            <span></span>
            <span id = "CodeSettingKeyword" >코드 유형</span>
            <span>|</span>
            <span id = "CodeType1" onClick={()=> setreference("ALL")} style={{fontWeight:reference==="ALL" ? "bold" : "normal", color:reference==="ALL" ? "#FF6B00" : "black"}} >ALL</span>
            <span id = "CodeType2" onClick={()=> setreference("REFERENCE")} style={{fontWeight:reference==="REFERENCE" ? "bold" : "normal", color:reference==="REFERENCE" ? "#FF6B00" : "black"}} >REFERENCE</span>
            <span id = "CodeType3" onClick={()=> setreference("USER_MADE")} style={{fontWeight:reference==="USER_MADE" ? "bold" : "normal", color:reference==="USER_MADE" ? "#FF6B00" : "black"}} >USER_MADE</span>
            <span></span>
            <span id = "CodeSettingKeyword" >검색어</span>
            <span>|</span>
            <input id = "CodeHomeSearchInput" value={searchkeyword} onChange={(event)=>setkeword(event.target.value)} type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            <img id = "CodeHomeSearchButton" onClick={searchButton} src={CodeSearchIcon} alt="CodeSearchIcon"></img>
        </div>
    )
}


function CodeHomeUploadButton(){
    return(
        <button id="CodeHomeUploadButton">새로운 코드 업로드</button>
    )
}


function CodeCommunity(){
    const [language, setlanguage] = useState("PYTHON");
    const [reference, setreference] = useState("ALL");
    const [searchkeyword, setkeword] = useState("");
    const searchData = [
        {
            "id": 1,
            "name": "퀵 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "버블 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "힙 정렬",
            "referencedCount": 4,
            "verified": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        
    ]
    return(
        <div id = "Codehome">
            <MainMenuBar page={"Code"} />
            <CodeHomeSearchBar language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            <CodeSearchResult searchData={searchData}/>
            <CodeHomeUploadButton />
        </div>
       
    )
}

export default CodeCommunity;