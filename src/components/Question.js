import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerID = setTimeout(()=> {
      setTimeRemaining(timeRemaining -1)
      if (timeRemaining === 1){ // set this =to 1 rather than 0 because it still takes 1 second to trigger.  Apparently...
        onAnswered(false);
        setTimeRemaining(10)
      }
    }, 1000);

    return function cleanup() {
      clearInterval(timerID);
    }
  }, [timeRemaining])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
