import toast from "react-hot-toast";

export function successToast(message: string) {
    return toast.success(message, {
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

export function promiseToast(
    func: Promise<any>,
    loadingText: string,
    successText: string,
    errorText: string
) {
    return toast.promise(
        func,
        {
            loading: loadingText,
            success: successText,
            error: errorText,
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
            border: "2px solid #ef4444",
            background: "#fecaca",
            color: "#b91c1c",
        },
        iconTheme: {
            primary: "#ef4444",
            secondary: "white",
        },
    });
}
