import React from "react";
import CodeSearchResult from "../../Etc/CodeSearchResult/CodeSearchResult";

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
            <CodeSearchResult searchData={searchData} bodyHeight={"66vh"}/>
        </div>
    )
}

export default MyUploadCode;