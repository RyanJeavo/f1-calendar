import { Props } from "../utils/interface"

const formatRaceDate = (dateString?: string) => {
if (!dateString) return;
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export function RaceWeek({ races }: Props) {
    return (
        <div style={{ textAlign: 'center',  padding: '20px 10px' }}>
            <h1>It's Race Week!</h1>
            {races.map((race) => (
                <div key={race.round} className="race-card">
                    <div className="inner-section">
                        <h2>Location:</h2>
                        <h3>{race.race_location}</h3>
                    
                    {race.sprint_qualifying && (
                        <div className="inner-section">
                                <h2>Sprint Qualifying:</h2>
                                <h3>{formatRaceDate(race.sprint_qualifying)}</h3>
                                <h2>Sprint Race:</h2>
                                <h3>{formatRaceDate(race.sprint_race)}</h3>
                        </div>
                    )}
                        <h2>Quali:</h2>
                        <h3>{formatRaceDate(race.qualifying)}</h3>
                        <h2>Race:</h2>
                        <h3>{formatRaceDate(race.race)}</h3>
                        </div>
                </div>
            ))}
        </div>
    )
}