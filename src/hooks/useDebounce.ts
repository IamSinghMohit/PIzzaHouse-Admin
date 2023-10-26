import { useState, useEffect } from "react";
function useDebounce(value: any, time: number) {
    const [debounceValue, setDebounceValue] = useState(null);

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
