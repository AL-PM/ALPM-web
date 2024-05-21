import React, { useState, useEffect } from "react";
import './StudyBlockOrdering.css';

function StudyBlockOrdering() {
    const [finalCode, setFinalCode] = useState(null);

    useEffect(() => {
        // 사용자가 지정한 레벨
        let numOfBlankInLevel = 15;

        const code = {
            "level": 1,
            "text" : '#include <bits/stdc++.h>\n#define ll long long\nusing namespace std;\nll N, M;\nll arr[100005];\nvector<ll> SegTree;\nll Query(ll n, ll l, ll r, ll st, ll ed) {\n\tif (l > $ed$ || r < $st$) // 탐색 범위를 벗어나는 경우\n\t\treturn $0$;\n\tif (l >= $st$ && r <= $ed$) // 목표 범위에 속하는 경우\n\t\treturn $SegTree[n]$;\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\treturn Query($n * 2$, $l$, $mid$, $st$, $ed$) + Query($n * 2 + 1$, $mid + 1$, $r$, $st$, $ed$); // 왼쪽 구간과 오른쪽 구간을 탐색\n}\n\nll Update(ll n, ll l, ll r, ll pos, ll x) {\n\tif (l > $pos$ || r < $pos$) // 탐색범위를 벗어나면\n\t\treturn $SegTree[n]$; // 해당 세그먼트 트리의 값을 반환\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $x$;\n\t\treturn $SegTree[n]$; // 새로 입력받은 값을 반환\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Update($n * 2$, $l$, $mid$, $pos$, $x$) + Update($n * 2 + 1$, $mid + 1$, $r$, $pos$, $x$); // 왼쪽 구간과 오른쪽 구간을 탐색\n\treturn $SegTree[n]$;\n}\n\nll Init(ll n, ll l, ll r) {\n\tif (l == $r$) { // leaf node에 도달하면\n\t\tSegTree[n] = $arr[l]$; // arr[l] 값이 상위노드로 넘어감\n\t\treturn $SegTree[n]$;\n\t}\n\tll mid = $(l + r) / 2$; // 중심값 선언\n\tSegTree[n] = Init($n * 2$, $l$, $mid$) + Init($n * 2 + 1$, $mid + 1$, $r$); // 왼쪽 구간과 오른쪽 구간으로 분할\n\treturn $SegTree[n]$;\n}\n\nint main() {\n\tios::sync_with_stdio(0);\n\tcin.tie(0);\n\n\tcin >> N >> M;\n\tfor (int i = 1; i <= N; i++)\n\t\tcin >> arr[i]; // 원소 입력 받음\n\n\tSegTree.resize(4 * N); // 세그먼트 트리 크기가 4*N 인 벡터 생성\n\tInit(1, 1, N); // 세그먼트 트리 초기화\n\n\tfor (int i = 0; i < M; i++) {\n\t\tll x, a, b;\n\t\tcin >> x >> a >> b;\n\t\tif (x) // x가 1이면\n\t\t\tcout << Query(1, 1, N, a, b) << "\\n"; // a번째부터 b번째까지의 합 출력\n\t\telse // x가 0이면\n\t\t\tUpdate(1, 1, N, a, b); // a번째 원소를 b로 변경\n\t}\n\n\treturn 0;\n}'        
        };

        function preprocessCode(code, level) {
            // 전체 출력 데이터
            let finalCode = [];

            // 각 줄을 객체로 변환하여 저장할 배열
            let processedCode = [];

            // 빈칸 데이터를 추출하여 저장할 배열
            let blockData = [];

            let totalNumOfBlank = 0;

            // 코드 줄별로 분리
            let lines = code.split("\n");

            function extractCode(line) {
                let codeWithoutComment = line.split("//")[0]; // 주석 제거
                let trimmedCode = codeWithoutComment.replace(/\s+$/, ''); // 뒤쪽 공백 제거
                return trimmedCode;
            }

            function caculateNumOfBlank(splittedLine){
                for (let i = 0; i < splittedLine.length; i++) {
                    if (i % 2 === 1) {
                        totalNumOfBlank += 1;
                    }
                }
            }

            // 문제 데이터 추출 및 저장
            function extractBlock(splittedLine, probability, num) {
                let nowNumOfBlank = 0; // 현재까지 추가된 빈칸 데이터 개수
                while (!(nowNumOfBlank === 15)) {
                    nowNumOfBlank = 0;
                    for (let i = 0; i < splittedLine.length; i++) {
                        if (i % 2 === 1 && nowNumOfBlank < 15) {
                            // 빈칸 데이터를 추가하는 조건 변경
                            // probability에 따라 추가할지 여부는 아래의 Math.random()을 통해 결정됨
                            if (Math.random() < probability) {
                                nowNumOfBlank += 1;
                                blockData.push({
                                    data: splittedLine[i],
                                    linenum: num + 1,
                                    inlinenum: i,
                                });
                            }
                        }
                    }
                }
}

            

            // 코드를 객체로 변환하고 배열에 저장
            for (let i = 0; i < lines.length; i++) {
                let linedata = extractCode(lines[i]);
                let preprocessLine = linedata.split("$");
                caculateNumOfBlank(preprocessLine);
                processedCode.push({
                    splitted: preprocessLine,
                    data: extractCode(lines[i]),
                    num: i + 1, // 줄 수는 1부터 시작
                });
            }

            let probability = level / totalNumOfBlank;

            for (let i = 0; i < lines.length; i++) {
                let linedata = extractCode(lines[i]);
                let preprocessLine = linedata.split("$");
                extractBlock(preprocessLine, probability, i);
            }

            finalCode = [processedCode, blockData, totalNumOfBlank, probability];

            return finalCode;
        }

        function getRandomNumbers(N, M) {
            // 결과를 담을 배열
            let result = [];

            // 0부터 N까지의 숫자를 배열에 추가
            for (let i = 0; i < N; i++) {
                result.push(i);
            }

            // Fisher-Yates 알고리즘을 사용하여 배열을 무작위로 섞음
            for (let i = result.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [result[i], result[j]] = [result[j], result[i]];
            }

            result.splice(15);

            result.sort((a, b) => a - b);

            // 배열의 첫 M개 요소 반환
            return result;
        }

        // 코드와 블록 데이터 전처리
        const preprocessedCode = preprocessCode(code.text, numOfBlankInLevel);

        console.log(preprocessedCode);
        
        // 랜덤한 숫자 배열 생성 및 설정
        const randomNumbers = getRandomNumbers(preprocessedCode[2], numOfBlankInLevel);
        
        // 전처리된 코드 설정
        setFinalCode(preprocessedCode);
        

    }, []); // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 처음 렌더링될 때만 useEffect가 실행되도록 설정

    return (
        <div id="StudyBlockOrdering">
            {finalCode && finalCode[0].map((lineData) =>
                <div key={lineData.num}>
                    <textarea
                        readOnly
                        id="StudyBlockOrderingCodeArea"
                        rows={1}
                        cols={140}
                        defaultValue={(lineData.data)} // defaultValue 속성 사용
                    />
                </div>
            )}
        </div>
    )
}

export default StudyBlockOrdering;
