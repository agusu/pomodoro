import "./App.css";
import { useTimer } from "react-timer-hook";
import React, { useEffect, useState } from 'react';

function Timer({ sessionTime, breakTime }) {
  let timestamp = new Date();
  timestamp.setSeconds(timestamp.getSeconds() + sessionTime);
  useEffect(() =>
    {timestamp = new Date();
    timestamp.setSeconds(timestamp.getSeconds() + sessionTime);},[sessionTime, timestamp])

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ timestamp, onExpire: () => console.warn("onExpire called") });

  const startStop = () => {isRunning ? pause() : start();};
  

  return (
    <>
      <div id="timer-label">Session {isRunning}</div>
      <div id="time-left">{minutes}:{seconds}</div>
      <button id="start_stop" onClick={startStop}>START/STOP</button>
      <button id="reset" onClick={() => {const time = new Date();
  time.setSeconds(time.getSeconds() + sessionTime); restart(time)}}>RESET</button>
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
      <Timer sessionTime = {sessionMins * 60} breakTime = {breakMins * 60}/>
    </>
  );
}

export default App;
