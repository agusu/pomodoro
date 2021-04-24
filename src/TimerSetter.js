import React from 'react'
import {Segment, Icon, Button, Statistic} from  'semantic-ui-react';
export default function TimerSetter({type, useDuration}){
    const [duration, setDuration] = useDuration;
    const increment = () => {
        setDuration(duration + 1);
      }
    const decrement = () => {
        if (duration === 1) return
        setDuration(duration - 1);
    }
    return (<>
        <Segment.Group compact size='huge'>
            <Statistic textAlign='center' className='pt'>
                <Statistic.Value id={`${type}-length`}>{duration} <span className="min">min.</span></Statistic.Value>
                <Statistic.Label id={`${type}-label`}>
                    <Icon name={type === 'session' ? 'time' : 'coffee'}/> {type}</Statistic.Label>
            </Statistic>
            

        <Segment compact textAlign='center' className='plus-minus-box'>
            <Button.Group size='large'>
                <Button id={`${type}-decrement`} onClick={decrement} className="setter" icon="minus"/>
                <Button id={`${type}-increment`} onClick={increment} className="setter" icon="add"/>
            </Button.Group>
        </Segment>
        </Segment.Group>
        </>
    )
}