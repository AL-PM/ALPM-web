import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./StudyHome.css";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar.jsx";
import StudySettingBar from "../StudySettingBar/StudySettingBar.jsx";
import StudyLineOrdering from "../StudyLineOrdering/StudyLineOrdering.jsx";
import StudyTracking from "../StudyTracking/StudyTracking.jsx";
import StudyBlockOrdering from "../StudyBlockOrdering/StudyBlockOrdering.jsx";
import StudyBlockWriting from "../StudyBlockWriting/StudyBlockWriting.jsx";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner.jsx';

function Banner({ message, type }) {
    return (
      <div className={`banner ${type}`}>
        {message}
      </div>
    );
  }

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
    const [codegroup, setCodeGroup] = useState(-1);
    const [level, setLevel] = useState(1);
    const [problem, setProblem] = useState(false);
    const [searchResult, setSearchResult] = useState();
    const [problemCode, setProblemCode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [banner, setBanner] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                console.log("access token : " + access_token);
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/user/${uid}`, {
                    params: {
                        page: 0, // Use currentPage state
                        size: 100
                    },
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                setSearchResult(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();

    }, []);

    const fetchProblemCode = async () => {
        setIsLoading(true);
        try {
            const access_token = localStorage.getItem("access_token");

            const response = await axios.get(`https://alpm.duckdns.org:8080/algorithm/random/codeGroup/${codegroup}`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            setProblemCode(response.data);
            console.log(response.data);
            setProblem(true);
        } catch (error) {
            setBanner({ show: true, message: '올바른 코드그룹을 골라서 다시 시도해주세요.', type: 'error' });
            setTimeout(() => {
                setBanner({ show: false, message: '', type: '' });
              }, 3000);
            console.error(error);
        }
        setIsLoading(false);
    };

    const resetProblemCode = () => {
        setProblem(false);
        setProblemCode(null);
    };

    if (!searchResult || isLoading) {
        return (
            <div id="MyCodeGroup">
                <MainMenuBar page={"Study"} />
                <LoadingSpinner color={"#5C4EFF"} comment={"학습 환경 구성중"}/>
            </div>
        );
    }

    console.log(searchResult);

    return (
        <div id="StudyHome">
            {banner.show && <Banner message={banner.message} type={banner.type} />}
            <MainMenuBar page={"Study"} />
            <StudySettingBar 
                setLanguage={setLanguage} 
                setMethod={setMethod} 
                setCodeGroup={setCodeGroup} 
                setLevel={setLevel} 
                codegrouplist={searchResult.content}
                problem={problem}
                language={language}
                method={method}
                level={level}
                fetchProblemCode={fetchProblemCode}
                resetProblemCode={resetProblemCode}
                problemCode={problemCode}
            />
            {method === "줄별 순서맞추기" && problem && problemCode ? <StudyLineOrdering problemCode={problemCode}  /> : null}
            {method === "따라치기" && problem && problemCode ? <StudyTracking problemCode={problemCode} /> : null}
            {method === "블록 순서맞추기" && problem && problemCode ? <StudyBlockOrdering problemCode={problemCode} level={level} /> : null}
            {method === "빈칸 채우기" && problem && problemCode ? <StudyBlockWriting problemCode={problemCode} level={level} /> : null}
            {!problem ? <StudyHomeBody /> : null}
        </div>
    );
}

export default StudyHome;
