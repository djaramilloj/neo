import { Character } from '@/domain/character/Character';
import { InMemoryCharacterRepository } from '../../infrastructure/persistence/InMemoryCharacterRepository';
import { CharacterLite } from '@/domain/character/models';

export class GetCharacterListUseCase {
  constructor(private readonly characterRepository: InMemoryCharacterRepository) {}

  /**
   * No need to pass userId as we are returning all characters in the repository
   * @returns all characters in the repository
   */
  execute(): CharacterLite[] {
    const characters: Character[] = this.characterRepository.findAll();
    return characters.map(character => ({
      name: character.name,
      job: character.job,
      alive: character.stats.currentHealth > 0
    }));
  }
} 