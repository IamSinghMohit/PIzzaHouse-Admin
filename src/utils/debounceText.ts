function debounceText(callback: (text: string) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;

    return (text: string) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback(text.trim());
        }, delay);
    };
}
