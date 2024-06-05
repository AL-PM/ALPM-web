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

function Banner({ message, type }) {
  return (
    <div className={`banner ${type}`}>
      {message}
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
    })
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
        setBanner({ show: true, message: '업로드가 완료되었습니다', type: 'success' });
        setTimeout(() => {
          setBanner({ show: false, message: '', type: '' });
        }, 3000);
        navigator('/mypage/MyUploadCode');
      } else {
        setBanner({ show: true, message: '업로드에 실패하였습니다.', type: 'error' });
        setTimeout(() => {
          setBanner({ show: false, message: '', type: '' });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setBanner({ show: true, message: '업로드 중 오류가 발생했습니다.', type: 'error' });
      setTimeout(() => {
      setBanner({ show: false, message: '', type: '' });
      }, 3000);
    } finally {
      setUpload(false);
    }
  };


  if (upload) {
    return (
      <div>
        <MainMenuBar page={"MyPage"} />
        <MyPageMenuBar MyPage={"5"} />
        <LoadingSpinner color={"EF4949"} comment={"새로운 코드 업로드 하는 중"} />
      </div>
    );
  }

  return (
    <div>
      {banner.show && <Banner message={banner.message} type={banner.type} />}
      <MainMenuBar page={"MyPage"} />
      <MyPageMenuBar MyPage={"5"} />
      <div id="CodeDetailBody">
        <CodeUploadTitle Title={"코드 언어"} />
        <div id="UploadSettingInfo">
          <span onClick={() => setLanguage("PYTHON")} style={{ fontWeight: language === "PYTHON" ? "bold" : 'normal', color: language === "PYTHON" ? "#EF4949" : "black" }}>PYTHON</span>
          <span onClick={() => setLanguage("JAVA")} style={{ fontWeight: language === "JAVA" ? "bold" : 'normal', color: language === "JAVA" ? "#EF4949" : "black" }}>JAVA</span>
          <span onClick={() => setLanguage("C")} style={{ fontWeight: language === "C" ? "bold" : 'normal', color: language === "C" ? "#EF4949" : "black" }}>C++</span>
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
