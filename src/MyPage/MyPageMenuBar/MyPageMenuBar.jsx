import React from "react"
import './MyPageMenuBar.css';

function MyPageMenuBar({MyPage}){
    return(
        <div>
            <div id="MyPageMenuBar">
                <span style={{fontWeight : MyPage === "1" ? "bold" : "normal", color : MyPage ==="1" ? "#EF4949" : "black"}} onClick={()=>console.log("1")}>내 정보</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "2" ? "bold" : "normal", color : MyPage ==="2" ? "#EF4949" : "black"}} onClick={()=>console.log("2")}>내 코드 보드 관리</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "3" ? "bold" : "normal", color : MyPage ==="3" ? "#EF4949" : "black"}} onClick={()=>console.log("3")}>내 코드 그룹 관리</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "4" ? "bold" : "normal", color : MyPage ==="4" ? "#EF4949" : "black"}} onClick={()=>console.log("4")}>내가 작성한 코드 관리</span>
                <span>|</span>
                <span style={{fontWeight : MyPage === "5" ? "bold" : "normal", color : MyPage ==="5" ? "#EF4949" : "black"}} onClick={()=>console.log("5")}>새로운 코드 업로드</span>
            </div>
        </div>
    )
}

export default MyPageMenuBar;