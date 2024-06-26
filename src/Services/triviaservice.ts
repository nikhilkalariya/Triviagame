import axios from 'axios';
import { TriviaApiResponse } from '../interfaces/TriviaQuestion';
const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=10';

export const fetchTriviaQuestion = async (): Promise<TriviaApiResponse> => {
  try {
    const response = await axios.get<TriviaApiResponse>(TRIVIA_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching trivia question');
  }
};














