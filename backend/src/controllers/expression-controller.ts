import { Request, Response } from "express";
import * as expressionModel from '../models/expression-model';

export const addExpression = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const { expression, result } = req.body;
        const newExpression = await expressionModel.createExpression(userId, expression, result);
        res.status(201).json({
            message: 'Expression created successfully',
            data: newExpression
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server error'
        });
    }
};

export const getUserExpressions = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const expressions = await expressionModel.getExpressionsByUserId(userId);

        res.status(200).json({
            data: expressions
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server error'
        })
    }
}