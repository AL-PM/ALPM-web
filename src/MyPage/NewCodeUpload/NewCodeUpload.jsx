import React, { useState } from 'react';
import './NewCodeUpload.css';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar';
import MyPageMenuBar from '../MyPageMenuBar/MyPageMenuBar';

function CodeUploadTitle({Title}){
    return(
        <div id="CodeUploadTitle">
            <span>|</span>
            <span>{Title}</span>
            <span>|</span>
        </div>
    )
}

function CodeUploadwBtn(){
  return(
      <button id="CodeUploadwBtn">새로운 코드 업로드하기</button>
  )
}

function NewCodeUpload() {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [language, setlanguage] = useState("Python");
  const [codeName, setCodeName] = useState("");

  const codeKeyDown = (e) => {
    if (e.keyCode === 13) { // 엔터 키
      e.preventDefault();
      setCode(code + '\n');
    } else if (e.keyCode === 9) { // 탭 키
      e.preventDefault();
      setCode(code + '\t');
    }
  };

  const descriptionKeyDown = (e) => {
    if (e.keyCode === 13) { // 엔터 키
      e.preventDefault();
      setDescription(description + '\n');
    } else if (e.keyCode === 9) { // 탭 키
      e.preventDefault();
      setDescription(description + '\t');
    } 
  };

  return (
    <div>
        <MainMenuBar page={"MyPage"} />
        <MyPageMenuBar MyPage={"5"}/>
        <div id="CodeDetailBody">
            <CodeUploadTitle Title={"코드 언어"}/>
            <div id="UploadSettingInfo">
                <span onClick={()=>setlanguage("Python")}  style={{fontWeight:language==="Python" ? "bold" : 'normal' , color : language ==="Python" ? "#EF4949" : "black"}}>Python</span>
                <span onClick={()=>setlanguage("Java")}  style={{fontWeight:language==="Java" ? "bold" : 'normal' , color : language ==="Java" ? "#EF4949" : "black"}} >Java</span>
                <span onClick={()=>setlanguage("C++")}  style={{fontWeight:language==="C++" ? "bold" : 'normal' , color : language ==="C++" ? "#EF4949" : "black"}} >C++</span>
            </div> 
            <CodeUploadTitle Title={"코드 이름"}/>
            <input id='UploadContent' style={{fontSize:"medium"}}
                value={codeName}
                onChange={(e) => setCodeName(e.target.value)}
                placeholder='여기에 업로드할 코드의 이름을 입력해주세요'
            />
            <CodeUploadTitle Title={"코드 원문"}/>
            <textarea id='UploadContent' style={{fontSize:"large"}}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={codeKeyDown}
                rows={20}
                cols={100}
                placeholder='여기에 업로드할 코드를 입력해주세요'
            />
            <CodeUploadTitle Title={"코드에 대한 설명"}/>
            <textarea id='UploadContent' style={{fontSize:"large"}}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={descriptionKeyDown}
                rows={10}
                cols={100}
                placeholder='여기에 업로드할 코드에 대한 설명을 입력해주세요'
            />
        </div>
        <CodeUploadwBtn />
    </div>
  );
}

export default NewCodeUpload;
