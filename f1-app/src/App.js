import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/calendar")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (data === null) {
    return (
      <div>
        <p>Race Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>It's Race Week!</h1>

      {data.map((race) => (
        <div key={race.round}>
          <p>
            <span>Location:</span> {race.race_location}
          </p>
          <p>
            <span>Quali:</span> {race.qualifying}
          </p>
          <p>
            <span>Race:</span> {race.race}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
