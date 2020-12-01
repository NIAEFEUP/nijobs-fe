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

        this.cancel = function() {
            clearTimeout(timerId);
        };

        this.resume();
    }
}

const useTimeout = (callback, timeout) => {
    const timer = useRef();

    const handleCancel = useCallback(
        () => {
            if (timer.current) {
                timer.current.cancel();
                timer.current = undefined;
            }
        },
        [timer],
    );

    // Ensures that the passed callback is stable and does not change between re-renders,
    // triggering multiple executions of the timer
    const safeCallback = useCallback(callback, [timer]);

    useEffect(() => {
        timer.current = new PausableTimer(safeCallback, timeout);
        return handleCancel;
    }, [safeCallback, handleCancel, timeout]);

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
