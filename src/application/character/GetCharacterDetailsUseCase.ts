import { Character } from '@/domain/character/Character';
import { InMemoryCharacterRepository } from '../../infrastructure/persistence/InMemoryCharacterRepository';
import { AppError } from '../../middleware/errorHandler';
import { CharacterDetails } from '@/domain/character/models';

export class GetCharacterDetailsUseCase {
  constructor(private readonly characterRepository: InMemoryCharacterRepository) {}

  execute(name: string): CharacterDetails {
    const character: Character | undefined = this.characterRepository.getCharacterByName(name);
    if (!character) {
      throw new AppError('Character not found', 404);
    }
    const parsedCharacter: any = {
      name: character.name,
      job: character.job,
      currentLifePoints: character.stats.currentHealth, // Use currentHealth
      maximumLifePoints: character.stats.maximumHealth, // Max health from stats
      stats: {
        strength: character.stats.strength,
        dexterity: character.stats.dexterity,
        intelligence: character.stats.intelligence,
        attackModifier: parseFloat(character.stats.attackModifier(character.stats).toFixed(2)),
        speedModifier: parseFloat(character.stats.speedModifier(character.stats).toFixed(2))
      }
    };

    return parsedCharacter as CharacterDetails;
  }
} 