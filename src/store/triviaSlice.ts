// store/triviaSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTriviaQuestion } from '../Services/triviaservice';
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
    loading: false,
    error: null,
};

export const loadQuestions = createAsyncThunk('trivia/loadQuestions', async () => {
    const response = await fetchTriviaQuestion();
    return response.results;
});

const triviaSlice = createSlice({
    name: 'trivia',
    initialState,
    reducers: {
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
    extraReducers: (builder) => {
        builder
            .addCase(loadQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.loading = false;
            })
            .addCase(loadQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load questions';
            });
    },
});

export const { answerQuestion, nextQuestion } = triviaSlice.actions;
export default triviaSlice.reducer;
