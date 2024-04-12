import React from "react";
import UserEx from "./img/UserEx.png";

function MyProfileUserInfo({name, comment}){
    return(
        <div id="MyProfileUserBody">
            <img id="MyProfileUserImage" src={UserEx} alt="UserEx" />
            <div id="MyProfildUserInformationContainer">
                <div id="MyProfileUserUpdown">
                    <span id = "MyProfileUserLeftright" >이름</span>
                    <span id = "MyProfileUserLeftright" >|</span>
                    <span id = "MyProfileUserLeftright">{name}</span>
                </div>
                <div>
                    <span id = "MyProfileUserLeftright" >사용자 소개</span>
                    <span id = "MyProfileUserLeftright">|</span>
                    <span id = "MyProfileUserLeftright" >{comment}</span>
                </div>
            </div>
        </div>
    )
}

function MyProfileStudyHistory(){
    return(
        <div id="MyProfileStudyHistory">
            <div id="MyProfileStudyHistoryLogo">
                    <span id = "MyProfileUserLeftright" >|</span>
                    <span id = "MyProfileUserLeftright">사용자 학습 통계</span>
                    <span id = "MyProfileUserLeftright" >|</span>
            </div>
            <div id="MyProfileStudyHistoryBody">
                <div id="MyProfileStudyHistoryNumeric">
                    <div id="MyProfileHistoryUpdown">
                        <span id="MyProfileHistoryLeftright">총 학습한 타자의 수</span>
                        <span id="MyProfileHistoryLeftright">|</span>
                        <span id="MyProfileHistoryLeftright">20192830</span>
                    </div>
                    <div id="MyProfileHistoryUpdown">
                        <span id="MyProfileHistoryLeftright">총 학습한 단어의 수</span>
                        <span id="MyProfileHistoryLeftright">|</span>
                        <span id="MyProfileHistoryLeftright">20192830</span>
                    </div>
                    <div >
                        <span id="MyProfileHistoryLeftright">총 학습한 빈칸의 수</span>
                        <span id="MyProfileHistoryLeftright">|</span>
                        <span id="MyProfileHistoryLeftright">20192830</span>
                    </div>
                </div>
                <div id="MyProfileStudyHistoryGrass"></div>
            </div>
        </div>
    )
}



function MyProfile(){
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
    return(
        <div>
            <MyProfileUserInfo name={UserData.name} comment={UserData.provider}/>
            <MyProfileStudyHistory />
        </div>
    )
}
export default MyProfile;