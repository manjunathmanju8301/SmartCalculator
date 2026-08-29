export interface IExpression{
    user_id:number;
    exp_id:number;
    expression:string;
    result:number;
    created_at:Date;
}

export interface IUser {
    user_id: number;
    name: string;
    email: string;
    created_at: Date;
}