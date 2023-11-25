import { useState, useEffect } from "react";
function useDebounce<T>(value: T, time: number) {
    const [debounceValue, setDebounceValue] = useState<T | null>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, time);
        return () => {
            clearTimeout(handler);
        };
    }, [value, time]);
    return debounceValue;
}
export default useDebounce;
