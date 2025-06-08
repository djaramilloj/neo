import { JobStats } from "./Job";

export interface CharacterLite {
    name: string;
    job: string;
    alive: boolean;
}

export interface CharacterDetails {
    name: string;
    job: string;
    currentLifePoints: number;
    maximumLifePoints: number;
    stats: JobStats;
}