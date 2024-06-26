// store/triviaSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { TriviaQuestion } from '../interfaces/TriviaQuestion';

interface TriviaState {
    questions: TriviaQuestion[];
    currentQuestionIndex: number;
    correctCount: number;
    incorrectCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: TriviaState = {
    questions: [],
    currentQuestionIndex: 0,
    correctCount: 0,
    incorrectCount: 0,
    loading: true,
    error: null,
};



const triviaSlice = createSlice({
    name: 'trivia',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
            state.loading = false;
            state.error = null;
        },
        answerQuestion: (state, action) => {
            const { isCorrect } = action.payload;
            if (isCorrect) {
                state.correctCount += 1;
            } else {
                state.incorrectCount += 1;
            }
        },
        nextQuestion: (state) => {
            state.currentQuestionIndex += 1;
        },
    },
});

export const { answerQuestion, nextQuestion,setQuestions } = triviaSlice.actions;
export default triviaSlice.reducer;
