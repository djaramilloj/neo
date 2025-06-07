import express from 'express';
import request from 'supertest';
import { InMemoryCharacterRepository } from '../../../src/infrastructure/persistence/InMemoryCharacterRepository';
import { CreateCharacterUseCase } from '../../../src/application/character/CreateCharacterUseCase';

const app = express();
app.use(express.json());

// Mock repository and use case
const repo = new InMemoryCharacterRepository();
const useCase = new CreateCharacterUseCase(repo);

// Patch controller to use the mock repo and use case
app.post('/characters', (req, res) => {
  try {
    const { name, job, userId } = req.body;
    const character = useCase.execute(name, job, userId);
    res.status(201).json(character);
  } catch (err: any) {
    res.status(err.statusCode || 400).json({ error: err.message });
  }
});

describe('characterController', () => {
  it('should create a character successfully', async () => {
    const res = await request(app)
      .post('/characters')
      .send({ name: 'Hero_a', job: 'Warrior', userId: 'user1' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Hero_a');
    expect(res.body.job).toBe('Warrior');
  });

  it('should not allow duplicate character names for the same user', async () => {
    await request(app).post('/characters').send({ name: 'Hero_a', job: 'Warrior', userId: 'user1' });
    const res = await request(app).post('/characters').send({ name: 'Hero_a', job: 'Mage', userId: 'user1' });
    expect(res.status).toBe(409);
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/characters').send({ name: '', job: 'Warrior', userId: 'user1' });
    expect(res.status).toBe(400);
  });
}); 