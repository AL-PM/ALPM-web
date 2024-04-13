import React from "react";
import {useLocation} from "react-router-dom"
import './CodeDetail.css';
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";
import CodeDetailInfo from "../../Etc/CodeDetailInfo/CodeDetailInfo.jsx";
import CodeDetailBody from "../../Etc/CodeDetailBody/CodeDetailBody.jsx";

function CodeFollowBtn(){
    return(
        <button id="CodeFollowBtn">코드 그룹에 추가하기</button>
    )
}

function CodeDetail(){
    const {state} = useLocation();
    console.log(state);
    let Data = {
        "id": state.id,
        "name": "TestCode", 
        "referencedCount": 3,
        "verified": true,
        "language": "JAVA",
        "content": "Test Code\n 코드 \t 코드",
        "description": "Test description Ex",
        "owner": {
          "id": 20192830, 
          "name": "Soongsil Univ",
          "profile": "종강시켜주세요 제발 ㅠㅠ"
        }
      }
    return(
        <div id="CodeDetail">
            <MainMenuBar page={state.site} />
            <CodeDetailInfo verified={Data.verified} language={Data.language} owner={Data.owner.name} name={Data.name}/>
            <CodeDetailBody content={Data.content} description={Data.description} owner={Data.owner}/>
            <CodeFollowBtn />
        </div>
    )

}

export default CodeDetail;