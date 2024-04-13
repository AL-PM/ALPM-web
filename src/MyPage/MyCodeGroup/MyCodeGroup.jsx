import React from "react";
import CodeGroupSearchResult from "../../Etc/CodeGroupSearchResult/CodeGroupSearchResult";

function MyCodeGroup(){
    const searchData = [
        {
            "id": 1,
            "name": "다양한 정렬 알고리즘",
            "referencedCount": 2,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "Byeongchan"
        },
        {
            "id": 2,
            "name": "스택 관련 자료 구조",
            "referencedCount": 2,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "Rangjin"
        },
        {
            "id": 3,
            "name": "Knapsack",
            "referencedCount": 4,
            "verified": true,
            "visible": true,
            "language": "Python",
            "owner" : "HyeonWoo"
        },
        {
            "id": 4,
            "name": "n-queen problem",
            "referencedCount": 4,
            "verified": null,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 5,
            "name": "Linked-List",
            "referencedCount": 4,
            "verified": null,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 6,
            "name": "Binary Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 7,
            "name": "Tree Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
        {
            "id": 7,
            "name": "Tree Search",
            "referencedCount": 4,
            "verified": false,
            "visible": true,
            "language": "Python",
            "owner" : "MoonKee"
        },
    ]
    return(
        <div id="MyCodeGroup">
            <CodeGroupSearchResult searchData={searchData} bodyHeight={"66vh"}/>
        </div>
    )
}
export default MyCodeGroup;