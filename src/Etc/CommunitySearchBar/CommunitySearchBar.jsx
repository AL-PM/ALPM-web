import React from "react";
import './CommunitySearchBar.css';

function CommunitySearchBar({secondTag, language, setlanguage, reference, setreference, setkeword, searchkeyword, setSearchIsOn, searchIsOn, setCurrentPage}){
    function searchButton(){
        setCurrentPage(0);
        setSearchIsOn(true);
    }
    function searchResetBtn(){
        setCurrentPage(0);
        setSearchIsOn(false);
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
            <span onClick={()=> setreference(null)} style={{fontWeight:reference===null ? "bold" : "normal", color:reference===null ? colorInvertor(secondTag) : "black"}} >ALL</span>
            <span onClick={()=> setreference(true)} style={{fontWeight:reference===true ? "bold" : "normal", color:reference===true ? colorInvertor(secondTag) : "black"}} >REFERENCE</span>
            <span onClick={()=> setreference(false)} style={{fontWeight:reference===false ? "bold" : "normal", color:reference===false ? colorInvertor(secondTag) : "black"}} >USER_MADE</span>
            <span id = "SearchBarSetting" >검색어</span>
            <span>|</span>
            <input id = "SearchKeywordInput" value={searchkeyword} onChange={(event)=>setkeword(event.target.value)} type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            {searchIsOn ?<button id = "DataLoadbutton" onClick={searchResetBtn}> 검색하기 </button> : <button id = "DataLoadbutton" onClick={searchButton}> 검색하기 </button> }
        </div>
    )
}

export default CommunitySearchBar;