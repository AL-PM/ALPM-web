import React from "react";
import './CodeDetailInfo.css';

function CodeDetailInfo({verified, language, owner, name}){
    function verifiedInvertor(verified){
        if(verified === null)
            return "ALL";
        if(verified === true)
            return "REFERENCE";
        if(verified === false)
            return "USER_MADE";
    }
    return(
        <div>
            <div id="CodeDetailInfoContainer" style={{marginTop:"7.5vh"}}></div>
            <div id="CodeDetailInfo">
                <span>학습 언어</span>
                <span>|</span>
                <span>{language}</span>
                <span></span>
                <span>코드 유형</span>
                <span>|</span>
                <span>{verifiedInvertor(verified)}</span>
                <span></span>
                <span>작성자</span>
                <span>|</span>
                <span>{owner}</span>
                <span></span>
                <span>제목</span>
                <span>|</span>
                <span>{name}</span>
            </div>
            <div id="CodeDetailInfoContainer"></div>
        </div>
        
    )
}

export default CodeDetailInfo;