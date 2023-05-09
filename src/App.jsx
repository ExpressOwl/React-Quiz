import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(undefined);

  // Math.random() returns a random number between 0-16777215
  // Math.floor() rounds it down to an integer
  // toString(16) converts the number to hexadecimal
  // Add a # before the color and you get a random color everytime.
  const getRandomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + color;
  };

  function generateColor() {
    // Generate random color and set it with setColor
    const correctColor = getRandomColor();
    setColor(correctColor);

    // Generate the correctColor along with some random colours
    const randomColors = [correctColor, getRandomColor(), getRandomColor()];

    // Shuffle the answers so that the correct color isn't always first
    const shuffleColors = randomColors.sort(() => Math.random() - 0.5);

    setAnswers(shuffleColors);
  }

  useEffect(() => {
    generateColor();
  }, []);

  function handleAnswer(answer) {
    if (answer === color) {
      setResult(true);
      // If correct, next question
      generateColor();
    } else {
      setResult(false);
    }
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center bg-background bg-cover bg-no-repeat bg-blend-multiply bg-gray-400">
        <div className="bg-[#111827] p-8 rounded-md shadow-md">
          <div
            className="w-72 h-72 m-auto mb-8 rounded-sm"
            style={{ background: color }}
          ></div>
          {answers.map((answer) => (
            <button
              onClick={() => handleAnswer(answer)}
              key={answer}
              className="text-yellow-400 uppercase hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900 justify-evenly"
            >
              {answer}
            </button>
          ))}
          {result === false && (
            <div className="text-red-500 text-center">Not quite, the answer was {color}</div>
          )}
          {result === true && (
            <div className="text-blue-400 text-center">Color Wizard!</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
