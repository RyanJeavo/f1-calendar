import "./index.css";
import { useEffect, useState } from "react";
import { RaceWeek } from "./components/RaceWeek.tsx";
import { NoRaceWeek } from "./components/NotRaceWeek.tsx";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/raceThisWeek")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return data.length === 0 ? <NoRaceWeek /> : <RaceWeek races={data} />;
}

export default App;
