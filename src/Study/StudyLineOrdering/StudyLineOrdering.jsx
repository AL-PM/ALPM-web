import React, { useState, useEffect, useCallback } from "react";
import './StudyLineOrdering.css';

function StudyLineOrdering() {
    const [currentPage, setCurrentPage] = useState(0);
    const [userInput, setUserInput] = useState([]);
    const [randomFinalCode, setRandomFinalCode] = useState([]);
    const [initialRandomFinalCode, setInitialRandomFinalCode] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [finalCode, setFinalCode] = useState([]);

    const code = {
        "level": 1,
        "text" : '#include <bits/stdc++.h>\n#define ll long long\nusing namespace std;\nll N, M;\nll arr[100005];\nvector<ll> SegTree;\nll Query(ll n, ll l, ll r, ll st, ll ed) {\n\tif (l > $ed$ || r < $st$) // 탐색 범위를 벗어나는 경우\n\t\treturn $0$;\n\tif (l >= $st$ && r <= $ed$) // 목표 범위에 속하는 경우\n\t\treturn $SegTree[n]$;\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\treturn Query($n * 2$, $l$, $mid$, $st$, $ed$) + Query($n * 2 + 1$, $mid + 1$, $r$, $st$, $ed$); // 왼쪽 구간과 오른쪽 구간을 탐색\n}\n\nll Update(ll n, ll l, ll r, ll pos, ll x) {\n\tif (l > $pos$ || r < $pos$) // 탐색범위를 벗어나면\n\t\treturn $SegTree[n]$; // 해당 세그먼트 트리의 값을 반환\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $x$;\n\t\treturn $SegTree[n]$; // 새로 입력받은 값을 반환\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Update($n * 2$, $l$, $mid$, $pos$, $x$) + Update($n * 2 + 1$, $mid + 1$, $r$, $pos$, $x$); // 왼쪽 구간과 오른쪽 구간을 탐색\n\treturn $SegTree[n]$;\n}\n\nll Init(ll n, ll l, ll r) {\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $arr[l]$; // arr[l] 값이 상위노드로 넘어감\n\t\treturn $SegTree[n]$;\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Init($n * 2$, $l$, $mid$) + Init($n * 2 + 1$, $mid + 1$, $r$); // 왼쪽 구간과 오른쪽 구간으로 분할\n\treturn $SegTree[n]$;\n}\n\nint main() {\n\tios::sync_with_stdio(0);\n\tcin.tie(0);\n\n\tcin >> N >> M;\n\tfor (int i = 1; i <= N; i++)\n\t\tcin >> arr[i]; // 원소 입력 받음\n\n\tSegTree.resize(4 * N); // 세그먼트 트리 크기가 4*N 인 벡터 생성\n\tInit(1, 1, N); // 세그먼트 트리 초기화\n\n\tfor (int i = 0; i < M; i++) {\n\t\tll x, a, b;\n\t\tcin >> x >> a >> b;\n\t\tif (x) // x가 1이면\n\t\t\tcout << Query(1, 1, N, a, b) << "\\n"; // a번째부터 b번째까지의 합 출력\n\t\telse // x가 0이면\n\t\t\tUpdate(1, 1, N, a, b); // a번째 원소를 b로 변경\n\t}\n\n\treturn 0;\n}'
    };

    function preprocessCode(code) {
        let lines = code.split("\n");
        let processedCode = [];

        let currentSection = 0;
        let numOfOpenBracket = 0;
        let inFunction = false;
        let lineNumberInFunction = 0;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let trimmedLine = line.trim();

            if (trimmedLine !== "") {
                if (trimmedLine.match("{")) {
                    if (numOfOpenBracket === 0) {
                        processedCode.push({
                            data: line.split("//")[0],
                            num: 0,
                            codeSection: 0,
                        });
                        currentSection += 1;
                        numOfOpenBracket += 1;
                        inFunction = true;
                    } else {
                        numOfOpenBracket += 1;
                        inFunction = true;
                        processedCode.push({
                            data: line.split("//")[0],
                            num: lineNumberInFunction,
                            codeSection: currentSection,
                        });
                        lineNumberInFunction += 1;
                    }
                } else if (trimmedLine === "}") {
                    numOfOpenBracket -= 1;
                    processedCode.push({
                        data: line.split("//")[0],
                        num: lineNumberInFunction,
                        codeSection: numOfOpenBracket === 0 ? 0 : currentSection,
                    });
                    if (numOfOpenBracket === 0) {
                        inFunction = false;
                        lineNumberInFunction = 0;
                    } else {
                        lineNumberInFunction += 1;
                    }
                } else {
                    processedCode.push({
                        data: line.split("//")[0],
                        num: inFunction ? lineNumberInFunction : 0,
                        codeSection: numOfOpenBracket === 0 ? 0 : currentSection,
                    });
                    if (inFunction) {
                        lineNumberInFunction += 1;
                    }
                }
            }
        }

        return processedCode;
    }

    function devideFn(processedCode) {
        let finalCode = [];
        let tmpCode = [];
        let nowCodeSection = 1;

        processedCode.forEach((element, index) => {
            if (element.codeSection === nowCodeSection) {
                tmpCode.push(element);
            } else if (element.codeSection > nowCodeSection) {
                finalCode.push(tmpCode);
                tmpCode = [];
                nowCodeSection = element.codeSection;
                tmpCode.push(element);
            }

            // Ensure the last section is added
            if (index === processedCode.length - 1) {
                finalCode.push(tmpCode);
            }
        });

        return finalCode;
    }

    const shuffle = useCallback((array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }, []);

    const randomFn = useCallback((finalCode) => {
        // Make a deep copy of the finalCode array
        let randomCode = JSON.parse(JSON.stringify(finalCode));

        // Shuffle each section within the randomCode array
        randomCode.forEach(section => {
            shuffle(section);
        });
        return randomCode;
    }, [shuffle]);

    useEffect(() => {
        let processedData = preprocessCode(code.text);
        setProcessedData(processedData);
        let finalCode = devideFn(processedData);
        let randomfinalCode = randomFn(finalCode);
        setFinalCode(finalCode);
        setUserInput(new Array(randomfinalCode.length).fill([]));
        setRandomFinalCode(randomfinalCode);
        setInitialRandomFinalCode(randomfinalCode); // Save the initial random code
    }, [code.text, randomFn]);

    useEffect(() => {
        // This effect runs whenever userInput is updated to trigger re-render
    }, [userInput]);

    function exampleFn(eachBlock) {
        setUserInput(prevUserInput => {
            const updatedUserInput = [...prevUserInput];
            updatedUserInput[currentPage] = [...prevUserInput[currentPage], eachBlock];
            return updatedUserInput;
        });

        setRandomFinalCode(prevRandomFinalCode => {
            const updatedRandomFinalCode = [...prevRandomFinalCode];
            updatedRandomFinalCode[currentPage] = prevRandomFinalCode[currentPage].filter(block => block.num !== eachBlock.num);
            return updatedRandomFinalCode;
        });
    }

    function resetFn() {
        setUserInput(new Array(initialRandomFinalCode.length).fill([]));
        setRandomFinalCode(initialRandomFinalCode);
        setCurrentPage(0);
    }

    function completeFn() {
        let isCorrect = true;

        for (let i = 0; i < finalCode.length; i++) {
            for (let j = 0; j < finalCode[i].length; j++) {
                if (!userInput[i][j] || userInput[i][j].data !== finalCode[i][j].data) {
                    isCorrect = false;
                    break;
                }
            }
            if (!isCorrect) break;
        }

        if (isCorrect) {
            alert("정답입니다");
        } else {
            alert("틀렸습니다. 정답을 다시 작성해주세요.");
            resetFn();
        }
    }

    return (
        <div>
            <div id="StudyLineOrdering">
                {processedData && processedData.map((codeData, index) =>
                    <div key={index}>
                        {codeData.codeSection === 0 ? (
                            <textarea
                                readOnly
                                id="StudyTrackingBackground"
                                rows={1}
                                cols={140}
                                value={codeData.data}
                                tabIndex={-1}
                            />
                        ) : (
                            <textarea
                                readOnly
                                id="StudyTrackingBackground"
                                rows={1}
                                cols={140}
                                value={userInput[codeData.codeSection - 1][codeData.num] ? userInput[codeData.codeSection - 1][codeData.num].data : `[__${codeData.codeSection},${codeData.num + 1}__]`}
                                tabIndex={-1}
                            />
                        )}
                    </div>
                )}
                <div id="exampleBox">
                    <p style={{ fontFamily: 'SUITE-Regular' }}>
                        {"[ " + (currentPage + 1) + "번 페이지 보기 ]"}
                    </p>
                    <div id="LineOrderingexampleList">
                        {randomFinalCode[currentPage] && randomFinalCode[currentPage].map((eachBlock) =>
                            <p
                                key={eachBlock.num}
                                id="LineOredringExampleList"
                                onClick={() => exampleFn(eachBlock)}
                            >
                                {eachBlock.data}
                            </p>
                        )}
                    </div>
                    <div>
                        {randomFinalCode.map((_, index) => (
                            <button
                                id="codeSectionPagination"
                                key={index}
                                onClick={() => setCurrentPage(index)}
                            >
                                {"_" + (index + 1)}
                            </button>
                        ))}
                    </div>
                    <div id="BlockOrderingBtnContainer">
                        <button id="BlockOrderingBtn" style={{ borderColor: "#EF4949" }} onClick={resetFn}>초기화</button>
                        <button id="BlockOrderingBtn" style={{ borderColor: "#5C4EFF" }} onClick={completeFn}>완료</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudyLineOrdering;
