import React, { useState, useEffect } from "react";

function MyComponent() {
  const responses = [
    'Young Adults (18-24): { "painPoints": [ "Tight budget but still desire to remain fashionable", "Constant pressure to show off personal style", "Lack of experience in fitment for textiles & footwear", "Struggle to keep up with the latest fashion trends" ] }',
    'Seniors (65+): { "painPoints": [ "Desire for products that are comfortable and affordable", "Difficulty finding fashionable and age-appropriate items", "Outdated knowledge of current trends and new products", "Physical limitations that can make trying on textiles & footwear a challenge" ] }',
  ];
  const [painPointsArray, setPainPointsArray] = useState([]);

  useEffect(() => {
    const combinedPainPoints = responses.reduce((accumulator, response) => {
      const jsonStartIndex = response.indexOf("{");
      const jsonData = JSON.parse(response.slice(jsonStartIndex));
      return accumulator.concat(jsonData.painPoints);
    }, []);
    setPainPointsArray(combinedPainPoints);
  }, []);

  console.log(painPointsArray, "array");

  return (
    <div>
      <h2>Combined Pain Points</h2>
      <ul>
        {painPointsArray.map((painPoint, index) => (
          <li key={index}>{painPoint}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyComponent;
