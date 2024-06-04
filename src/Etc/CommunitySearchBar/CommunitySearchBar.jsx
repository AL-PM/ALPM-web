import React from "react";
import './CommunitySearchBar.css';

function CommunitySearchBar({ secondTag, language, setLanguage, reference, setReference, setKeyword, searchKeyword, setSearchIsOn, searchIsOn, setCurrentPage }) {
    const searchButton = () => {
        setCurrentPage(0);
        setSearchIsOn(true);
        console.log(language, reference, searchKeyword, searchIsOn);
    };
    
    const searchResetBtn = () => {
        setCurrentPage(0);
        setSearchIsOn(false);
    };

    const colorInvertor = (secondTag) => {
        return secondTag === "코드 유형" ? "#FF6B00" : "#009418";
    };

    return (
        <div id="CommunitySearchBar">
            <span id="SearchBarSetting">학습 언어</span>
            <span>|</span>
            <button onClick={() => setLanguage("PYTHON")} style={{ fontWeight: language === "PYTHON" ? "bold" : "normal", color: language === "PYTHON" ? colorInvertor(secondTag) : "black" }}>PYTHON </button>
            <button onClick={() => setLanguage("JAVA")} style={{ fontWeight: language === "JAVA" ? "bold" : "normal", color: language === "JAVA" ? colorInvertor(secondTag) : "black" }}>JAVA</button>
            <button onClick={() => setLanguage("C")} style={{ fontWeight: language === "C" ? "bold" : "normal", color: language === "C" ? colorInvertor(secondTag) : "black" }}>C++</button>
            <span id="SearchBarSetting">{secondTag}</span>
            <span>|</span>
            <button onClick={() => setReference(null)} style={{ fontWeight: reference === null ? "bold" : "normal", color: reference === null ? colorInvertor(secondTag) : "black" }}>ALL</button>
            <button onClick={() => setReference(true)} style={{ fontWeight: reference === true ? "bold" : "normal", color: reference === true ? colorInvertor(secondTag) : "black" }}>REFERENCE</button>
            <button onClick={() => setReference(false)} style={{ fontWeight: reference === false ? "bold" : "normal", color: reference === false ? colorInvertor(secondTag) : "black" }}>USER_MADE</button>
            <span id="SearchBarSetting">검색어</span>
            <span>|</span>
            <input id="SearchKeywordInput" value={searchKeyword} onChange={(event) => setKeyword(event.target.value)} type="text" name="CodeHomeSearchKeyword" placeholder="키워드를 입력해주세요"></input>
            {searchIsOn ? <button id="DataLoadbutton" onClick={searchResetBtn}> 전체 코드보기 </button> : <button id="DataLoadbutton" onClick={searchButton}> 검색하기 </button>}
        </div>
    );
}

export default CommunitySearchBar;
