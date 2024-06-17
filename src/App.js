import { useEffect, useState, useRef } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Result from "./components/Result";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
  const [quizStatus, setQuizStatus] = useState("closed");
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handle = useFullScreenHandle();

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("answers"));
    const status = JSON.parse(localStorage.getItem("status"));
    if (status) {
      setQuizStatus(status);
    }
    if (answers) {
      if (answers.length > 0) {
        setQuizStatus("started");
        setSelectedAnswers(answers);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  function handleQuizStatus(status) {
    setQuizStatus(status);
    localStorage.setItem("status", JSON.stringify(status));
  }

  let mainContent;
  let headContent;
  if (quizStatus === "started") {
    headContent = <Timer />;
    mainContent = (
      <Quiz
        onTimeout={handleQuizStatus}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
      />
    );
  } else if (quizStatus === "closed") {
    headContent = "QUIZ APP";
    mainContent = (
      <button
        className=" shadow-sm shadow-black bg-amber-500 px-5 py-2 mt-10 font-bold text-lg hover:bg-amber-600"
        onClick={() => {
          handleQuizStatus("started");
          handle.enter();
        }}
      >
        START QUIZ
      </button>
    );
  } else {
    headContent = "QUIZ COMPLETED";
    mainContent = <Result selectedAnswers={selectedAnswers} />;
  }

  return (
    <FullScreen handle={handle}>
      <div
        id="full-mode"
        className="h-screen bg-slate-200 p-10 overflow-scroll hide-scrollbar"
      >
        <div className="text-center text-5xl font-bold">
          <h1>{headContent}</h1>
        </div>
        <div className="flex justify-center mb-10">
          {quizStatus === "finished" ? (
            <button
              className="shadow-sm shadow-black bg-amber-500 px-5 py-2 mt-10 font-bold text-lg hover:bg-amber-600"
              onClick={() => {
                setQuizStatus("closed");
                setSelectedAnswers([]);
                localStorage.clear();
              }}
            >
              RESTART
            </button>
          ) : null}
        </div>
        <div className="flex justify-center">
          <div className="w-2/4 flex justify-center items-center">
            {mainContent}
          </div>
        </div>
      </div>
    </FullScreen>
  );
}

export default App;
