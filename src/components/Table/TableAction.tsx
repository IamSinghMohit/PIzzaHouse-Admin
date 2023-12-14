import { Tooltip } from "@nextui-org/react";
import { EyeIcon, DeleteIcon } from "@/icons";

export interface TableActionProps {
    viewIconEvents?: React.HTMLProps<HTMLSpanElement>;
    deleteIconEvents?: React.HTMLProps<HTMLSpanElement>;
}

function TableActions({ viewIconEvents, deleteIconEvents }: TableActionProps) {
    return (
        <div className="relative flex items-center gap-3">
            <Tooltip
                content="view"
                color="primary"
                showArrow
                classNames={{
                    base: "text-white",
                }}
            >
                <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-primaryOrange"
                    {...viewIconEvents}
                >
                    <EyeIcon />
                </span>
            </Tooltip>
            <Tooltip
                color="primary"
                content="delete"
                showArrow
                classNames={{
                    base: "text-white",
                }}
            >
                <span
                    className="text-lg text-darkOrange cursor-pointer active:opacity-50 hover:text-primaryOrange"
                    {...deleteIconEvents}
                >
                    <DeleteIcon />
                </span>
            </Tooltip>
        </div>
    );
}
export default TableActions;
