const { useRef, useCallback, useEffect } = require("react");

class PausableTimer {

    constructor(callback, delay) {
        let timerId, start, remaining = delay;

        this.pause = function() {
            clearTimeout(timerId);
            remaining -= Date.now() - start;
        };

        this.resume = function() {
            start = Date.now();
            clearTimeout(timerId);
            timerId = setTimeout(callback, remaining);
        };

        this.resume();
    }
}

const useTimeout = (callback, timeout) => {
    const timer = useRef();

    const handleCancel = useCallback(
        () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = undefined;
            }
        },
        [timer],
    );

    useEffect(() => {
        timer.current = new PausableTimer(callback, timeout);
        return handleCancel;
    }, [callback, handleCancel, timeout]);

    const handlePause = () => {
        if (timer.current) timer.current.pause();
    };
    const handleResume = () => {
        if (timer.current) timer.current.resume();
    };

    return {
        cancel: handleCancel,
        pause: handlePause,
        resume: handleResume,
    };
};

export { useTimeout };
