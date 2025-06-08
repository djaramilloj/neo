import { JobName, JOBS, JobStats } from './Job';


export class Character {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public job: JobName, // Without readonly, the job can be modified
        public stats: JobStats // Without readonly, the stats can be modified
    ) {
        this.userId = userId;
        this.stats = stats;
        this.job = job;
        this.name = name;
    }

    /**
     * Simple leveling up mechanism.
     * Level up the character by adding the new stats to the existing stats.
     * This is added as in the future this is expected to be used
     * @param newStats - The new stats to add to the character.
     * 
     * NOTE: We might want to use Observer Pattern to notify other classes about the level up. (Domain Events)
     */
    levelUp(newStats: Partial<JobStats>) {
        this.stats = { ...this.stats, ...newStats };
    }

    changeJob(newJob: JobName) {
        this.job = newJob;
        this.stats = JOBS[newJob];
    }
} 