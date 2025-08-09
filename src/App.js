
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('hang on.. the server is warming up');

  useEffect(() => {
    (async function () {
      const data = await( await fetch(`/api/message`)).json();
      //setData("API Returned Blob Data as Expected");
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const data = await( await fetch(`/api/getTableData`)).json();
      setData("API Returned Blob & Table Data as Expected");
      console.log(data);
    })();
  }, []);

  return <div>{data}</div>;
}

export default App;