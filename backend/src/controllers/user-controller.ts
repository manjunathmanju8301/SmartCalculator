import { Request, Response } from 'express';
import * as userModel from '../models/user-model';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = await userModel.createUser(name, email);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: "failed to create user"
        });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.getUsers();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({
            message: "failed to get all users"
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userModel.deleteUser(Number(id));
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: "failed to delete user"
        });
    }
}
