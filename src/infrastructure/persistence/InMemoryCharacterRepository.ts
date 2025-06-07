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

    findAll(userId: string): Character[] {
        return this.characters[userId] || [];
    }

    getCharacterByName(userId: string, name: string): Character | undefined {
        return this.characters[userId]?.find(character => character.name === name);
    }
}