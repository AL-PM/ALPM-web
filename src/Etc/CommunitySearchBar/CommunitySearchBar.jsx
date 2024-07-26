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

    return (
        <div id="CommunitySearchBar">
            <span id="SearchBarSetting">학습 언어</span>
            <span>|</span>
            <button 
                className={`menu-button ${language === "PYTHON" ? "active" : ""}`} 
                onClick={() => setLanguage("PYTHON")}
                data-tag={secondTag}
            >
                PYTHON
            </button>
            <button 
                className={`menu-button ${language === "JAVA" ? "active" : ""}`} 
                onClick={() => setLanguage("JAVA")}
                data-tag={secondTag}
            >
                JAVA
            </button>
            <button 
                className={`menu-button ${language === "C" ? "active" : ""}`} 
                onClick={() => setLanguage("C")}
                data-tag={secondTag}
            >
                C++
            </button>
            <span id="SearchBarSetting">{secondTag}</span>
            <span>|</span>
            <button 
                className={`menu-button ${reference === null ? "active" : ""}`} 
                onClick={() => setReference(null)}
                data-tag={secondTag}
            >
                ALL
            </button>
            <button 
                className={`menu-button ${reference === true ? "active" : ""}`} 
                onClick={() => setReference(true)}
                data-tag={secondTag}
            >
                REFERENCE
            </button>
            <button 
                className={`menu-button ${reference === false ? "active" : ""}`} 
                onClick={() => setReference(false)}
                data-tag={secondTag}
            >
                USER_MADE
            </button>
            <span id="SearchBarSetting">검색어</span>
            <span>|</span>
            <input 
                id="SearchKeywordInput" 
                value={searchKeyword} 
                onChange={(event) => setKeyword(event.target.value)} 
                type="text" 
                name="CodeHomeSearchKeyword" 
                placeholder="키워드를 입력해주세요"
            />
            {searchIsOn ? (
                <button id="DataLoadbutton" onClick={searchResetBtn}> 검색 비활성화하기 </button>
            ) : (
                <button id="DataLoadbutton" onClick={searchButton}> 검색 활성화하기 </button>
            )}
        </div>
    );
}

export default CommunitySearchBar;
