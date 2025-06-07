import { Request, Response } from 'express';
import { CreateCharacterUseCase } from '../../application/character/CreateCharacterUseCase';
import { InMemoryCharacterRepository } from '../../infrastructure/persistence/InMemoryCharacterRepository';
import { AppError } from '../../middleware/errorHandler';


const repo = new InMemoryCharacterRepository();
const useCase = new CreateCharacterUseCase(repo);

export const createCharacterController = (req: Request, res: Response) => {
    try {
        const { name, job, user_id } = req.body;
        /**
         * Use case can also store the character in the repository as long as
         * the repository class is injected in the use case class.
        */
        const character = useCase.execute(name, job, user_id);
        res.status(201).json(character);
    } catch (err: any) {
        if (err instanceof AppError) throw err;
        throw new AppError('Internal server error', 500);
    }
}; 