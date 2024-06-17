import React, { useState } from "react";
import QUESTIONS from "../questions.json";

export default function Result({ selectedAnswers }) {
  const [showAnswers, setShowAnswers] = useState("correct");

  let correct = [];
  let marks = 0;
  for (let i = 0; i < selectedAnswers.length; i++) {
    if (selectedAnswers[i] === QUESTIONS[i].answers[0]) {
      marks++;
      correct.push(i);
    }
  }
  function handleButtonClick(type) {
    setShowAnswers(type);
  }

  let ansContent;
  if (showAnswers === "correct") {
    ansContent = (
      <ul>
        {correct.map((index) => (
          <li key={index} className="my-4">
            <div className="text-slate-200">{`Q. ${QUESTIONS[index].text}`}</div>
            <div className="text-slate-400">{`Ans. ${QUESTIONS[index].answers[0]}`}</div>
          </li>
        ))}
      </ul>
    );
  } else {
    ansContent = (
      <ul>
        {QUESTIONS.map((question, index) => {
          if (!correct.includes(index)) {
            return (
              <li key={index} className="my-4">
                <div className="text-slate-200">{`Q. ${question.text}`}</div>
                <div className="text-slate-400">{`A. ${question.answers[0]}`}</div>
              </li>
            );
          }
        })}
      </ul>
    );
  }

  return (
    <div className="w-full bg-slate-700 p-10 rounded-xl shadow-lg shadow-black">
      <h1 className="text-slate-400 text-xl font-semibold mb-5">
        Marks Obtained :
      </h1>
      <h1 className="text-slate-100 text-6xl font-semibold mb-5">{`${marks}/10`}</h1>
      <div className="border border-slate-500 mb-5"></div>
      <div className="flex gap-2">
        <button
          className={`text-xl font-semibold py-2 w-32 ${
            showAnswers === "correct" ? "bg-slate-300" : "bg-slate-600"
          }`}
          onClick={() => {
            handleButtonClick("correct");
          }}
        >
          Correct
        </button>
        <button
          className={`text-xl font-semibold py-2 w-32 ${
            showAnswers === "incorrect" ? "bg-slate-300" : "bg-slate-600"
          }`}
          onClick={() => {
            handleButtonClick("incorrect");
          }}
        >
          Incorrect
        </button>
      </div>
      <div>{ansContent}</div>
    </div>
  );
}
