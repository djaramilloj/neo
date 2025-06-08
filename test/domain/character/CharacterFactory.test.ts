import { CharacterFactory } from '../../../src/domain/character/CharacterFactory';
import { JobName } from '../../../src/domain/character/Job';
import { AppError } from '../../../src/middleware/errorHandler';

describe('CharacterFactory', () => {
    it('should create a valid character', () => {
        const char = CharacterFactory.create('Hero_a', 'Warrior', 'user1');
        expect(char.name).toBe('Hero_a');
        expect(char.job).toBe('Warrior');
    });

    it('should throw error for invalid name', () => {
        expect(() => CharacterFactory.create('a', 'Mage', 'user1')).toThrow(AppError);
        expect(() => CharacterFactory.create('this_name_is_way_too_long', 'Mage', 'user1')).toThrow(AppError);
        expect(() => CharacterFactory.create('bad name!', 'Mage', 'user1')).toThrow(AppError);
    });

    it('should throw error for invalid job', () => {
        expect(() => CharacterFactory.create('Hero_2', 'InvalidJob' as JobName, 'user1')).toThrow(AppError);
    });
}); 