import "./App.css";
import React, { useEffect, useState } from "react";

function Timer({ sessionMins, breakMins }) {
  const [timer, setTimer] = useState(setInterval(console.log(),1000));
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(sessionMins);
  const [isRunning, setRunningState] = useState(false);
  const [hasStarted, setStartedState] = useState(false);
  const [breakStarted, setBreakStarted] = useState(false);
  
  const tick = () => {
    if (seconds > 0) {
      console.log("tickS m", minutes, "s", seconds, "t", timer)
      setSeconds(seconds - 1);
    } else if (minutes > 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
      console.log("tickM m", minutes, "s", seconds, "t", timer)
    } else if (!breakStarted) {
      setBreakStarted(true);
      setMinutes(breakMins);
    } else {
      clearInterval(timer);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {if (!isRunning) {setSeconds(0); setMinutes(sessionMins)}},[sessionMins])

  useEffect(() => {
    
    if (isRunning) {
      setTimer(setInterval(tick, 1000))
    } else {
      clearInterval(timer)
    }
    return () => {clearInterval(timer)}
    }, [isRunning])
  
  function restart() {
    pause();
    setSeconds(0);
    setMinutes(sessionMins);
    setStartedState(false);
  }

  function start() {
    setRunningState(true);
    setStartedState(true);
  }

  function resume() {
    if (!hasStarted) return;
    setRunningState(true);
  }
  function pause() {
    if (!hasStarted) return;
    setRunningState(false);
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
    if (breakMins>1) setBreakMins(breakMins - 1);
  };
  const decrementSession = () => {
    if (sessionMins>1) setSessionMins(sessionMins - 1);
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