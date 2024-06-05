import React from "react";
import ReactMarkdown from "react-markdown";
import './CodeDetailBody.css';

function CodeDetailTitle({ Title }) {
    return (
        <div id="CodeDetailTitle">
            <span>|</span>
            <span>{Title}</span>
            <span>|</span>
        </div>
    );
}

function CodeDetailBody({ content, description, owner }) {
    let finalCode = "";

    const data = content.split("\n");

    // Process the content to remove `//` comments and ` ``` ` lines
    for (let i = 0; i < data.length; i++) {
        // Skip lines that are just ``` symbols
        if (data[i].trim() === "```") {
            continue;
        }
        // Split by `//` to remove comments
        const codeLine = data[i].split("//")[0];
        finalCode += codeLine + "\n";
    }

    // TextArea row 설정을 위해 코드 전체의 줄 수 계산
    // Font-size medium 기준 +3 해야함
    function countNumberOfCode(code) {
        return code.split('\n').length;
    }

    // Remove all instances of the "$" character
    const sanitizedDescription = description.replace(/\$/g, "");

    return (
        <div id="CodeDetailBody">
            <CodeDetailTitle Title={"코드 원문"} />
            <textarea
                readOnly
                id="CodeContent"
                value={finalCode}
                rows={countNumberOfCode(finalCode)}
                cols={100}
            />
            <CodeDetailTitle Title={"코드에 대한 설명"} />
            <div id="CodeDescriptionContent">
                <ReactMarkdown>{sanitizedDescription}</ReactMarkdown>
            </div>
            <CodeDetailTitle Title={"작성자"} />
            <div id="UserContent">
                <img
                    id="CodeDetailUserProfile"
                    src={owner.profile}
                    alt="User Profile"
                />
                <span>{owner.name}</span>
            </div>
        </div>
    );
}

export default CodeDetailBody;
