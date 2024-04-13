import React from "react";
import {useLocation} from "react-router-dom"
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult.jsx";
import CodeGroupDetailInfo from "../../Etc/CodeGroupDetailInfo/CodeGroupDetailInfo.jsx";
import './CodeGroupDetail.css';

function CodeGroupFollowBtn(){
    return(
        <button id="CodeGroupFollowBtn">코드 그룹 팔로우하기</button>
    )
}

function CodeGroupDetail(){
    const {state} = useLocation();
    console.log(state);
    let exampleData = 
            {
            "id": 124, 
            "name": "TestGroup",
            "referencedCount": 3,
            "verified": true,
            "visible": true, 
            "language": "JAVA",
            "owner":  
                {"id": 2, 
                 "name": "ALPM"
                }
            , 
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
                },
                {
                    "id": 5,
                    "name": "버블 정렬",
                    "referencedCount": 4,
                    "verified": null,
                    "language": "Python",
                    "owner" : "MoonKee"
                },
                {
                    "id": 6,
                    "name": "버블 정렬",
                    "referencedCount": 4,
                    "verified": null,
                    "language": "Python",
                    "owner" : "MoonKee"
                },{
                    "id": 7,
                    "name": "버블 정렬",
                    "referencedCount": 4,
                    "verified": null,
                    "language": "Python",
                    "owner" : "MoonKee"
                }
            ] 
        };
        
    return(
        <div id="CodeGroupDetail">
            <MainMenuBar page={"CodeGroup"} />
            <CodeGroupDetailInfo language={exampleData.language} verified={exampleData.verified} owner={exampleData.owner.name} name={exampleData.name} numOfAlgorithm={exampleData.algorithms.length}/>
            <CodeSearchResult searchData={exampleData.algorithms} bodyHeight={"55vh"} siteTag={"CodeGroup"}/>
            <CodeGroupFollowBtn />
        </div>
    )
}

export default CodeGroupDetail;