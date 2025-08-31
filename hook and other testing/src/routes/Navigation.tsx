import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
//  import UseCallbackExamples from "../newThings/UseCallbackExamples";
//  import FilterWithTransition from "../newThings/FilterWithTransition";


const UseCallbackComponent = React.lazy(
  () => import("../newThings/UseCallbackExamples")
);
const TransitionComponent = React.lazy(
  () => import("../newThings/FilterWithTransition")
);


// Preload the component
// const preloadComponent = ()=>{
//     import("../newThings/UseCallbackExamples")
// }
const Navigation = () => {

//     useEffect(() => {
//     preloadComponent(); // Preload the component on app load
//   }, [])
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<UseCallbackComponent></UseCallbackComponent>}
          ></Route>
          <Route path="/Transition" element={<TransitionComponent></TransitionComponent>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Navigation;
