import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';
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

function CodeDetailBody({ content, description, owner, site }) {
    const navigator = useNavigate();
    let finalCode = "";

    const data = content.split("\n");

    // Process the content to remove `//` comments and any lines containing ` ``` `
    for (let i = 0; i < data.length; i++) {
        // Skip lines that contain ``` symbols
        if (data[i].includes("```")) {
            continue;
        }
        // Split by `//` to remove comments

        /*
        let codeLine;

        if (language === "PYTHON")
            codeLine = data[i].split("#")[0];
        else
            codeLine = data[i].split("//")[0];

        finalCode += codeLine + "\n";
        */
       
        finalCode += data[i] + "\n";
    }

    // TextArea row 설정을 위해 코드 전체의 줄 수 계산
    function countNumberOfCode(code) {
        return code.split('\n').length;
    }

    function countNumOfWord(line) {
        const tabSize = 8;
        let numOfWords = 0;

        for (let char of line) {
            if (char === '\t') {
                numOfWords += tabSize;
            } else {
                numOfWords += 1;
            }
        }

        return numOfWords;
    }

    // 줄별로 최대 글자수를 계산하여 최종 cols 설정
    function calculateMaxCols(code) {
        const lines = code.split('\n');
        let maxCols = 0;

        for (let line of lines) {
            const cols = countNumOfWord(line);
            if (cols > maxCols) {
                maxCols = cols;
            }
        }

        return maxCols;
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
                cols={calculateMaxCols(finalCode)}
            />
            <CodeDetailTitle Title={"코드에 대한 설명"} />
            <div id="CodeDescriptionContent">
                <ReactMarkdown>{sanitizedDescription}</ReactMarkdown>
            </div>
            <CodeDetailTitle Title={"작성자"} />
            <div id="UserContentContainer">
                <div id="UserContent">
                    <img
                        id="CodeDetailUserProfile"
                        src={owner.profile}
                        alt="User Profile"
                    />
                    <span>{owner.id === 1 ? "AL-PM" : owner.name}</span>
                </div>
                <button id="CodeModNDelBtn" onClick={navigator('/code/Mod')} style={{ color: site === "CodeGroup" ? "#009418" : "#FF6B00" }} >코드 수정 및 삭제</button>
            </div>
            
        </div>
    );
}

export default CodeDetailBody;
