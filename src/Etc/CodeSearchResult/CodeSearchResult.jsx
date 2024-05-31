import React from "react";
import './CodeSearchResult.css';
import {useNavigate} from 'react-router-dom';

function CodeSearchResult({searchData, bodyHeight, siteTag}){
    const navigator = useNavigate();
    /*
    function verifiedInvertor(Data){
        if(Data === null)
            return "ALL";
        if(Data === true)
            return "REFERENCE";
        if(Data === false)
            return "USER_MADE";
    }
    */

return(
    <div id="CodeSearchBody" style={{height:bodyHeight}}>
        {searchData.map((Data) =>
            <div id="CodeSearchResult" key={Data.id} onClick={()=>navigator('/code/Detail', {state : {"id" : Data.id, "site": siteTag}})} >
                <span>학습 언어</span>
                <span>|</span>
                <span>언어</span>
                <span></span>
                <span>코드 유형</span>
                <span>|</span>
                <span>유형</span>
                <span></span>
                <span>작성자</span>
                <span>|</span>
                <span>임시 소유자</span>
                <span></span>
                <span>제목</span>
                <span>|</span>
                <span>이름</span>
                
            </div>
        )}
    </div>
)
}

export default CodeSearchResult;