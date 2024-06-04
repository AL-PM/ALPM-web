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
            <div id="CodeDetailInfo">
                <span style={{fontWeight:"bold"}}>학습 언어</span>
                <span>|</span>
                <span>{language}</span>
                <span style={{fontWeight:"bold"}}>코드 유형</span>
                <span>|</span>
                <span>{verifiedInvertor(verified)}</span>
                <span style={{fontWeight:"bold"}}>작성자</span>
                <span>|</span>
                <span>{owner}</span>
                <span style={{fontWeight:"bold"}}>제목</span>
                <span>|</span>
                <span>{name}</span>
            </div>
        
    )
}

export default CodeDetailInfo;