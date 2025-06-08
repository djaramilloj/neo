import { BattleUseCase } from '../../../src/application/character/BattleUseCase';
import { InMemoryCharacterRepository } from '../../../src/infrastructure/persistence/InMemoryCharacterRepository';
import { Character } from '../../../src/domain/character/Character';
import { JOBS } from '../../../src/domain/character/Job';
import { AppError } from '../../../src/middleware/errorHandler';

describe('BattleUseCase', () => {
  let repo: InMemoryCharacterRepository;
  let useCase: BattleUseCase;
  const userId = 'user1';

  beforeEach(() => {
    repo = new InMemoryCharacterRepository();
    useCase = new BattleUseCase(repo);
  });

  function createCharacter(name: string, job: keyof typeof JOBS, health?: number) {
    const stats = { ...JOBS[job] };
    if (typeof health === 'number') stats.currentHealth = health;
    return new Character(userId, name, job, stats);
  }

  it('should run a battle and declare a winner and loser', () => {
    const charA = createCharacter('HeroA', 'Warrior');
    const charB = createCharacter('HeroB', 'Mage');
    repo.save(userId, charA);
    repo.save(userId, charB);
    const result = useCase.execute('HeroA', 'HeroB');
    expect(result.log.length).toBeGreaterThan(0);
    expect([result.winner, result.loser]).toContain('HeroA');
    expect([result.winner, result.loser]).toContain('HeroB');
    expect(result.winner).not.toBe(result.loser);
  });

  it('should not allow a character to battle themselves', () => {
    const charA = createCharacter('HeroA', 'Warrior');
    repo.save(userId, charA);
    expect(() => useCase.execute('HeroA', 'HeroA')).toThrow(AppError);
  });

  it('should not allow a dead character to battle', () => {
    const charA = createCharacter('HeroA', 'Warrior', 0);
    const charB = createCharacter('HeroB', 'Mage');
    repo.save(userId, charA);
    repo.save(userId, charB);
    expect(() => useCase.execute('HeroA', 'HeroB')).toThrow(AppError);
  });

  it('should throw if a character is not found', () => {
    const charA = createCharacter('HeroA', 'Warrior');
    repo.save(userId, charA);
    expect(() => useCase.execute('HeroA', 'Unknown')).toThrow(AppError);
    expect(() => useCase.execute('Unknown', 'HeroA')).toThrow(AppError);
  });
}); 