import express from 'express';
import {addExpression, getUserExpressions} from '../controllers/expression-controller';

const expressionRouter = express.Router();



expressionRouter.post('/:userId/expressions', addExpression);
expressionRouter.get('/:userId/expressions', getUserExpressions);

export default expressionRouter;