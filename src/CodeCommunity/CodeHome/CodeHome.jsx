import React, { useState } from "react";
import "./CodeHome.css";
import {useNavigate} from "react-router-dom";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult.jsx";
import CommunitySearchBar from "../../Etc/CommunitySearchBar/CommunitySearchBar.jsx";


function CodeHomeUploadButton(){
    const navigator = useNavigate();
    return(
        <button id="CodeHomeUploadButton" onClick={()=>navigator('/mypage/NewCode')}>새로운 코드 업로드</button>
    )
}


function CodeCommunity(){
    const [language, setlanguage] = useState("PYTHON");
    const [reference, setreference] = useState("ALL");
    const [searchkeyword, setkeword] = useState("");
    const searchData = [
        {
            "id": 1,
            "name": "퀵 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "버블 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "힙 정렬",
            "referencedCount": 4,
            "verified": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        
    ]
    return(
        <div id = "Codehome">
            <MainMenuBar page={"Code"} />
            <CommunitySearchBar secondTag={"코드 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            <CodeSearchResult searchData={searchData} bodyHeight={"55vh"} siteTag={"Code"}/>
            <CodeHomeUploadButton />
        </div>
       
    )
}

export default CodeCommunity;