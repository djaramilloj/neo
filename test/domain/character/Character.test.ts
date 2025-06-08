import { Character } from '../../../src/domain/character/Character';
import { JOBS } from '../../../src/domain/character/Job';

describe('Character', () => {
    it('should construct a character with correct stats', () => {
        const char = new Character(
            'user1',
            'Hero_1',
            'Warrior',
            { ...JOBS['Warrior'], attackModifier: () => 0, speedModifier: () => 0 }
        );
        expect(char.name).toBe('Hero_1');
        expect(char.job).toBe('Warrior');
        expect(char.stats.currentHealth).toBe(20);
    });

    it('should level up and update stats', () => {
        const char = new Character(
            'user1',
            'Hero_2',
            'Mage',
            { ...JOBS['Mage'], attackModifier: () => 0, speedModifier: () => 0 }
        );
        char.levelUp({ currentHealth: 20 });
        expect(char.stats.currentHealth).toBe(20);
    });

    it('should change job and update stats', () => {
        const char = new Character(
            'user1',
            'Hero_3',
            'Thief',
            { ...JOBS['Thief'], attackModifier: () => 0, speedModifier: () => 0 }
        );
        char.changeJob('Warrior');
        expect(char.job).toBe('Warrior');
        expect(char.stats.currentHealth).toBe(20);
    });
}); 