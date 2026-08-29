import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ICalculationSlice {
    expression: string;
    result: number | null;
}

const initialState: ICalculationSlice = {
    expression: '',
    result: null
}

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        serExpression: (state, action: PayloadAction<string>) => {
            state.expression = action.payload;
        },
        setResult: (state, action: PayloadAction<number>) => {
            state.result = action.payload
        },
        clearCalculator: (state) => {
            state.result = null;
            state.expression = '';
        }
    }
});

export const {
    clearCalculator,
    serExpression,
    setResult
} = calculatorSlice.actions;

export default calculatorSlice.reducer;