import React from "react";
import './CodeSearchResult.css';
import {useNavigate} from 'react-router-dom';

function CodeSearchResult({searchData, bodyHeight, siteTag}){
    const navigator = useNavigate();
    function verifiedInvertor(Data){
        if(Data === null)
            return "ALL";
        if(Data === true)
            return "REFERENCE";
        if(Data === false)
            return "USER_MADE";
    }
return(
    <div id="CodeSearchBody" style={{height:bodyHeight}}>
        {searchData.map((Data) =>
            <div id="CodeSearchResult" key={Data.id} onClick={()=>navigator('/code/Detail', {state : {"id" : Data.id, "site": siteTag}})} >
                <span>학습 언어</span>
                <span>|</span>
                <span>{Data.language}</span>
                <span>코드 유형</span>
                <span>|</span>
                <span>{verifiedInvertor(Data.verified)}</span>
                <span>작성자</span>
                <span>|</span>
                <span>{Data.owner.id === 1 ? "AL-PM" : Data.owner.name}</span>
                <span>제목</span>
                <span>|</span>
                <span>{Data.name}</span>
                
            </div>
        )}
    </div>
)
}

export default CodeSearchResult;