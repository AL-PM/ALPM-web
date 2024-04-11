import React from "react";
import './CodeGroupDetailInfo.css';

function CodeGroupDetailInfo({language, verified, owner, name, numOfAlgorithm}){
    function verifiedInvertor(verified){
        if(verified === null)
            return "ALL";
        if(verified === true)
            return "REFERENCE";
        if(verified === false)
            return "USER_MADE";
    }
    return(
        <div id="CodeGroupDetailInfo">
                <span>그룹 요약</span>
                <span>|</span>
                <span>{language}</span>
                <span>{verifiedInvertor(verified)}</span>
                <span></span>
                <span>작성자</span>
                <span>|</span>
                <span>{owner}</span>
                <span></span>
                <span>그룹 이름</span>
                <span>|</span>
                <span>{name}</span>
                <span></span>
                <span>코드 개수</span>
                <span>|</span>
                <span>{numOfAlgorithm} 개</span>
                
            </div>
    )

}

export default CodeGroupDetailInfo;