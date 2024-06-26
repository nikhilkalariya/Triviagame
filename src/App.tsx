import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ResultsPage from "./Components/ResultsPage"; 
import TriviaQuestion from "./Components/TriviaQuestion";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <>
            <BrowserRouter>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<TriviaQuestion />} />
                        <Route path="/results" element={<ResultsPage />} />
                    </Routes>
                </Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
