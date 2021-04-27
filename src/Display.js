import React from 'react'
import moment from 'moment'

export default function Display ({currentType, currentTime}) {
    return (
        <>
        <h2 id="timer-label">{currentType === 'session' ? 'Session' : 'Break'}</h2>
        <h1 id="time-left">{moment(currentTime).hours() === 22 ? "60:00" : moment(currentTime).format("mm:ss")}</h1>
      </>
    )
}