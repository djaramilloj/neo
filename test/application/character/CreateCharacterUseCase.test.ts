import { CreateCharacterUseCase } from '../../../src/application/character/CreateCharacterUseCase';
import { InMemoryCharacterRepository } from '../../../src/infrastructure/persistence/InMemoryCharacterRepository';
import { AppError } from '../../../src/middleware/errorHandler';

const userId = 'user1';

describe('CreateCharacterUseCase', () => {
  let repo: InMemoryCharacterRepository;
  let useCase: CreateCharacterUseCase;

  beforeEach(() => {
    repo = new InMemoryCharacterRepository();
    useCase = new CreateCharacterUseCase(repo);
  });

  it('should create a character successfully', () => {
    const character = useCase.execute('Hero_a', 'Warrior', userId);
    expect(character.name).toBe('Hero_a');
    expect(character.job).toBe('Warrior');
    expect(typeof character.stats.attackModifier).toBe('number');
    expect(typeof character.stats.speedModifier).toBe('number');
  });

  it('should not allow duplicate character names for the same user', () => {
    useCase.execute('Hero_a', 'Warrior', userId);
    expect(() => useCase.execute('Hero_a', 'Mage', userId)).toThrow(AppError);
  });

  it('should throw error if required fields are missing', () => {
    expect(() => useCase.execute('', 'Warrior', userId)).toThrow(AppError);
    expect(() => useCase.execute('Hero_b', '', userId)).toThrow(AppError);
    expect(() => useCase.execute('Hero_b', 'Mage', '')).toThrow(AppError);
  });
}); 