import React, { useState } from "react";
import "./CodeGroupHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CommunitySearchBar from "../../Etc/CommunitySearchBar/CommunitySearchBar.jsx";

function CodeGroupHomebody(){
    return(
        <div id="CodeGroupHomeBody">
        </div>
    )
}


function CodeGrupHome(){
    const [language, setlanguage] = useState("PYTHON");
    const [reference, setreference] = useState("ALL");
    const [searchkeyword, setkeword] = useState("");
    return(
        <div id = "CodeGroupHome">
            <MainMenuBar page={"CodeGroup"} />
            <CommunitySearchBar secondTag={"제작자 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            <CodeGroupHomebody />
        </div>
       
    )
}

export default CodeGrupHome;