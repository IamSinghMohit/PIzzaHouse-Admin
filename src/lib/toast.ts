import toast from "react-hot-toast";

export function successToast(message: string) {
    return toast.success(message, {
        style: {
            border: "2px solid #84cc16",
            background: "#fde68a",
            color: "white",
        },
        iconTheme: {
            primary: "#a3e635",
            secondary: "white",
        },
    });
}

export function promiseToast<T>(
    func: Promise<T>,
    loadingText: string,
    success: string| ((data:T) => string),
    error: string| ((data:T) => string)
) {
    return toast.promise(
        func,
        {
            loading: loadingText,
            success, 
            error, 
        },
        {
            loading: {
                style: {
                    border: "2px solid #fbbf24",
                    background: "#fde68a",
                    color: "#dc2626",
                },
                iconTheme: {
                    primary: "#ea580c",
                    secondary: "white",
                },
            },
            success: {
                duration: 2000,
                style: {
                    border: "2px solid #bef264",
                    background: "#fde68a",
                    color: "white",
                },
                iconTheme: {
                    primary: "#a3e635",
                    secondary: "white",
                },
            },
            error: {
                style: {
                    border: "2px solid #fb923c",
                    background: "#fed7aa",
                    color: "white",
                },
                iconTheme: {
                    primary: "#ea580c",
                    secondary: "white",
                },
            },
        }
    );
}

export function errorToast(message: string) {
    toast.error(message, {
        style: {
            border: "2px solid #fb923c",
            background: "#fed7aa",
            color: "white",
        },
        iconTheme: {
            primary: "#ea580c",
            secondary: "white",
        },
    });
}
