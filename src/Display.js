import React from 'react'
import moment from 'moment'

export default function Display ({currentType, currentTime}) {
    const type = currentType;
    const time = currentTime;
    return (
        <>
        <h2 id="timer-label">{type === 'session' ? 'Session' : 'Break'}</h2>
        <h1 id="time-left">{moment(time).format('mm:ss')}</h1>
      </>
    )
}