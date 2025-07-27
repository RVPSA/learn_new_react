import { useRef, useState } from "react";

const UseRefExamples = () => {
  const [timer, setTimer] = useState(10);
  const ref = useRef(0);

  const startTimer = () => {
    ref.current = setInterval(() => {
      setTimer((pre) => pre + 1);
      console.log("Timer: ", timer);
    }, 1000);
  };

  const endTimer = () => {
    clearInterval(ref.current);
  };

  return (
    <>
      <p>Timer {timer}</p>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={endTimer}>End Timer</button>
    </>
  );
};

export default UseRefExamples;
