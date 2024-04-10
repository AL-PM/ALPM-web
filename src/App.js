import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MyProfile from './MyPage/MyProfile/MyProfile';
import StudyHome from './Study/StudyHome/StudyHome';
import CodeHome from './CodeCommunity/CodeHome/CodeHome';
import CodeGroupHome from './CodeGroupCommunity/CodeGroupHome/CodeGroupHome';


function App(){
    return(
        <Router>
            <Switch>
                <Route path="/"><StudyHome /></Route>
                <Route path="/mypage"><MyProfile /></Route>
                <Route path="/codecommunity"><CodeHome /></Route>
                <Route path="/codegroupcommunity"><CodeGroupHome /></Route>
            </Switch>
        </Router>
    )
}

export default App;