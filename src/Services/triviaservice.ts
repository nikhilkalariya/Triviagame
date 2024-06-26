import axios from 'axios';
import { TriviaApiResponse } from '../interfaces/TriviaQuestion';
const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=10';

export const fetchTriviaQuestion = async (retries: number = 5, delay: number = 1000): Promise<TriviaApiResponse> => {
  try {
    const response = await axios.get<TriviaApiResponse>(TRIVIA_API_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429 && retries > 0) {
      console.warn(`429 error encountered. Retrying in ${delay}ms...`);
      const randomDelay = delay + Math.floor(Math.random() * 1000); // Adding randomness
      await new Promise(res => setTimeout(res, randomDelay));
      return fetchTriviaQuestion(retries - 1, delay * 2); // Exponential backoff
    }
    console.error('Error fetching trivia question:', error);
    throw new Error('Error fetching trivia question');
  }
};














