import React, { useState, useRef } from 'react';
import './NewCodeUpload.css';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar';
import MyPageMenuBar from '../MyPageMenuBar/MyPageMenuBar';

function CodeUploadTitle({ Title }) {
  return (
    <div id="CodeUploadTitle">
      <span>|</span>
      <span>{Title}</span>
      <span>|</span>
    </div>
  );
}

function NewCodeUpload() {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("Python");
  const [codeName, setCodeName] = useState("");
  const codeRef = useRef(null);
  const descriptionRef = useRef(null);

  const codeKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      insertTextAtCursor(e.target, e.keyCode === 13 ? '\n' : '    ');
    }
  };

  const descriptionKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      e.preventDefault();
      insertTextAtCursor(e.target, e.keyCode === 13 ? '\n' : '    ');
    }
  };

  const insertTextAtCursor = (textarea, text) => {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const newValue = value.substring(0, start) + text + value.substring(end);
    textarea.value = newValue;
    textarea.selectionStart = textarea.selectionEnd = start + text.length;

    if (textarea === codeRef.current) {
      setCode(newValue);
    } else {
      setDescription(newValue);
    }
  };

  // TextArea row 설정을 위해 코드 전체의 줄 수 계산
  function countNumberOfCode(code) {
    return code.split('\n').length;
  }

  function NewCodeUploadBtcFn() {
    console.log([code, description]);
  }

  return (
    <div>
      <MainMenuBar page={"MyPage"} />
      <MyPageMenuBar MyPage={"5"} />
      <div id="CodeDetailBody">
        <CodeUploadTitle Title={"코드 언어"} />
        <div id="UploadSettingInfo">
          <span onClick={() => setLanguage("Python")} style={{ fontWeight: language === "Python" ? "bold" : 'normal', color: language === "Python" ? "#EF4949" : "black" }}>Python</span>
          <span onClick={() => setLanguage("Java")} style={{ fontWeight: language === "Java" ? "bold" : 'normal', color: language === "Java" ? "#EF4949" : "black" }}>Java</span>
          <span onClick={() => setLanguage("C++")} style={{ fontWeight: language === "C++" ? "bold" : 'normal', color: language === "C++" ? "#EF4949" : "black" }}>C++</span>
        </div>
        <CodeUploadTitle Title={"코드 이름"} />
        <input id='UploadDescription'
          value={codeName}
          onChange={(e) => setCodeName(e.target.value)}
          placeholder='여기에 업로드할 코드의 이름을 입력해주세요'
        />
        <CodeUploadTitle Title={"코드 원문"} />
        <textarea id='UploadCode'
          ref={codeRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={codeKeyDown}
          rows={countNumberOfCode(code)}
          cols={100}
          placeholder='여기에 업로드할 코드를 입력해주세요'
        />
        <CodeUploadTitle Title={"코드에 대한 설명"} />
        <textarea id='UploadDescription'
          ref={descriptionRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={descriptionKeyDown}
          rows={countNumberOfCode(description)}
          cols={100}
          placeholder='여기에 업로드할 코드에 대한 설명을 입력해주세요'
        />
      </div>
      <button onClick={NewCodeUploadBtcFn} id="CodeUploadwBtn">새로운 코드 업로드하기</button>
    </div>
  );
}

export default NewCodeUpload;
