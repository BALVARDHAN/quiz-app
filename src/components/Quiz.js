import { useState, useEffect } from "react";
import QUESTIONS from "../questions.json";

export default function Quiz({
  onTimeout,
  selectedAnswers,
  setSelectedAnswers,
}) {
  const [remainingTime, setRemainingTime] = useState(60000);

  useEffect(() => {
    const time = JSON.parse(localStorage.getItem("time"));
    if (time) {
      setRemainingTime(time);
    }
  }, []);

  useEffect(() => {
    console.log(remainingTime);
    localStorage.setItem("time", JSON.stringify(remainingTime));
  }, [remainingTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(remainingTime);
    const timeOut = setTimeout(() => {
      onTimeout("finished");
    }, remainingTime);
    return () => clearTimeout(timeOut);
  }, [remainingTime]);

  const questionIndex = selectedAnswers.length;
  if (selectedAnswers.length === QUESTIONS.length) {
    onTimeout("finished");
    return <div></div>;
  }
  const shuffledAnswers = [...QUESTIONS[questionIndex].answers];

  function handleSelectAnswer(answer) {
    setSelectedAnswers((prev) => {
      return [...prev, answer];
    });
  }

  return (
    <div className="w-full bg-slate-700 p-10 rounded-xl shadow-lg shadow-black">
      <h1 className="text-stone-100 text-center text-2xl mb-10">
        {`${questionIndex + 1}. ${QUESTIONS[questionIndex].text}`}
      </h1>
      <ul className="flex flex-col justify-center items-center px-10">
        {shuffledAnswers.map((answer) => (
          <li key={answer} className="w-full my-2">
            <button
              className="bg-slate-300 px-4 py-3 rounded-full w-full font-semibold hover:bg-slate-400"
              onClick={() => {
                handleSelectAnswer(answer);
              }}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
