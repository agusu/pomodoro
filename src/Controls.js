import React from 'react'
import {Button} from  'semantic-ui-react';

export default function Controls({timerStatus, handleReset}){
    const [isRunning, setRunning] = timerStatus;

    return (<>
        <Button id="start_stop" onClick={() => setRunning(!isRunning)}>{isRunning ? "STOP" : "START"}</Button>
        <Button id="reset" onClick={handleReset}>RESET</Button>
        </>
    )
}