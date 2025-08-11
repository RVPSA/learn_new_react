// import React, { useMemo, useState } from "react";

// const UseMemoExample = () => {
//   const numbers = [10, 20, 30, 40];
//   const [sum, setSum] = useState(0);
//   var num = 1;
//   const calSum = () => {
//     useMemo(() => {
//       setSum(numbers.reduce((pre, n) => (pre = pre + n), 0));
//     }, [numbers]);

//     // setSum(numbers.reduce((pre, n) => pre + n, 0));
//     // debugger;
//     //console.log("Count ", (num = num + 1));
//   };

//   return (
//     <>
//       <p>Sum : {sum}</p>
//       <button onClick={calSum}>Sum</button>
//     </>
//   );
// };

// export default UseMemoExample;

import React, { useState, useMemo } from "react";

// --- Heavy Computational Function (Simulated) ---
// This function simulates a long-running calculation.
// In a real app, this would be your actual complex logic.
const calculateComplexAggregate = (dataItems: any, multiplier: any) => {
  console.log("Performing heavy calculation..."); // To see when it actually runs
  // Simulate a delay for the heavy computation
  let sum = 0;
  for (let i = 0; i < dataItems.length; i++) {
    sum += dataItems[i] * multiplier;
    // Add an artificial delay for demonstration of "heaviness"
    for (let j = 0; j < 10000; j++) {
      /* busy-wait */
    }
  }
  return sum;
};
// ------------------------------------------------

const UseMemoExample = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentMultiplier, setCurrentMultiplier] = useState(2);
  const [otherState, setOtherState] = useState(0); // Some other state that causes re-renders

  // Use useMemo to memoize the result of the heavy computation
  // The 'calculateComplexAggregate' function will ONLY run when:
  // 1. 'data' array changes (its reference)
  // 2. 'currentMultiplier' changes
  const aggregatedResult = useMemo(() => {
    return calculateComplexAggregate(data, currentMultiplier);
  }, [data, currentMultiplier]); // Dependency array
  //const aggregatedResult = calculateComplexAggregate(data, currentMultiplier);
  const addDataItem = () => {
    setData((prevData) => [...prevData, Math.floor(Math.random() * 20) + 1]);
  };

  const changeMultiplier = () => {
    setCurrentMultiplier((prev) => (prev % 5) + 1); // Cycle through 1-5
  };

  const incrementOtherState = () => {
    setOtherState((prev) => prev + 1);
  };

  console.log("Component re-rendered"); // To see all component re-renders

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h1>Heavy Computation with useMemo</h1>
      <p>Data: [{data.join(", ")}]</p>
      <p>Multiplier: {currentMultiplier}</p>
      <p>Other State: {otherState}</p>

      {/* Display the memoized result directly */}
      <h2>Aggregated Result: {aggregatedResult}</h2>

      <button onClick={addDataItem}>Add Random Data Item</button>
      <button onClick={changeMultiplier}>Change Multiplier</button>
      <button onClick={incrementOtherState}>
        Increment Other State (Doesn't re-calculate aggregate)
      </button>
    </div>
  );
};

export default UseMemoExample;

// Usage in App.js or similar:
// <DataAggregator />
