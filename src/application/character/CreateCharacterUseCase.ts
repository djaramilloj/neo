import { AppError } from '../../middleware/errorHandler';
import { Character } from '../../domain/character/Character';
import { CharacterFactory } from '../../domain/character/CharacterFactory';
import { JobName } from '../../domain/character/Job';
import { InMemoryCharacterRepository } from '../../infrastructure/persistence/InMemoryCharacterRepository';


export class CreateCharacterUseCase {
  constructor(
    private readonly characterRepository: InMemoryCharacterRepository) {
    this.characterRepository = characterRepository;
  }

    execute(name: string, job: string, userId: string): Character {
        if (!name || !job || !userId) {
            throw new AppError('Name, job and user_id are required', 400);
        }

        const existingCharacter = this.characterRepository.getCharacterByName(name, userId);
        if (existingCharacter) {
            throw new AppError('Character with this name already exists', 409); // 409 Conflict
        }

        // Create character with Factory
        const newCharacter: Character = CharacterFactory.create(name, job as JobName, userId);

        // Save without modifiers as they are calculated on the fly
        this.characterRepository.save(userId, newCharacter);

        // Return with modifiers
        const parsedCharacter: any = {
            ...newCharacter,
            stats: {
                ...newCharacter.stats,
                attackModifier: parseFloat(newCharacter.stats.attackModifier(newCharacter.stats).toFixed(2)),
                speedModifier: parseFloat(newCharacter.stats.speedModifier(newCharacter.stats).toFixed(2)),
            }
        }

        return parsedCharacter as Character;
    }
} 