import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewCodeUpload.css';
import MainMenuBar from '../../Etc/MainMenuBar/MainMenuBar';
import MyPageMenuBar from '../MyPageMenuBar/MyPageMenuBar';
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner';

function CodeUploadTitle({ Title }) {
  return (
    <div id="CodeUploadTitle">
      <span>|</span>
      <span>{Title}</span>
      <span>|</span>
    </div>
  );
}

function NewCodeBanner({ message, type, onConfirm }) {
  return (
    <div className={`new-code-banner ${type}`}>
      <span className={`new-code-banner-message ${type}`}>{message}</span>
      {type === 'success' && (
        <button onClick={onConfirm} className="confirm-button">확인</button>
      )}
    </div>
  );
}

function NewCodeUpload() {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("PYTHON");
  const [codeName, setCodeName] = useState("");
  const codeRef = useRef(null);
  const descriptionRef = useRef(null);
  const [upload, setUpload] = useState(false);
  const navigator = useNavigate();
  const [banner, setBanner] = useState({ show: false, message: '', type: '' });

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

  const NewCodeUploadBtcFn = async () => {
    setUpload(true);
    console.log({
      name: codeName,
      language: language,
      content: code.replace(/\t/g, "    "),
      description: description
    });
    try {
      const access_token = localStorage.getItem("access_token");

      const response = await axios.post(`https://alpm.duckdns.org:8080/algorithm/create`, {
        name: codeName,
        language: language,
        content: code.replace(/\t/g, "    "),
        description: description
      }, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        console.log(response);
        setBanner({ show: true, message: '업로드가 완료되었습니다. 확인 버튼을 눌러 사용자 코드 목록으로 이동합니다', type: 'success' });
      } else {
        setBanner({ show: true, message: '업로드에 실패하였습니다.', type: 'error' });
        setTimeout(() => {
          setBanner({ show: false, message: '', type: '' });
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setBanner({ show: true, message: '업로드 중 오류가 발생했습니다.', type: 'error' });
      setTimeout(() => {
        setBanner({ show: false, message: '', type: '' });
      }, 5000);
    } finally {
      setUpload(false);
    }
  };

  const handleConfirm = () => {
    setBanner({ show: false, message: '', type: '' });
    navigator('/mypage/MyUploadCode');
  };

  if (upload) {
    return (
      <div>
        <MainMenuBar page={"MyPage"} />
        <MyPageMenuBar MyPage={"5"} />
        <LoadingSpinner color={"#EF4949"} comment={"새로운 코드 업로드 하는 중"} />
      </div>
    );
  }

  return (
    <div>
      {banner.show && <NewCodeBanner message={banner.message} type={banner.type} onConfirm={handleConfirm} />}
      <MainMenuBar page={"MyPage"} />
      <MyPageMenuBar MyPage={"5"} />
      <div id="CodeDetailBody">
        <CodeUploadTitle Title={"코드 언어"} />
        <div id="UploadSettingInfo">
          <button
            onClick={() => setLanguage("PYTHON")}
            className={language === "PYTHON" ? "selected" : ""}
          >
            PYTHON
          </button>
          <button
            onClick={() => setLanguage("JAVA")}
            className={language === "JAVA" ? "selected" : ""}
          >
            JAVA
          </button>
          <button
            onClick={() => setLanguage("C")}
            className={language === "C" ? "selected" : ""}
          >
            C++
          </button>
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
