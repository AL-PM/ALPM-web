import React from "react";
import './CodeDetailBody.css';

function CodeDetailTitle({Title}){
    return(
        <div id="CodeDetailTitle">
            <span>|</span>
            <span>{Title}</span>
            <span>|</span>
        </div>
    )
}

function CodeDetailBody({content, description, owner}){
    return(
        <div id="CodeDetailBody">
            <CodeDetailTitle Title={"코드 원문"}/>
            <div id="CodeContent">
                <span>{content}</span>
            </div>
            <CodeDetailTitle Title={"코드에 대한 설명"}/>
            <div id="CodeContent">
                <span>{description}</span>
            </div>
            <CodeDetailTitle Title={"제작자"}/>
            <div id="UserContent">
                <span>{owner.name}</span>
            </div>
        </div>
    )
}

export default CodeDetailBody;