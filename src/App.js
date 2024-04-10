import React from "react";
import CodeHome from './CodeCommunity/CodeHome/CodeHome';

function App(){
    return(
        <CodeHome />

        /*
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudyHome />} />
                <Route path="/mypage" element={<MyProfile />} />
                <Route path="/code" element={<CodeHome />} />
                <Route path="/codegroup" element={<CodeGroupHome />} />
            </Routes>
        </BrowserRouter>
        */
    )
}

export default App;