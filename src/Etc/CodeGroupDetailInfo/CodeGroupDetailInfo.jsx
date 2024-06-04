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
        <div>
            <div id="CodeGroupDetailInfo">
                <span id="CodeGroupDetialInfoKeyWord" >그룹 요약</span>
                <span>|</span>
                <span>{language}</span>
                <span>{verifiedInvertor(verified)}</span>
                <span id="CodeGroupDetialInfoKeyWord" >작성자</span>
                <span>|</span>
                <span>{owner}</span>
                <span id="CodeGroupDetialInfoKeyWord" >그룹 이름</span>
                <span>|</span>
                <span>{name}</span>
                <span id="CodeGroupDetialInfoKeyWord" >코드 개수</span>
                <span>|</span>
                <span>{numOfAlgorithm} 개</span>
            </div>
        </div>
        
    )

}

export default CodeGroupDetailInfo;