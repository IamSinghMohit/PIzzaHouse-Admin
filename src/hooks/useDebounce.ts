import { useState, useEffect } from "react";
function useDebounce<T>(value: T, time: number) {
    const [debounceValue, setDebounceValue] = useState(value);

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
