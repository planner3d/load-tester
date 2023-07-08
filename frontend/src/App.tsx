import Header from "./Header.tsx";
import React, {useState} from "react";
import Display from "./Display.tsx";

function App() {

   const [testResult, setTestResult] = useState("");

  return (
    <div className="load-tester">
        <div className="container">
            <Header
                setTestResult={setTestResult}
            />
            <Display
                testResult={testResult}/>
        </div>
    </div>
  )
}
export default App
