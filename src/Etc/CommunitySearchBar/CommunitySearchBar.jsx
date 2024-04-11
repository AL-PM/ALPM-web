import React from "react";
import CodeSearchIcon from "./img/SearchIcon.png";
import './CommunitySearchBar.css';

function CommunitySearchBar({ secondTag, language, setlanguage, reference, setreference, setkeword, searchkeyword}){
    function searchButton(){
        console.log({secondTag, language, reference, searchkeyword});
    }
    return(
        <div id="CommunitySearchBar">
            <span id = "SearchBarSetting" >학습 언어</span>
            <span>|</span>
            <span onClick={()=> setlanguage("PYTHON")} style={{fontWeight:language==="PYTHON" ? "bold" : "normal", color:language==="PYTHON" ? "#FF6B00" : "black"}} >PYTHON </span>
            <span onClick={()=> setlanguage("JAVA")} style={{fontWeight:language==="JAVA" ? "bold" : "normal", color:language==="JAVA" ? "#FF6B00" : "black"}} >JAVA</span>
            <span onClick={()=> setlanguage("C++")} style={{fontWeight:language==="C++" ? "bold" : "normal", color:language==="C++" ? "#FF6B00" : "black"}} >C++</span>
            <span></span>
            <span id = "SearchBarSetting" >{secondTag}</span>
            <span>|</span>
            <span onClick={()=> setreference("ALL")} style={{fontWeight:reference==="ALL" ? "bold" : "normal", color:reference==="ALL" ? "#FF6B00" : "black"}} >ALL</span>
            <span onClick={()=> setreference("REFERENCE")} style={{fontWeight:reference==="REFERENCE" ? "bold" : "normal", color:reference==="REFERENCE" ? "#FF6B00" : "black"}} >REFERENCE</span>
            <span onClick={()=> setreference("USER_MADE")} style={{fontWeight:reference==="USER_MADE" ? "bold" : "normal", color:reference==="USER_MADE" ? "#FF6B00" : "black"}} >USER_MADE</span>
            <span></span>
            <span id = "SearchBarSetting" >검색어</span>
            <span>|</span>
            <input id = "SearchKeywordInput" value={searchkeyword} onChange={(event)=>setkeword(event.target.value)} type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            <img id = "DataLoadbutton" onClick={searchButton} src={CodeSearchIcon} alt="CodeSearchIcon"></img>
        </div>
    )
}

export default CommunitySearchBar;