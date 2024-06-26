
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const { totalQuestions, correctCount, incorrectCount } = location.state || {};

    return (
        <div className="results">
            <h1>Quiz Results</h1>
            <p>Total Questions Served: {totalQuestions}</p>
            <p>Total Correct Questions: {correctCount}</p>
            <p>Total Incorrect Questions: {incorrectCount}</p>
        </div>
    );
};

export default ResultsPage;
