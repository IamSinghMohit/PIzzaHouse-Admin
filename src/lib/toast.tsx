import toast from "react-hot-toast";
import IconWrapper from "@/components/IconWrapper";
import { MdError } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { Spinner } from "@nextui-org/react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

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
    error: string | ((data: T) => string)
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
                    <IconWrapper
                        icon={<IoCheckmarkDoneOutline />}
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
                    <IconWrapper icon={<MdError />} className="text-red-500" />
                ),
            },
        }
    );
}

export function errorToast(message: string) {
    toast.error(message, {
        style: {
            border: "2px solid #fb923c",
            background: "#fed7aa",
            color: "#991b1b",
        },
        icon: <IconWrapper icon={<MdError />} className="text-red-500" />,
    });
}
