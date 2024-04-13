import React, { useState } from "react";
import "./CodeGroupHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CommunitySearchBar from "../../Etc/CommunitySearchBar/CommunitySearchBar.jsx";
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult.jsx";


function CodeGrupHome(){
    const [language, setlanguage] = useState("PYTHON");
    const [reference, setreference] = useState("ALL");
    const [searchkeyword, setkeword] = useState("");
    const searchData = [
        {
            "id": 1,
            "name": "다양한 정렬 알고리즘",
            "referencedCount": 2,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "스택 관련 자료 구조",
            "referencedCount": 2,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "Knapsack",
            "referencedCount": 4,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "n-queen problem",
            "referencedCount": 4,
            "verified": null,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 5,
            "name": "Linked-List",
            "referencedCount": 4,
            "verified": null,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 6,
            "name": "Binary Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 7,
            "name": "Tree Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
    ]

    return(
        <div id = "CodeGroupHome">
            <MainMenuBar page={"CodeGroup"} />
            <CommunitySearchBar secondTag={"제작자 유형"} language = {language} setlanguage={setlanguage} reference= {reference} setreference = {setreference} setkeword={setkeword} searchkeyword={searchkeyword} />
            <CodeGroupSearchResult searchData={searchData} bodyHeight={"60vh"}/>
        </div>
       
    )
}

export default CodeGrupHome;