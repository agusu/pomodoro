
import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
    const savedCallback = useRef()
    let id = 0
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback])
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay])
}