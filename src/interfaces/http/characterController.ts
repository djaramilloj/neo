import { Request, Response } from 'express';
import { CreateCharacterUseCase } from '../../application/character/CreateCharacterUseCase';
import { InMemoryCharacterRepository } from '../../infrastructure/persistence/InMemoryCharacterRepository';
import { AppError } from '../../middleware/errorHandler';
import { GetCharacterListUseCase } from '../../application/character/GetCharacterListUseCase';
import { GetCharacterDetailsUseCase } from '../../application/character/GetCharacterDetailsUseCase';
import { BattleUseCase } from '../../application/character/BattleUseCase';

const repo = new InMemoryCharacterRepository();
const useCase = new CreateCharacterUseCase(repo);
const getListUseCase = new GetCharacterListUseCase(repo);
const getDetailsUseCase = new GetCharacterDetailsUseCase(repo);
const battleUseCase = new BattleUseCase(repo);

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

export const getCharacterListController = (req: Request, res: Response) => {
    try {
        const characters = getListUseCase.execute();
        res.status(200).json(characters);
    } catch (err: any) {
        if (err instanceof AppError) throw err;
        throw new AppError('Internal server error', 500);
    }
};

export const getCharacterDetailsController = (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const details = getDetailsUseCase.execute(name as string);
        res.status(200).json(details);
    } catch (err: any) {
        if (err instanceof AppError) throw err;
        throw new AppError('Internal server error', 500);
    }
};

export const battleController = (req: Request, res: Response) => {
    try {
        const { character_1, character_2 } = req.body;
        const result = battleUseCase.execute(character_1, character_2);
        res.status(200).json(result);
    } catch (err: any) {
        if (err instanceof AppError) throw err;
        throw new AppError('Internal server error', 500);
    }
}; 