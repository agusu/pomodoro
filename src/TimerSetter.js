import {React} from 'react'
import {Segment, Icon, Button, Statistic} from  'semantic-ui-react';

export default function TimerSetter({type, useDuration}){
    const [duration, setDuration] = useDuration;
    const increment = () => {
        if (duration === 60) return
        setDuration(duration + 1);
    }
    const decrement = () => {
        if (duration === 1) return
        setDuration(duration - 1);
    }
    const detectScrollDir = (e) => {
        if (e.deltaY < 0) increment();
        else if (e.deltaY > 0) decrement();
    }

    return (<div id={`timersetter-${type}`} onWheel={(e) => detectScrollDir(e)}>
        <Segment.Group compact size='huge'>
            <Statistic size="small" textAlign='center' className='pt' style={{lineHeight: "0.1em"}}>
                <Statistic.Value id={`${type}-length`}>{duration}</Statistic.Value>
                <Statistic.Label id={`${type}-label`}>
                    <Icon name={type === 'session' ? 'time' : 'coffee'}/> {type}</Statistic.Label>
            </Statistic>
        <Segment compact textAlign='center' className='plus-minus-box'>
            <Button.Group size='large'>
                <Button color={"red"} id={`${type}-decrement`} onClick={decrement} className="setter" icon="minus"/>
                <Button color={"red"}  id={`${type}-increment`} onClick={increment} className="setter" icon="add"/>
            </Button.Group>
        </Segment>
        </Segment.Group>
        </div>
    )
}