import React, { useState } from "react";
import "./StudyHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import StudySettingBar from "../StudySettingBar/StudySettingBar.jsx";
import StudyLineOrdering from "../StudyLineOrdering/StudyLineOrdering.jsx";
import StudyTracking from "../StudyTracking/StudyTracking.jsx";
import StudyBlockOrdering from "../StudyBlockOrdering/StudyBlockOrdering.jsx";

function StudyHomeBody(){
    return(
        <div id="StudyHomeBody">
            <span>문제 출제를 위해 설정을 완료한 후 오른쪽 버튼을 눌러주세요 </span>
        </div>
    )
}

function StudyHome(){
    const [language, setlanguage] = useState("PYTHON");
    const [method, setmethod] = useState("따라치기");
    const [codegroup, setcodegroup] = useState(1);
    const [level, setlevel] = useState(1);
    const [problem, setproblem] = useState(false);
    const codegrouplist = [
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
    ]
    return(
        <div id = "StudyHome">
            <MainMenuBar page={"Study"} />
            <StudySettingBar setlanguage={setlanguage} setmethod={setmethod} setcodegroup={setcodegroup} setlevel={setlevel} setproblem={setproblem} codegrouplist={codegrouplist}/>
            {method === "줄별 순서맞추기" && problem ? <StudyLineOrdering language={language} method={method} level={level} codegroup={codegroup} problem={problem} /> : null}
            {method === "따라치기" && problem ? <StudyTracking /> : null}
            {method === "블록 순서맞추기" && problem ? <StudyBlockOrdering /> : null}
            {!problem ? <StudyHomeBody /> : null}
        </div>
       
    )
}

export default StudyHome;