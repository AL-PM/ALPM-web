import React from "react";
import './CodeGroupSearchResult.css';
import {useNavigate} from 'react-router-dom';

function CodeGroupSearchResult({searchData, bodyHeight}){
    const navigator = useNavigate();
    function verifiedInvertor(verified){
        if(verified === null)
            return "ALL";
        if(verified === true)
            return "REFERENCE";
        if(verified === false)
            return "USER_MADE";
    }
return(
    <div id="CodeGroupSearchBody" style={{height:bodyHeight}}>
        {searchData.map((Data) => 
            <div id="CodeGroupSearchResult" key={Data.id} onClick={()=>navigator('/codegroup/Detail', {state : {"id" : Data.id, "site":"CodeGroup"}})}>
                <span>그룹 요약</span>
                <span>|</span>
                <span>{Data.language}</span>
                <span>{verifiedInvertor(Data.verified)}</span>
                <span>작성자</span>
                <span>|</span>
                <span>{Data.owner.id === 1 ? "AL-PM" : Data.owner.name}</span>
                <span>그룹 이름</span>
                <span>|</span>
                <span>{Data.name}</span>
                <span>코드 개수</span>
                <span>|</span>
                <span>{Data.algorithmCount} 개</span>
                
            </div>
        )}
    </div>
)
}

export default CodeGroupSearchResult;