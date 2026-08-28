import db from '../config/db';
import { IExpression } from './types';

export const createExpression = async (
    userId: number,
    expression: string,
    result: number
): Promise<IExpression> => {
    const query = `
INSERT INTO expressions (user_id, expression, result)
VALUES ($1, $2, $3)
RETURNING id, user_id, expression, result, created_at
`;

    const values = [userId, expression, result];
    const { rows } = await db.query<IExpression>(query, values);

    return rows[0];
};

export const getExpressionsByUserId = async (
    userId: number
): Promise<IExpression[]> => {
    const query = `
SELECT id, use_id, expression, result, created_at
FROM expression
WHERE user_id = $1
ORDER BY created_at DEC
`;

    const { rows } = await db.query<IExpression>(query, [userId]);

    return rows;
};
