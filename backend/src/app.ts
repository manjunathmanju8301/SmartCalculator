import express from 'express';
import userRoutes from './routes/user-routes';
import expressionRoutes from './routes/expression-routes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/expressions', expressionRoutes);

export default app;

