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
            <textarea id='CodeContent' style={{fontSize:"large"}}
                value={content}
                rows={20}
                cols={100}
            />
            <CodeDetailTitle Title={"코드에 대한 설명"}/>
            <textarea id='CodeContent' style={{fontSize:"large"}}
                value={description}
                rows={10}
                cols={100}
            />
            <CodeDetailTitle Title={"제작자"}/>
            <div id="UserContent">
                <span>{owner.name}</span>
            </div>
        </div>
    )
}

export default CodeDetailBody;