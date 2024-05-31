import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CodeGroupHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CommunitySearchBar from "../../Etc/CommunitySearchBar/CommunitySearchBar.jsx";
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult.jsx";


function CodeGrupHome(){
    const [language, setlanguage] = useState("PYTHON");
    const [reference, setreference] = useState("ALL");
    const [searchkeyword, setkeword] = useState("");
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup`, {
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
                <MainMenuBar page={"CodeGroup"} />
                <CommunitySearchBar secondTag={"제작자 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            </div>
        );
    }

    console.log(searchResult);


    return(
        <div id = "CodeGroupHome">
            <MainMenuBar page={"CodeGroup"} />
            <CommunitySearchBar secondTag={"제작자 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            <CodeGroupSearchResult searchData={searchResult.content} bodyHeight={"60vh"}/>
        </div>
       
    )
}

export default CodeGrupHome;