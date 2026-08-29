import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    userName: string;
    userEmail: string | null;
    userId: number;
}

interface IUserSlice {
    currentUserId: number | null;
    users: IUser[]
}

const initialState: IUserSlice = {
    users: [],
    currentUserId: null
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setCurrentUserId: (state, action: PayloadAction<number>) => {
            state.currentUserId = action.payload;
        },
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
        }
    }
});

export const {
    setCurrentUserId,
    setUsers
} = userSlice.actions;

export default userSlice.reducer;