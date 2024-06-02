import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import LoadingSpinner from '../../Etc/LoadingSpinner/LoadingSpinner';
import './MyCodeGroup.css';
import './MyCodeGroupNew.css'; // Create and import a CSS file for styling

function MyCodeGroupNew() {
    const [groupName, setGroupName] = useState('');
    const [language, setLanguage] = useState('C');
    const [isPublic, setIsPublic] = useState(false);

    const handleSubmit = async () => {
        try {
            const access_token = localStorage.getItem("access_token");

            // First API call: POST to create the code group
            const postResponse = await axios.post(`https://alpm.duckdns.org:8080/codeGroup/create`, {
                name: groupName,
                language: language,
                visible: isPublic
            }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (postResponse.status === 200) {
                console.log(postResponse);
                const newGroupId = postResponse.data.id;

                // Second API call: PATCH to import the code group
                const patchResponse = await axios.patch(`https://alpm.duckdns.org:8080/codeGroup/import/${newGroupId}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                if (patchResponse.status === 200) {
                    alert('코드 그룹 생성 및 업로드가 완료되었습니다');
                } else {
                    alert('코드 그룹 업로드에 실패했습니다');
                }
            } else {
                alert('코드 그룹 생성에 실패했습니다');
            }
        } catch (error) {
            console.error(error);
            alert('업로드 중 오류가 발생했습니다');
        }
    };

    const handleToggle = () => {
        setIsPublic(!isPublic);
    };

    return (
        <div className="code-group-container">
            <div className="input-row">
                <div className="input-group">
                    <label htmlFor="groupName">코드 그룹 이름</label>
                    <input
                        type="text"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="language">코드 그룹의 언어</label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="C">C++</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="isPublic">공개 여부</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="isPublic"
                            checked={isPublic}
                            onChange={handleToggle}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <button onClick={handleSubmit} id="NewCodeGroupBtn">코드 그룹 생성</button>
        </div>
    );
}


function MyCodeGroup() {

    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/codeGroup/user/${uid}`, {
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

    if (!searchResult) {
        return (
            <div id="MyCodeGroup">
                <MainMenuBar page={"MyPage"} />
                <MyPageMenuBar MyPage={"3"} />
                <LoadingSpinner color={"EF4949"} comment={"Loading"}/>
            </div>
        );
    }

    console.log(searchResult);

    return (
        <div id="MyCodeGroup">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"3"} />
            <CodeGroupSearchResult searchData={searchResult.content} bodyHeight={"55vh"} />
            <MyCodeGroupNew />
        </div>
    );
}

export default MyCodeGroup;
