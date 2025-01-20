import React, { useState, useEffect } from "react";
import "./EightBall.css";
import defaultAnswers from "./answers.json";
import { choice } from "./random";
import ShakeButton from './ShakeButton'; // Import the ShakeButton component

/** EightBall: shows random answer and, on click, changes answer,
 *
 * Props:
 * - answers: array of {msg, color} objects
 *
 * State:
 * - answer: {msg, color} of current answer
 * - question: user-entered question (string)
 * - colorCounts: object to store counts of each color
 * - history: array of {question, answer} objects to store history
 * - errorMessage: optional state to display error messages
 */

function EightBall({ answers = defaultAnswers }) {
  const [answer, setAnswer] = useState({
    msg: "Think of a Question.",
    color: "black",
  });
  const [question, setQuestion] = useState("");
  const [colorCounts, setColorCounts] = useState({
    green: 0,
    goldenrod: 0,
    red: 0,
  });
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (answer.color !== "black") { // Only update count for non-initial state
      setColorCounts((prevCounts) => ({
        ...prevCounts,
        [answer.color]: prevCounts[answer.color] + 1,
      }));
    }
  }, [answer.color]); // Only react to changes in answer.color

  function handleClick(evt) {
    if (question.trim() === '') {
      setAnswer({ msg: "Please enter a question.", color: "black" });
      setErrorMessage("Please enter a question.");
    } else {
      const newAnswer = choice(answers); 
      setAnswer(newAnswer); 
      setHistory([...history, { question, answer: newAnswer }]); 
      setErrorMessage(''); // Clear error message
    }
  }

  function handleReset(evt) {
    setAnswer({ msg: "Think of a Question.", color: "black" });
    setQuestion("");
    setColorCounts({ green: 0, goldenrod: 0, red: 0 });
    setHistory([]);
    setErrorMessage(''); // Clear error message
  }

  function handleChange(event) {
    setQuestion(event.target.value);
  }

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {answer.msg === "Think of a Question." && question.trim() === '' ? null : (
        <div
          className="EightBall"
          onClick={handleClick}
          style={{ backgroundColor: answer.color }}
        >
          <h2>{answer.msg}</h2>
        </div>
      )}
      <div className="button-container">
        <ShakeButton onClick={handleClick} />
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <div className="input-container">
          <input
            className="input-field"
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <p>
          <h3>Green:</h3> {colorCounts.green}
        </p>
        <br />
        <p>
          <h3>Goldenrod:</h3> {colorCounts.goldenrod}
        </p>
        <br />
        <p>
          <h3>Red:</h3> {colorCounts.red}
        </p>
        <br />
      </div>
      {history.length > 0 && ( // Conditionally render history if not empty
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>Question:</strong> {item.question}<br />
              <strong>Answer:</strong> {item.answer.msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EightBall;