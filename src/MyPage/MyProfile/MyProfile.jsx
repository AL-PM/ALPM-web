import React, { useEffect } from 'react';
import UserEx from "./img/UserEx.png";
import axios from 'axios';
import './MyProfile.css';
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";

function TextContainer({ keyword, content }) {
    function TextContainerVer1({ keyword, content }) {
        return (
            <div id="TextContainer">
                <span>{keyword}</span>
                <span>|</span>
                <span>{content}</span>
            </div>
        )
    }

    function TextContainerVer2({ keyword }) {
        return (
            <div id="TextContainer">
                <span>|</span>
                <span>{keyword}</span>
                <span>|</span>
            </div>
        )
    }
    return content ? <TextContainerVer1 keyword={keyword} content={content} /> : <TextContainerVer2 keyword={keyword} />;
}

function MyProfileUserInfo({ name, comment }) {
    return (
        <div id="MyProfileUserInfo">
            <img id="MyProfileUserImage" src={UserEx} alt="UserEx" />
            <div id="MyProfildUserInfoContainer">
                <TextContainer keyword={"이름"} content={name} />
            </div>
        </div>
    )
}

function MyProfileStudyHistory({ tracePoint, fillPoint, blockPoint, sequencePoint, historyList }) {
    return (
        <div id="MyProfileStudyHistory">
            <div id="MyProfileStudyHistoryLogo">
                <TextContainer keyword={"사용자 학습 통계"} />
            </div>
            <div id="MyProfileStudyHistoryBody">
                <div id="MyProfileStudyHistoryNumeric">
                    <TextContainer keyword={"따라친 글자의 수"} content={tracePoint} />
                    <TextContainer keyword={"순서를 맞춘 줄의 수"} content={sequencePoint} />
                    <TextContainer keyword={"순서를 맞춘 빈칸의 수"} content={blockPoint} />
                    <TextContainer keyword={"채운 빈칸의 수"} content={fillPoint} />
                </div>
                <div id="MyProfileStudyHistoryGrass">
                    <span>사용자 연속 학습 기록 [잔디] 추가 예정</span>
                </div>
            </div>
        </div>
    )
}



function MyProfile() {

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                const uid = localStorage.getItem("uid");

                const response = await axios.get(`https://alpm.duckdns.org:8080/user/${uid}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);


    const UserData = {
        "id": 21,
        "name": "홍길동",
        "provider": "뭔지 모름",
        "uid": "뭔지 모름",
        "profile": "사진",
        "tracePoint": 2024,
        "fillPoint": 412,
        "blockPoint": 9,
        "sequencePoint": 56,
        "historyList": [
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
            [
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
                {
                    "id": 2,
                    "problemType": "FILL",
                    "point": 3,
                    "algorithm": {
                        "id": 2,
                        "name": "정렬",
                        "referencedCount": 3,
                        "verified": true,
                        "language": "Java",
                    }
                },
            ],
        ]
    };
    return (
        <div>
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"1"} />
            <MyProfileUserInfo name={UserData.name} />
            <MyProfileStudyHistory tracePoint={UserData.tracePoint} fillPoint={UserData.fillPoint} sequencePoint={UserData.sequencePoint} blockPoint={UserData.blockPoint} historyList={UserData.historyList} />
        </div>
    )
}
export default MyProfile;