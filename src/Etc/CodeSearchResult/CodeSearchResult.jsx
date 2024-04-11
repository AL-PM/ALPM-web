import React from "react";
import './CodeSearchResult.css';

function CodeSearchResult({searchData}){
    function verifiedInvertor(Data){
        if(Data === null)
            return "ALL";
        if(Data === true)
            return "REFERENCE";
        if(Data === false)
            return "USER_MADE";
    }
return(
    <div id="CodeSearchBody">
        {searchData.map((Data) =>
            <div id="CodeSearchResult" key={Data.id}>
                <span>학습 언어</span>
                <span>|</span>
                <span>{Data.language}</span>
                <span></span>
                <span>코드 유형</span>
                <span>|</span>
                <span>{verifiedInvertor(Data.verified)}</span>
                <span></span>
                <span>작성자</span>
                <span>|</span>
                <span>{Data.owner}</span>
                <span></span>
                <span>제목</span>
                <span>|</span>
                <span>{Data.name}</span>
                
            </div>
        )}
    </div>
)
}

export default CodeSearchResult;