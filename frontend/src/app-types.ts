export interface IUser {
    user_id: number;
    name: string;
    email: string;
    created_at: string;
}

export interface IExpression {
    exp_id: number;
    user_id: number;
    expression: string;
    result: number;
    created_at: string;
}
