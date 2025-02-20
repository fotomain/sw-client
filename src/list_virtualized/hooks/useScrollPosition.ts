
import { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react'

const useScrollPosition = (
    element: RefObject<HTMLElement>,
    wait: number = 0
) => {
    const [position, setPosition] = useState(0);
    let throttleTimeout: NodeJS.Timeout | null = null

    const callBack = useCallback(() => {
        //// ████████████
        if(element.current) {
            setPosition(element.current.scrollTop);
            throttleTimeout = null
        }}, [element]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait)
                }
            } else {
                callBack()
            }
        }
        //// ████████████
        if(element.current) {
            element.current.addEventListener('scroll', handleScroll)
            return () => {
                //// ████████████
                if(element.current)
                    element.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [callBack, element])

    return position;
}

export default useScrollPosition
