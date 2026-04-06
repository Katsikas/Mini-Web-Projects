import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function handleStartQuiz() {
    setIsQuizStarted((prev) => !prev);
  }

  return (
    <>
      <Header />
      <main>
        {!isQuizStarted && (
          <div className="start-quiz">
            <button onClick={handleStartQuiz}>START QUIZ</button>
          </div>
        )}
        {isQuizStarted && <Quiz />}
      </main>
    </>
  );
}

export default App;
