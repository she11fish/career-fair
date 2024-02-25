import React, { useState, useEffect } from "react";
import "./App.css"; // Ensure your CSS includes the correct animations
import UnityGame from "./components/UnityGame";
import "./fonts/Squirk.ttf";

import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [schooling, setSchooling] = useState("Select Schooling Age");
  const [animation, setAnimation] = useState("fade-in");

  const advanceStep = () => {
    if (step < 7) {
      // Ensure we don't advance beyond our final step before the buttons
      setAnimation("fade-out");
    }
  };

  useEffect(() => {
    let timeoutId;
    if (animation === "fade-out" && step < 7) {
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
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={{ color: "white" }}
              inputProps={{
                style: {
                  fontSize: 40,
                  color: "white",
                  fontFamily: "CustomFont",
                },
              }} // font size of input text
              autoFocus
            />
          </form>
        );
      case 5:
        setTimeout(advanceStep, 2000); // Ensure this does not cause an infinite loop
        return <div>Hello {name}, what schooling age are you?</div>;
      case 6:
        return (
          <FormControl
            sx={{
              minWidth: 600,
              fontSize: 40,
              fontFamily: "CustomFont",
              color: "white",
            }}
            autoFocus
          >
            <Select
              value={schooling}
              defaultValue="Select Schooling Age"
              sx={{
                minWidth: 600,
                fontSize: 40,
                fontFamily: "CustomFont",
                color: "white",
              }}
              onChange={(e) => {
                setSchooling(e.target.value);
                setTimeout(advanceStep, 1000);
              }}
              autoFocus
            >
              <MenuItem
                value={"middle school"}
                sx={{
                  fontSize: 40,
                  fontFamily: "CustomFont",
                }}
              >
                Middle School
              </MenuItem>
              <MenuItem
                value={"high school"}
                sx={{
                  fontSize: 40,
                  fontFamily: "CustomFont",
                }}
              >
                High School
              </MenuItem>
              <MenuItem
                value={"university"}
                sx={{
                  fontSize: 40,
                  fontFamily: "CustomFont",
                }}
              >
                University
              </MenuItem>
            </Select>
          </FormControl>
        );
      case 7:
        return (
          <div style={{ textAlign: "center" }}>
            Hello {name}, you are a {schooling} student.
            <br></br> Are you ready to explore your career?
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  marginRight: "50px",
                  marginTop: "50px",
                  fontSize: "30px",
                  fontFamily: "CustomFont",
                }}
                variant="contained"
                color="success"
                onClick={() => setStep(8)}
              >
                Continue
              </Button>
              <Button
                style={{
                  marginRight: "10px",
                  marginTop: "50px",
                  fontSize: "30px",
                  fontFamily: "CustomFont",
                }}
                variant="contained"
                color="error"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        );
      case 8:
        // Placeholder for your WebGL component
        return (
          <div className="fade-in">
            <img
              src="/assets/clouds.png"
              alt="clouds"
              className="clouds-left"
            />
            <img
              src="/assets/clouds.png"
              alt="clouds"
              className="clouds-right"
            />
            <div className="unity-game-heading">Career Fair Game V1</div>
            <div className="unity-game-container">
              <UnityGame />
            </div>
            <div className="unity-game-footer">
              NBSEHacks Submission By: <br></br>Wahid, Nathan, Arsalan, Lucas
            </div>
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
