import React, { useState, useEffect } from 'react';

function FetchBanner() {

  const [bannerText, setBannerText] = useState('Loading...');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:9000/');
      console.log(response);
      const result = await response.json();
      setBannerText(result.message);
    }
    fetchData();
  }, []);

  return <h1>{bannerText}</h1>;
}

export default FetchBanner;