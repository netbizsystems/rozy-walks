
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('hang on.. the server is warming up.');

  useEffect(() => {
    (async function () {
      const { text } = await( await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  return <div>{data}</div>;
}

export default App;