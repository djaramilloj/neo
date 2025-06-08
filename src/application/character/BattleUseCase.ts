import { InMemoryCharacterRepository } from '../../infrastructure/persistence/InMemoryCharacterRepository';
import { AppError } from '../../middleware/errorHandler';
import { Character } from '@/domain/character/Character';

export class BattleUseCase {
  constructor(private readonly characterRepository: InMemoryCharacterRepository) {}

  execute(character_1: string, character_2: string): { log: string[]; winner: string; loser: string } {
    if (!character_1 || !character_2) {
        throw new AppError('Both characters are required', 400);
    }

    if (character_1 === character_2) {
      throw new AppError('Characters cannot battle themselves', 400);
    }

    const charA = this.characterRepository.getCharacterByName(character_1);
    const charB = this.characterRepository.getCharacterByName(character_2);
    if (!charA || !charB) {
      throw new AppError('One or both characters not found', 404);
    }

    if (charA.stats.currentHealth <= 0 || charB.stats.currentHealth <= 0) {
      throw new AppError('One or both characters are already dead', 400);
    }

    const log: string[] = [];
    log.push(`Battle between ${charA.name} (${charA.job}) - ${charA.stats.currentHealth} HP and ${charB.name} (${charB.job}) - ${charB.stats.currentHealth} HP begins!`);
    let attacker = charA; // Start with charA as attacker
    let defender = charB; // Start with charB as defender

    while (charA.stats.currentHealth > 0 && charB.stats.currentHealth > 0) {
      // Calculate actual speed for this round
      let attackerSpeed = attacker.stats.speedModifier(attacker.stats);
      let defenderSpeed = defender.stats.speedModifier(defender.stats);
      let speedA = Math.floor(Math.random() * attackerSpeed);
      let speedB = Math.floor(Math.random() * defenderSpeed);
      if (speedA === speedB) continue; // Draw, skip round and dont log
      if (speedB > speedA) {
        // Swap attacker and defender if speedB is greater than speedA
        [attacker, defender] = [defender, attacker];
        [speedA, speedB] = [speedB, speedA];
      }
      log.push(`${attacker.name} (speed: ${speedA}) was faster than ${defender.name} (speed: ${speedB}) and will begin this round.`);
      
      // Attacker attacks defender
      const attackValue = Math.floor(Math.random() * attacker.stats.attackModifier(attacker.stats));
      defender.stats.currentHealth = Math.max(0, defender.stats.currentHealth - attackValue); // Dont let health go below 0
      log.push(`${attacker.name} attacks ${defender.name} for ${attackValue}, ${defender.name} has ${defender.stats.currentHealth} HP remaining.`);
      if (defender.stats.currentHealth <= 0) break; // If defender is dead, break the loop
      
      // Defender attacks back
      const counterAttackValue = Math.floor(Math.random() * defender.stats.attackModifier(defender.stats));
      attacker.stats.currentHealth = Math.max(0, attacker.stats.currentHealth - counterAttackValue);
      log.push(`${defender.name} attacks ${attacker.name} for ${counterAttackValue}, ${attacker.name} has ${attacker.stats.currentHealth} HP remaining.`);
    }

    const winner = charA.stats.currentHealth > 0 ? charA.name : charB.name;
    const loser = charA.stats.currentHealth <= 0 ? charA.name : charB.name;
    const winnersRemainingHealth = charA.stats.currentHealth > 0 ? charA.stats.currentHealth : charB.stats.currentHealth;
    log.push(`${winner} wins the battle! ${winner} still has ${winnersRemainingHealth} HP remaining!`);

    // Store the updated state of both characters
    this.characterRepository.update(charA.userId, charA);
    this.characterRepository.update(charB.userId, charB);

    return { log, winner, loser };
  }
} 