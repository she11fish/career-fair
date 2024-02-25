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
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [schooling, setSchooling] = useState("");
  const [animation, setAnimation] = useState("fade-in");
  let audio = new Audio("/assets/setup-ost.mp3");

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

  useEffect(() => {
    if (schooling !== "") {
      submitDetails();
    }
  }, [schooling]);

  useEffect(() => {
    if (step >= 7) {
      console.log("handleEnd called");
      handleEnd();
    }
  }, [step]);

  const handleReset = () => {
    setStep(0);
    setName("");
    setSchooling("");
    setAnimation("fade-in");
  };

  // Function to handle the start button click
  const handleStart = () => {
    audio
      .play()
      .then(() => {
        let volume = 0;
        audio.volume = volume;
        const intervalId = setInterval(() => {
          if (volume <= 0.9) {
            volume += 0.1;
            audio.volume = volume;
          } else {
            clearInterval(intervalId);
          }
        }, 200); // Increase volume every 200ms
      })
      .catch((error) => console.error("Error playing audio:", error));
    setStep(1);
  };

  const handleEnd = () => {
    let volume = audio.volume;
    console.log(volume);
    const intervalId = setInterval(() => {
      if (volume >= 0.1) {
        volume -= 0.1;
        audio.volume = volume;
        console.log("audio vol", audio.volume);
      } else {
        clearInterval(intervalId);
      }
    }, 200); // Increase volume every 200ms
  };

  // New function to handle POST request
  const submitDetails = async () => {
    const response = await fetch("http://localhost:3000/saveStudentStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        status: schooling,
      }),
    });

    if (response.ok) {
      console.log("Schooling and age submitted successfully");
    } else {
      console.error("Failed to submit schooling");
    }
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="start-screen">
            <Button
              style={{
                fontSize: "30px",
                fontFamily: "CustomFont",
              }}
              variant="contained"
              color="success"
              onClick={handleStart}
            >
              Start
            </Button>
          </div>
        );

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
                value={"Middle School"}
                sx={{
                  fontSize: 40,
                  fontFamily: "CustomFont",
                }}
              >
                Middle School
              </MenuItem>
              <MenuItem
                value={"High School"}
                sx={{
                  fontSize: 40,
                  fontFamily: "CustomFont",
                }}
              >
                High School
              </MenuItem>
              <MenuItem
                value={"University"}
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
              NBSEHacks Submission By: <br></br>Wahib, Nathan, Arsalan, Lucas
            </div>
          </div>
        );
      default:
        // It's a good practice to handle unexpected cases, even if you don't expect them to occur
        return <div>Unexpected step. Please refresh to start over.</div>;
    }
  };
  // Render the start screen if the app hasn't been started yet
  return (
    <div>
      <div className="page">
        <div className={`content ${animation}`}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
