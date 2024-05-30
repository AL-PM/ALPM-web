import React, { useState } from "react";
import "./StudyHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";
import StudySettingBar from "../StudySettingBar/StudySettingBar.jsx";
import StudyLineOrdering from "../StudyLineOrdering/StudyLineOrdering.jsx";
import StudyTracking from "../StudyTracking/StudyTracking.jsx";
import StudyBlockOrdering from "../StudyBlockOrdering/StudyBlockOrdering.jsx";
import StudyBlockWriting from "../StudyBlockWriting/StudyBlockWriting.jsx";

function StudyHomeBody() {
    return (
        <div id="StudyHomeBody">
            <span>문제 출제를 위해 설정을 완료한 후 오른쪽 버튼을 눌러주세요 </span>
        </div>
    );
}

function StudyHome() {
    const [language, setLanguage] = useState("PYTHON");
    const [method, setMethod] = useState("따라치기");
    const [codegroup, setCodeGroup] = useState(1);
    const [level, setLevel] = useState(1);
    const [problem, setProblem] = useState(false);
    const codeGroupList = [
        {
            "id": 1,
            "name": "CodeGroup01",
            "referencedCount": 3,
            "verified": true,
            "visible": true,
            "language": "Java",
        },
        {
            "id": 2,
            "name": "CodeGroup02",
            "referencedCount": 3,
            "verified": true,
            "visible": true,
            "language": "Java",
        },
        {
            "id": 3,
            "name": "CodeGroup03",
            "referencedCount": 3,
            "verified": true,
            "visible": true,
            "language": "Java",
        },
    ];

    return (
        <div id="StudyHome">
            <MainMenuBar page={"Study"} />
            <StudySettingBar 
                setLanguage={setLanguage} 
                setMethod={setMethod} 
                setCodeGroup={setCodeGroup} 
                setLevel={setLevel} 
                setProblem={setProblem} 
                codegrouplist={codeGroupList}
            />
            {method === "줄별 순서맞추기" && problem ? <StudyLineOrdering language={language} method={method} level={level} codegroup={codegroup} problem={problem} /> : null}
            {method === "따라치기" && problem ? <StudyTracking /> : null}
            {method === "블록 순서맞추기" && problem ? <StudyBlockOrdering /> : null}
            {method === "빈칸 채우기" && problem ? <StudyBlockWriting /> : null}
            {!problem ? <StudyHomeBody /> : null}
        </div>
    );
}


export default StudyHome;
