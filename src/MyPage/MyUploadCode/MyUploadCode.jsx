import React from "react";
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult";
import MainMenuBar from "../../Etc/MainMenuBar/MainMenuBar";
import MyPageMenuBar from "../MyPageMenuBar/MyPageMenuBar";

function MyUploadCode(){
    const searchData = [
        {
            "id": 1,
            "name": "퀵 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "버블 정렬",
            "referencedCount": 2,
            "verified": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "힙 정렬",
            "referencedCount": 4,
            "verified": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 4,
            "name": "버블 정렬",
            "referencedCount": 4,
            "verified": null,
            "language": "Python",
            "owner" : "MoonKee"
        },
    ]
    return(
        <div id="MyUploadCode">
            <MainMenuBar page={"MyPage"} />
            <MyPageMenuBar MyPage={"4"}/>
            <CodeSearchResult searchData={searchData} bodyHeight={"66vh"}/>
        </div>
    )
}

export default MyUploadCode;