import { useEffect, useRef, useState } from "react";

type UseCountdownReturn = {
    secondsLeft: number;
    isActive: boolean;
    reset: () => void;
    stop: () => void;
};

export function useCountdown(
    initialSeconds: number,
    onComplete?: () => void
): UseCountdownReturn {

    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
    const [isActive, setIsActive] = useState<boolean>(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isActive) return;

        intervalRef.current = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current as NodeJS.Timeout);
                    setIsActive(false);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, onComplete]);

    const reset = () => {
        setSecondsLeft(initialSeconds);
        setIsActive(true);
    };

    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsActive(false);
    };

    return { secondsLeft, isActive, reset, stop };
}
