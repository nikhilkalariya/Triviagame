// src/components/TriviaQuestion.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, answerQuestion, nextQuestion } from "../store/triviaSlice";
import { RootState } from "../store";
import { fetchTriviaQuestion } from "../Services/triviaservice";

const TriviaQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        questions,
        currentQuestionIndex,
        correctCount,
        incorrectCount,
        loading,
        error,
    } = useSelector((state: RootState) => state.trivia);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetchTriviaQuestion();
                dispatch(setQuestions(response.results));
            } catch (error) {
                console.error('Failed to fetch trivia questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(event.target.value);
    };

    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correct_answer;
        if (isCorrect) {
            setResult("Correct");
        } else {
            setResult(`Incorrect. The correct answer is ${currentQuestion.correct_answer}`);
        }
        dispatch(answerQuestion({ isCorrect }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < 9) {
            setSelectedAnswer("");
            setResult(null);
            dispatch(nextQuestion());
        } else {
            navigate('/results', {
                state: {
                    totalQuestions: questions.length,
                    correctCount: correctCount,
                    incorrectCount: incorrectCount,
                }
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (questions.length === 0) {
        return <div>No questions available</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const options = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
    ]

    return (
        <div>
            <h1 className="text-center text-cyan-700 text-2xl font-bold"> Trivia Game</h1>
            <div className="bg-cyan-700 m-5 p-5 rounded-lg">
                <h2 className="flex gap-2 text-white font-bold">
                    <span className="font-normal">{currentQuestion.category}</span>
                </h2>
                <p className="text-white my-2 text-xl font-medium">{currentQuestion.question}</p>
                <form>
                    {options?.map((option, index) => (
                        <div key={index}>
                            <label className="flex gap-2">
                                <input
                                    className="text-white"
                                    type="radio"
                                    name="trivia"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={handleAnswerChange}
                                />
                                <span className="text-white">{option}</span>
                            </label>
                        </div>
                    ))}
                </form>
            </div>
            <div className="flex items-center justify-between">
                <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleSubmit}>
                    Submit
                </button>
                {result && (
                    <div className="">
                        <p className="text-cyan-700 text-center">{result}</p>
                        {currentQuestionIndex < questions.length && (
                            <button className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleNext}>
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TriviaQuestion;

