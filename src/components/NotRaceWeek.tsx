import { useEffect, useState } from "react";

export function NoRaceWeek() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/nextRace")
            .then((res) => res.json())
            .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching next race:",error);
            setLoading(false);  
        });
  }, []);
  const races = data

    if (loading) {
        return <div>Loading next race...</div>;
    }

    if (data.length === 0) {
        return <div>"It's the end of the season Ryan, update your DB!"</div>;
    }

    return (
        <div style={{ textAlign: 'center',  padding: '20px 10px' }} className="race-card">
            <h1>It's Not Race Week</h1>
            {races.map((race) => (
                <div key={race.round} className="inner-section"> 
                    <h2>The next race is:</h2>
                    <h3>{race.race_location}</h3>
                </div>
            ))}
        </div>
    )
}