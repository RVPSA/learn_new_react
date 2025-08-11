import { useRef } from "react";

const UseRefExamples2 = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (ref.current) ref.current.focus();
  };

  return (
    <>
      <input ref={ref} type="text" />
      <button onClick={handleFocus}>Focus</button>
    </>
  );
};

export default UseRefExamples2;
