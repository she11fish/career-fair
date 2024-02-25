import React, { useState, useEffect } from "react";
import "./App.css"; // Ensure your CSS includes the correct animations
import UnityGame from "./components/UnityGame";

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [schooling, setSchooling] = useState("");
  const [animation, setAnimation] = useState("fade-in");

  const advanceStep = () => {
    if (step < 6) {
      // Ensure we don't advance beyond our final step before the buttons
      setAnimation("fade-out");
    }
  };

  useEffect(() => {
    let timeoutId;
    if (animation === "fade-out" && step < 6) {
      // Check if we're not on the final step
      timeoutId = setTimeout(() => {
        setStep((currentStep) => currentStep + 1);
        setAnimation("fade-in");
      }, 2000); // This duration should match your fade-out animation duration
    }
    return () => clearTimeout(timeoutId);
  }, [animation, step]);

  const handleReset = () => {
    setStep(1);
    setName("");
    setSchooling("");
    setAnimation("fade-in");
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        setTimeout(advanceStep, 2000); // Ensure this does not cause an infinite loop
        return <div>Hello</div>;
      case 2:
        setTimeout(advanceStep, 2000);
        return <div>Welcome to Career Fair</div>;
      case 3:
        setTimeout(advanceStep, 2000);
        return <div>Before we begin...</div>;
      case 4:
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              advanceStep();
            }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What is your name?"
              autoFocus
            />
          </form>
        );
      case 5:
        return (
          <select
            value={schooling}
            onChange={(e) => {
              setSchooling(e.target.value);
              setTimeout(advanceStep, 1000);
            }}
            autoFocus
          >
            <option value="middle school">Middle School</option>
            <option value="high school">High School</option>
            <option value="university">University</option>
          </select>
        );
      case 6:
        return (
          <div>
            Hello {name}, you are a {schooling} student. Are you ready to
            explore your career?
            <div>
              <button onClick={() => setStep(7)}>Yes</button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
        );
      case 7:
        // Placeholder for your WebGL component
        return (
          <div>
            <div style={{ width: "100%" }}>
              <UnityGame />
            </div>

            <button onClick={handleReset}>Start Over</button>
          </div>
        );
      default:
        // It's a good practice to handle unexpected cases, even if you don't expect them to occur
        return <div>Unexpected step. Please refresh to start over.</div>;
    }
  };

  return (
    <div>
      <div className="page">
        <div className={`content ${animation}`}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
