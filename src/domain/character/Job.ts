export type JobName = 'Warrior' | 'Thief' | 'Mage';


export interface JobStats {
    currentHealth: number;
    maximumHealth: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    attackModifier: (stats: JobStats) => number;
    speedModifier: (stats: JobStats) => number;
}


export const JOBS: Record<JobName, JobStats> = {
    Warrior: {
        currentHealth: 20,
        maximumHealth: 20,
        strength: 10,
        dexterity: 5,
        intelligence: 5,
        attackModifier: (stats: JobStats) => stats.strength * 0.8 + stats.dexterity * 0.2,
        speedModifier: (stats: JobStats) => stats.dexterity * 0.6 + stats.intelligence * 0.2,
    },
    Thief: {
        currentHealth: 15,
        maximumHealth: 15,
        strength: 4,
        dexterity: 10,
        intelligence: 4,
        attackModifier: (stats: JobStats) => stats.strength * 0.25 + stats.dexterity * 1 + stats.intelligence * 0.25,
        speedModifier: (stats: JobStats) => stats.dexterity * 0.8,
    },
    Mage: {
        currentHealth: 12,
        maximumHealth: 12,
        strength: 5,
        dexterity: 6,
        intelligence: 10,
        attackModifier: (stats: JobStats) => stats.strength * 0.2 + stats.dexterity * 0.2 + stats.intelligence * 1.2,
        speedModifier: (stats: JobStats) => stats.dexterity * 0.4 + stats.strength * 0.1,
    },
}; 