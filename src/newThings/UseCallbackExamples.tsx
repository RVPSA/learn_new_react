import React, { useCallback, useState } from "react";

function UseCallbackExamples() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);

  const handleClick2 = () => {
    setCount1(count1 + 1);
  };

  // Use updater function form to avoid 'count' in dependencies
  // This ensures 'handleClick' itself is memoized and doesn't change
  // even if 'count' changes, because it's using the *latest* state.
  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1); // <--- Corrected
    console.log("render");
  }, []); // <--- Dependency array can remain empty!

  return (
    <>
      {/* <MemoizedButton onClick={handleClick}></MemoizedButton>  */}
      {/* <--- Use MemoizedButton */}
      <Button onClick={handleClick}></Button>
      <Button2 onClick={handleClick2}></Button2>
      <p>Count: {count}</p>
      <p>Count1: {count1}</p>
    </>
  );
}

export default UseCallbackExamples;

// --- Button Component ---
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // You can add other props here, e.g., children: React.ReactNode;
}

function Button({ onClick }: ButtonProps) {
  console.log("abc"); // This will now only print when its props or internal state actually change
  return <button onClick={onClick}>With callback</button>;
}
function Button2({ onClick }: ButtonProps) {
  console.log("abc"); // This will now only print when its props or internal state actually change
  return <button onClick={onClick}>Without callback</button>;
}

// Memoize the Button component to prevent unnecessary re-renders
//const MemoizedButton = React.memo(Button); // <--- Added React.memo
