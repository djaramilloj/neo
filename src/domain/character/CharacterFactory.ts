import { AppError } from '../../middleware/errorHandler';
import { Character } from './Character';
import { JOBS, JobName } from './Job';


export class CharacterFactory {

    /**
     * Create a new character. It is a static method because it is not associated with any instance of the class.
     * This is a common practice to create a factory method.
     * @param name - The name of the character
     * @param job - The job of the character
     * @returns The created character
     */
    static create(name: string, job: JobName, userId: string): Character {
        if (!/^[a-zA-Z_]{4,15}$/.test(name)) {
            throw new AppError('Name must be 4-15 letters or underscores.', 400);
        }
        if (!Object.keys(JOBS).includes(job)) {
            throw new AppError('Invalid job type.', 400);
        }
        const stats = JOBS[job];
        return new Character(userId, name, job, stats);
    }
} 