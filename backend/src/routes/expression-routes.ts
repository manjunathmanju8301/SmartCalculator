import express from 'express';
import {addExpression, getUserExpressions} from '../controllers/expression-controller';

const expressionRouter = express.Router();

expressionRouter.post('/', addExpression);
expressionRouter.get('/', getUserExpressions);

export default expressionRouter;