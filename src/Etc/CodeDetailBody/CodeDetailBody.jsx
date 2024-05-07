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
    let finalCode = "";

    const data = content.split("\n");
    for(let i = 0 ; i < data.length ; i++){
        data[i] = data[i].split("//");
    }
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].length === 2){
            finalCode = finalCode + data[i][0] + "\n";
        }else{
            finalCode = finalCode + data[i] + "\n";
        }
    }

    // TextArea row 설정을 위해 코드 전체의 줄 수 계산
    // Font-size medium 기준 +3 해야함
    function countNumberOfCode(code) {
        return(code.split('\n').length);
    }
    
    return(
        <div id="CodeDetailBody">
            <CodeDetailTitle Title={"코드 원문"}/>
            <textarea readOnly id='CodeContent'
                value={finalCode}
                rows={countNumberOfCode(finalCode)}
                cols={100}
            />
            <CodeDetailTitle Title={"코드에 대한 설명"}/>
            <textarea readOnly id='CodeDescriptionContent' 
                value={description}
                rows={countNumberOfCode(description)}
                cols={100}
            />
            <CodeDetailTitle Title={"작성자"}/>
            <div id="UserContent">
                <span>{owner.name}</span>
            </div>
        </div>
    )
}

export default CodeDetailBody;