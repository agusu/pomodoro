
import React, { useEffect, useState, useRef} from 'react';
import {useInterval} from './hooks/useInterval';
import Display from './Display';
import Controls from './Controls'
import TimerSetter from './TimerSetter';
import { Header, Grid } from 'semantic-ui-react';
import alarm from './sounds/alarm.mp3'
import "./App.css";
import tomato from "./img/tomatocap.png";
import {styles} from "./styles.js"

function App() {
  const [sessionMins, setSessionMins] = useState(25); //25 min
  const [breakMins, setBreakMins] = useState(5);
  const [timerType, setTimerType] = useState("session");
  const [remaining_ms, setRemaining_ms] = useState(sessionMins * 60 * 1000);
  const [isRunning, setRunning] = useState(false);
  
  const beep = useRef();
  useInterval(() => setRemaining_ms(remaining_ms - 1000), isRunning ? 1000 : null);

  useEffect(() => {
    setRemaining_ms(sessionMins * 60 * 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionMins])

  useEffect(() => {
    if (remaining_ms === 0 && timerType === 'session') {
      beep.current.play();
      setTimerType('break');
      setRemaining_ms(breakMins * 60 * 1000);
    } else if (remaining_ms === 0 && timerType === 'break') {
      beep.current.play();
      setTimerType('session');
      setRemaining_ms(sessionMins * 60 * 1000);
      setRunning(false);
    }
  }, [remaining_ms, breakMins, sessionMins, timerType])
  
  const handleReset = () => {
    setTimerType('session');
    setRunning(false);
    setSessionMins(25);
    setBreakMins(5);
    setRemaining_ms(25 * 60 * 1000);
    beep.current.pause();
    beep.current.currentTime = 0;
  }

  
  return (<div style={{position: "relative"}}>
    <Header as="h1" style={styles.title}>Pomodoro Clock</Header>
    <Grid textAlign={'center'} style={styles.container} verticalAlign={'middle'}> 
      <Grid.Column style={styles.box} className="box">
        <img src={tomato} alt="tomato"/>
        <Display currentTime={remaining_ms} currentType={timerType} style={styles.display}/>
        <Controls timerStatus={[isRunning, setRunning]} handleReset={handleReset} style={styles.setters}/>
      <Grid padded={'vertically'} centered>
        <Grid.Row columns={2} style={styles.setters}>
          <Grid.Column id='session-column'>
            <TimerSetter type='session' useDuration={[sessionMins, setSessionMins]}/>
          </Grid.Column>
          <Grid.Column id='break-column'>
            <TimerSetter type='break' useDuration={[breakMins, setBreakMins]}/>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      <audio id="beep" ref={beep} src={alarm}></audio>
      </Grid.Column> 
    </Grid></div>
  );
}

export default App;
