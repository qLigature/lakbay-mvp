import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState('Loading...');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:9000/');
      console.log(response);
      const result = await response.json();
      setData(result.message);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>{data}</h1>
    </>
  );
}

export default App;
