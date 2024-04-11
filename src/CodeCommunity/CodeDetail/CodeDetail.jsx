import React from "react";
import {useLocation} from "react-router-dom"
import './CodeDetail.css';
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";

function CodeFollowBtn(){
    return(
        <button id="CodeFollowBtn">코드 그룹 팔로우하기</button>
    )
}

function CodeDetail(){
    const {state} = useLocation();
    let exampleData = {
        "id": {state},
        "name": "TestCode", 
        "referencedCount": 3,
        "verified": true,
        "language": "JAVA",
        "content": "Test Code Ex",
        "description": "Test description Ex",
        "owner": {
          "id": 20192830, 
          "name": "Soongsil Univ",
          "profile": "종강시켜주세요 제발 ㅠㅠ"
        }
      }
    return(
        <div id="CodeDetail">
            <MainMenuBar page={"Code"} />
            <CodeFollowBtn />
        </div>
    )

}

export default CodeDetail;