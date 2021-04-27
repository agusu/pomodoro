import React from 'react'
import {Button} from  'semantic-ui-react';

export default function Controls({timerStatus, handleReset}){
    const [isRunning, setRunning] = timerStatus;

    return (<>
        <Button 
            id="start_stop" 
            onClick={() => setRunning(!isRunning)}
            icon={isRunning ? 'stop' : 'play'} color="red" />
        <Button 
            id="reset"
            onClick={handleReset}
            icon='undo' color="yellow"/>
        </>
    )
}