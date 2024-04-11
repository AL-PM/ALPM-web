import React from "react";
import './CodeGroupSearchResult.css';

function CodeGroupSearchResult({searchData}){
    function verifiedInvertor(Data){
        if(Data === null)
            return "ALL";
        if(Data === true)
            return "REFERENCE";
        if(Data === false)
            return "USER_MADE";
    }
return(
    <div id="CodeGroupSearchBody">
        {searchData.map((Data) =>
            <div id="CodeGroupSearchResult" key={Data.id}>
                <span>그룹 요약</span>
                <span>|</span>
                <span>{Data.language}</span>
                <span>{verifiedInvertor(Data.verified)}</span>
                <span></span>
                <span>작성자</span>
                <span>|</span>
                <span>{Data.owner}</span>
                <span></span>
                <span>그룹 이름</span>
                <span>|</span>
                <span>{Data.name}</span>
                <span></span>
                <span>코드 개수</span>
                <span>|</span>
                <span>1 개</span>
                
            </div>
        )}
    </div>
)
}

export default CodeGroupSearchResult;