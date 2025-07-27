import { useState } from "react";
import "./App.css";
import ReactQueryExamples from "./newThings/ReactQueryExamples";
// import FilterWithoutTransition from "./newThings/FilterWithoutTransition";
// import FilterWithTransition from "./newThings/FilterWithTransition";
// import UseCallbackExamples from "./newThings/UseCallbackExamples";
// import UseMemoExample from "./newThings/UseMemoExample";
// import UseRefExamples from "./newThings/UseRefExamples";
// import UseRefExamples2 from "./newThings/UseRefExamples2";

function App() {
  const [showDemo, setShowDemo] = useState(true);
  return (
    <>
      {/* <UseRefExamples></UseRefExamples> */}
      {/* <UseRefExamples2></UseRefExamples2> */}
      {/* <UseMemoExample></UseMemoExample> */}
      {/* <UseCallbackExamples></UseCallbackExamples> */}
      {/* <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
        <FilterWithoutTransition />
        <FilterWithTransition />
      </div> */}
      <button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</button>
      {showDemo && <ReactQueryExamples></ReactQueryExamples>}
    </>
  );
}

export default App;
