import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { IconChecks, IconExclamationCircle } from "@tabler/icons-react";

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
    success: string | ((data: T) => string),
    error: string | ((data: T) => string),
) {
    return toast.promise(
        func,
        {
            loading: loadingText,
            success,
            error,
        },
        {
            success: {
                duration: 2000,
                style: {
                    border: "2px solid #bef264",
                    background: "#fde68a",
                    color: "#22c55e",
                },
                iconTheme: {
                    primary: "#a3e635",
                    secondary: "white",
                },
                icon: (
                    <IconChecks
                        width={24}
                        height={24}
                        className="text-green-500"
                    />
                ),
            },
            loading: {
                style: {
                    border: "2px solid #fbbf24",
                    background: "#fde68a",
                    color: "#dc2626",
                },
                icon: <Spinner size="sm" />,
            },
            error: {
                style: {
                    border: "2px solid #fb923c",
                    background: "#fed7aa",
                    color: "#991b1b",
                },
                icon: (
                    <IconExclamationCircle
                        width={24}
                        height={24}
                        className="text-red-500"
                    />
                ),
            },
        },
    );
}

export function errorToast(message: string) {
    toast.error(message, {
        style: {
            border: "2px solid #fb923c",
            background: "#fed7aa",
            color: "#991b1b",
        },
        icon: (
            <IconExclamationCircle
                width={24}
                height={24}
                className="text-red-500"
            />
        ),
    });
}
