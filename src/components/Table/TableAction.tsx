import { Tooltip } from "@nextui-org/react";
import { EyeIcon, DeleteIcon, EditIcon } from "@/icons";
import {Ref, forwardRef} from "react"

export interface TableActionProps {
    editIconEvents?: React.HTMLProps<HTMLSpanElement>;
    viewIconEvents?: React.HTMLProps<HTMLSpanElement>;
    deleteIconEvents?: React.HTMLProps<HTMLSpanElement>;
}

function TableActions({
    editIconEvents,
    viewIconEvents,
    deleteIconEvents,
}: TableActionProps,ref:Ref<HTMLDivElement>) {
    return (
        <div className="relative flex items-center gap-3" ref={ref}>
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
                content="edit"
                color="primary"
                showArrow
                classNames={{
                    base: "text-white",
                }}
            >
                <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-primaryOrange"
                    {...editIconEvents}
                >
                    <EditIcon />
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
export default forwardRef(TableActions)
