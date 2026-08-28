import {Request,Response} from 'express';
import * as userModel from '../models/user-model';

export const createUser = async(req:Request,res:Response)=>{
    try{
        const {name,email}=req.body;

        const user = await userModel.createUser(name,email);

        res.status(201).json(user);
    }catch(error){
        res.status(500).json({
            message:"failed to create user"
        });
    }
}