import React from "react";
import {useLocation} from "react-router-dom"
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult.jsx";

function CodeGroupDetail(){
    const {state} = useLocation();
    console.log(state);
    let exampleData = [
        {
            "id": 124, 
            "name": "TestGroup",
            "referencedCount": 3,
            "verified": true,
            "visible": true, 
            "language": "JAVA",
            "owner":  [
                {"id": 2, 
                 "name": "Park"
                }
            ], 
            "algorithms": [
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
                }
            ] 
        }
    ];
    let algorithms = [];

    exampleData.forEach(group => {
        algorithms = algorithms.concat(group.algorithms);
    });
    
    return(
        <div>
            <MainMenuBar page={"CodeGroup"} />
            <CodeSearchResult searchData={algorithms}/>
        </div>
    )
}

export default CodeGroupDetail;