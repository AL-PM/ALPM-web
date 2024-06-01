import React, { useState, useRef } from 'react';
import './NewCodeUpload.css';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar';
import MyPageMenuBar from '../MyPageMenuBar/MyPageMenuBar';
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner';
import { HashLoader} from 'react-spinners';

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
  const [upload, setUpload] = useState(false);

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

  function countNumberOfCode(code) {
    return code.split('\n').length;
  }

  async function NewCodeUploadBtcFn() {
    setUpload(true);
    alert(" 코드 업로드를 진행합니다.");
    /*
    try {
      let tmp = code.replace("\t", "    ");
      console.log([tmp, description]);
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: tmp, description, language, codeName }),
      });

      if (response.ok) {
        alert('업로드가 완료되었습니다');
      } else {
        alert('업로드에 실패했습니다');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('업로드 중 오류가 발생했습니다');
    } finally {
      setUpload(false);
    }
    */
  }

  if (upload) {
    return (
      <div>
        <MainMenuBar page={"MyPage"} />
        <MyPageMenuBar MyPage={"5"} />
        <HashLoader id='NewCodeUploadSpinner'  color="#EF4949" />
      </div>
    );
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
