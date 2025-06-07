import { InMemoryCharacterRepository } from '../../../src/infrastructure/persistence/InMemoryCharacterRepository';
import { Character } from '../../../src/domain/character/Character';
import { JOBS } from '../../../src/domain/character/Job';

describe('InMemoryCharacterRepository', () => {
  let repo: InMemoryCharacterRepository;
  const userId = 'user1';
  const char = new Character('Hero_1', 'Warrior', { ...JOBS['Warrior'], attackModifier: () => 0, speedModifier: () => 0 });

  beforeEach(() => {
    repo = new InMemoryCharacterRepository();
  });

  it('should save and retrieve characters', () => {
    repo.save(userId, char);
    expect(repo.findAll(userId)).toContain(char);
  });

  it('should get character by name', () => {
    repo.save(userId, char);
    const found = repo.getCharacterByName(userId, 'Hero_1');
    expect(found).toBe(char);
  });

  it('should return undefined for non-existent character', () => {
    expect(repo.getCharacterByName(userId, 'Unknown')).toBeUndefined();
  });
}); 