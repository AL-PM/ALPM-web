import React, { useState } from 'react';

function NewCodeUpload() {
  const [code, setCode] = useState("");

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // 엔터 키
      e.preventDefault();
      setCode(code + '\n');
    } else if (e.keyCode === 9) { // 탭 키
      e.preventDefault();
      setCode(code + '\t');
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={10}
        cols={50}
      />
    </div>
  );
}

export default NewCodeUpload;
