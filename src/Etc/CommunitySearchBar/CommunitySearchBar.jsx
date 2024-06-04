import React from "react";
import './CommunitySearchBar.css';

function CommunitySearchBar({secondTag, language, setlanguage, reference, setreference, setkeword, searchkeyword}){
    function searchButton(){
        console.log({secondTag, language, reference, searchkeyword});
    }
    function colorInvertor(secondTag){
        return secondTag === "코드 유형" ? "#FF6B00" : "#009418";
    }
    return(
        <div id="CommunitySearchBar">
            <span id = "SearchBarSetting" >학습 언어</span>
            <span>|</span>
            <span onClick={()=> setlanguage("PYTHON")} style={{fontWeight:language==="PYTHON" ? "bold" : "normal", color:language==="PYTHON" ? colorInvertor(secondTag) : "black"}} >PYTHON </span>
            <span onClick={()=> setlanguage("JAVA")} style={{fontWeight:language==="JAVA" ? "bold" : "normal", color:language==="JAVA" ? colorInvertor(secondTag) : "black"}} >JAVA</span>
            <span onClick={()=> setlanguage("C++")} style={{fontWeight:language==="C++" ? "bold" : "normal", color:language==="C++" ? colorInvertor(secondTag) : "black"}} >C++</span>
            <span id = "SearchBarSetting" >{secondTag}</span>
            <span>|</span>
            <span onClick={()=> setreference("ALL")} style={{fontWeight:reference==="ALL" ? "bold" : "normal", color:reference==="ALL" ? colorInvertor(secondTag) : "black"}} >ALL</span>
            <span onClick={()=> setreference("REFERENCE")} style={{fontWeight:reference==="REFERENCE" ? "bold" : "normal", color:reference==="REFERENCE" ? colorInvertor(secondTag) : "black"}} >REFERENCE</span>
            <span onClick={()=> setreference("USER_MADE")} style={{fontWeight:reference==="USER_MADE" ? "bold" : "normal", color:reference==="USER_MADE" ? colorInvertor(secondTag) : "black"}} >USER_MADE</span>
            <span id = "SearchBarSetting" >검색어</span>
            <span>|</span>
            <input id = "SearchKeywordInput" value={searchkeyword} onChange={(event)=>setkeword(event.target.value)} type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            <button id = "DataLoadbutton" onClick={searchButton}> 검색하기 </button>
        </div>
    )
}

export default CommunitySearchBar;