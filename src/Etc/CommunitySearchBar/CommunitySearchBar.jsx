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
            <button 
                className={`menu-button ${language === "PYTHON" ? "active" : ""}`} 
                style={{ color: language === "PYTHON" ? colorInvertor(secondTag) : "black" }}
                onClick={() => setLanguage("PYTHON")}
                data-tag={secondTag}
            >
                PYTHON
            </button>
            <button 
                className={`menu-button ${language === "JAVA" ? "active" : ""}`} 
                style={{ color: language === "JAVA" ? colorInvertor(secondTag) : "black" }}
                onClick={() => setLanguage("JAVA")}
                data-tag={secondTag}
            >
                JAVA
            </button>
            <button 
                className={`menu-button ${language === "C" ? "active" : ""}`} 
                style={{ color: language === "C" ? colorInvertor(secondTag) : "black" }}
                onClick={() => setLanguage("C")}
                data-tag={secondTag}
            >
                C++
            </button>
            <span id="SearchBarSetting">{secondTag}</span>
            <span>|</span>
            <button 
                className={`menu-button ${reference === null ? "active" : ""}`} 
                style={{ color: reference === null ? colorInvertor(secondTag) : "black" }}
                onClick={() => setReference(null)}
                data-tag={secondTag}
            >
                ALL
            </button>
            <button 
                className={`menu-button ${reference === true ? "active" : ""}`} 
                style={{ color: reference === true ? colorInvertor(secondTag) : "black" }}
                onClick={() => setReference(true)}
                data-tag={secondTag}
            >
                REFERENCE
            </button>
            <button 
                className={`menu-button ${reference === false ? "active" : ""}`} 
                style={{ color: reference === false ? colorInvertor(secondTag) : "black" }}
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
                <button id="DataLoadbutton" onClick={searchResetBtn}> 전체 코드보기 </button>
            ) : (
                <button id="DataLoadbutton" onClick={searchButton}> 검색하기 </button>
            )}
        </div>
    );
}

export default CommunitySearchBar;
