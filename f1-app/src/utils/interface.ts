export interface Race {
    round: number;
    race_location: string;
    qualifying: string;
    race: string;
    sprint_qualifying?: string;
    sprint_race?: string;
}

export interface Props {
    races: Race[];
}