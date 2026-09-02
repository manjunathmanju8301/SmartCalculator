import express from "express";
import { createUser, deleteUser, getUsers } from "../controllers/user-controller";

const router = express.Router();

router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);

export default router;
