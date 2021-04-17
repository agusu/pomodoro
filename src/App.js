import "./App.css";
import React, { useState } from "react";

function Timer({ sessionMins, breakMins }) {
  const [timer, setTimer] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(sessionMins);
  const [isRunning, setRunningState] = useState(false);
  const [hasStarted, setStartedState] = useState(false);
  const [breakStarted, setBreakStarted] = useState(false);
  
  const tick = () => {
    console.log("tick", seconds, minutes)
    if (seconds > 0) {
      console.log("tick s", seconds, timer)
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      console.log("tick m", minutes, seconds, timer)
    } else if (!breakStarted) {
      setBreakStarted(true);
      setMinutes(breakMins);
    } else {
      clearInterval(timer);
    }
  }


  
  function restart() {
    pause();
    setSeconds(0);
    setMinutes(sessionMins);
    setStartedState(false);
  }

  function start() {
    setTimer(setInterval(tick, 1000))
    setRunningState(true);
    setStartedState(true);
  }

  function resume() {
    if (!hasStarted) return;
    setRunningState(true);
    setTimer(setInterval(tick, 1000));
  }
  function pause() {
    if (!hasStarted) return;
    setRunningState(false);
    clearInterval(timer);
  }

  const startStop = () => {
    if (isRunning) {
      pause();
      console.log("pauso");
    } else if (hasStarted) {
      resume();
      console.log("resume");
    } else {
      start();
      console.log("start");
    }
  };

  return (
    <>
      <div id="timer-label">Session {String(isRunning)}</div>
      <div id="time-left">
        {minutes}:{seconds === 0 ? "00" : seconds}
      </div>
      <button id="start_stop" onClick={startStop}>
        START/STOP
      </button>
      <button
        id="reset"
        onClick={restart}
      >
        RESET
      </button>
    </>
  );
}

function App() {
  const [sessionMins, setSessionMins] = useState(25); //25 min
  const [breakMins, setBreakMins] = useState(5);

  const incrementBreak = () => {
    setBreakMins(breakMins + 1);
  };
  const incrementSession = () => {
    setSessionMins(sessionMins + 1);
  };
  const decrementBreak = () => {
    setBreakMins(breakMins - 1);
  };
  const decrementSession = () => {
    setSessionMins(sessionMins - 1);
  };

  return (
    <>
      <div id="break-label">
        Break Length
        <div id="break-length">{breakMins}</div>
        <button id="break-increment" onClick={incrementBreak}>
          +
        </button>
        <button id="break-decrement" onClick={decrementBreak}>
          -
        </button>
      </div>
      <div id="session-label">
        Session Length
        <div id="session-length">{sessionMins}</div>
        <button id="session-increment" onClick={incrementSession}>
          +
        </button>
        <button id="session-decrement" onClick={decrementSession}>
          -
        </button>
      </div>
      <Timer sessionMins={sessionMins} breakMins={breakMins} />
    </>
  );
}

export default App;
