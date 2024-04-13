import React, { useState } from "react";
import "./StudyHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx"
import StudySettingBar from "../StudySettingBar/StudySettingBar.jsx";

function StudyHomeBody({language, method, codegroup}){
    return(
        <div id="StudyHomeBody">
            <ul>
                <li>{language}</li>
                <li>{method}</li>
                <li>{codegroup}</li>
            </ul>
        </div>
    )
}

function StudyHome(){
    const [language, setlanguage] = useState("PYTHON");
    const [method, setmethod] = useState("따라치기");
    const [codegroup, setcodegroup] = useState(1);
    const codegrouplist = [
            {
                "id": 1, 
                "name": "CodeGroup01", 
                "referencedCount": 3,
                "verified": true,
                "visible": true,
                "language": "JAVA", 
            }, 
            {
                "id": 2, 
                "name": "CodeGroup02", 
                "referencedCount": 3,
                "verified": true,
                "visible": true,
                "language": "JAVA", 
            }, 
            {
                "id": 3, 
                "name": "CodeGroup03", 
                "referencedCount": 3,
                "verified": true,
                "visible": true,
                "language": "JAVA", 
            }, 
    ]
    return(
        <div id = "StudyHome">
            <MainMenuBar page={"Study"} />
            <StudySettingBar language={language} setlanguage={setlanguage} method={method} setmethod={setmethod} codegroup={codegroup} setcodegroup={setcodegroup} codegrouplist={codegrouplist}/>
            <StudyHomeBody language={language} method={method} codegroup={codegroup} />
        </div>
       
    )
}

export default StudyHome;