import "./App.css";
import { useTimer } from "react-timer-hook";
import React, { useEffect, useState } from 'react';

function Timer({ sessionTime, breakTime }) {
  const [cseconds, setCSeconds] = useState(0);
  const [cminutes, setCMinutes] = useState(sessionTime);
  const [hasStarted, setStarted] = useState(false);
  const timestamp = new Date();
  timestamp.setSeconds(timestamp.getSeconds() + sessionTime*60)

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: timestamp, onExpire: () => {
    console.log("expired")
    restart(breakTime * 60);
  }, autoStart: false });
  
  useEffect(() =>
    {
      setCSeconds(seconds);
      setCMinutes(minutes);
    },[seconds, minutes])
  
  useEffect(() => {
    if (!isRunning) {
      let time = new Date();
      time.setSeconds(time.getSeconds() + sessionTime * 60);
      setCSeconds(0);
      setCMinutes(sessionTime);
      restart(time, false);
      setTimeout(() => {pause()}, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionTime])

  const startStop = () => {
    if(isRunning) {
      pause();
      return;
    } else if (hasStarted) { 
      console.log("resume");
    resume();} else {
      console.log(isRunning, hasStarted)
      start();
      setStarted(true);
    }
  };
  
  const handleReset = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sessionTime * 60);
    restart(time, false);
    setStarted(false);
    setTimeout(() => {pause()}, 100);
  }

  return (
    <>
      <div id="timer-label">Session {isRunning ? "running" : "not running"}</div>
      <div id="time-left">{cminutes}:{cseconds}</div>
      <button id="start_stop" onClick={startStop}>START/STOP</button>
      <button id="reset" onClick={handleReset}>RESET</button>
    </>
  );
}

function App() {
  const [sessionMins, setSessionMins] = useState(25); //25 min
  const [breakMins, setBreakMins] = useState(5);

  const incrementBreak = () => {
    setBreakMins(breakMins + 1);
  }
  const incrementSession = () => {
    setSessionMins(sessionMins + 1);
  }
  const decrementBreak = () => {
    setBreakMins(breakMins - 1);
  }
  const decrementSession = () => {
    setSessionMins(sessionMins - 1);
  }

  return (
    <>
      <div id="break-label">
        Break Length
        <div id="break-length">{breakMins}</div>
        <button id="break-increment" onClick={incrementBreak}>+</button>
        <button id="break-decrement" onClick={decrementBreak}>-</button>
      </div>
      <div id="session-label">
        Session Length
        <div id="session-length">{sessionMins}</div>
        <button id="session-increment" onClick={incrementSession}>+</button>
        <button id="session-decrement" onClick={decrementSession}>-</button>
      </div>
      <Timer sessionTime = {sessionMins} breakTime = {breakMins}/>
    </>
  );
}

export default App;
