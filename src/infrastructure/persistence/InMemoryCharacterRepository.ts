import { Character } from '../../domain/character/Character';

export class InMemoryCharacterRepository {
    private characters: Record<string, Character[]> = {};

    save(userId: string, character: Character): void {
        if (!this.characters[userId]) {
            this.characters[userId] = [character];
            return;
        }
        this.characters[userId].push(character);
    }

    update(userId: string, updatedCharacter: Character): void {
        if (!this.characters[userId]) return;
        const idx = this.characters[userId].findIndex(c => c.name === updatedCharacter.name);
        if (idx !== -1) {
            this.characters[userId][idx] = updatedCharacter;
        }
    }

    findAll(userId?: string): Character[] {
        if (userId) {
            return this.characters[userId] || [];
        }
        return Object.values(this.characters).flat();
    }

    getCharacterByName(name: string, userId?: string): Character | undefined {
        if (userId) {
            return this.characters[userId]?.find(character => character.name === name);
        }
        return Object.values(this.characters).flat().find(character => character.name === name);
    }
}