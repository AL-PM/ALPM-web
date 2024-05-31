import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setSearchResult(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();

    }, []);

    if (!searchResult) {
        return (
            <div id="MyCodeGroup">
                <MainMenuBar page={"Code"} />
                <CommunitySearchBar secondTag={"코드 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            </div>
        );
    }

    console.log(searchResult);

    
    return(
        <div id = "Codehome">
            <MainMenuBar page={"Code"} />
            <CommunitySearchBar secondTag={"코드 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            <CodeSearchResult searchData={searchResult.content} bodyHeight={"55vh"} siteTag={"Code"}/>
            <CodeHomeUploadButton />
        </div>
       
    )
}

export default CodeCommunity;