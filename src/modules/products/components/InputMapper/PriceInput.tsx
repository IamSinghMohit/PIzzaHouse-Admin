import { Badge, Button, Input } from "@nextui-org/react";
import { memo } from "react";

interface Props {
    title?: string;
    refCb?: (ref: HTMLInputElement | null) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    chipClass?: string;
    isDeafult?: boolean;
    onClick?:() => void;
    value?:string;
    className?:string;
}

function PriceInput({
    title,
    isInvalid,
    value,
    onChange,
    onKeyDown,
    refCb,
    chipClass,
    isDeafult,
    onClick,
    className,
}: Props) {
    return (
        <Badge content="Default" isInvisible={!isDeafult} color="primary" className="border-darkOrange"  placement="top-left">
            <div className={`flex ${className}`}>
                <Button
                    onPress={onClick}
                    className={`h-[40px] ${
                        !isDeafult ? "bg-primaryOrange" : "bg-red-500"
                    } text-white rounded-none rounded-l-md pl-2 border-2 ${
                        !isDeafult ? "border-darkOrange" : "border-red-700"
                    } ${chipClass}`}
                >
                    {title}
                </Button>
                <Input
                    type="number"
                    value={value}
                    radius="none"
                    ref={refCb}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    classNames={{
                        base: "w-[100px] h-[40px]",
                        inputWrapper: "rounded-r-md h-[40px]",
                    }}
                    isInvalid={isInvalid}
                />
            </div>
        </Badge>
    );
}

export default memo(PriceInput)
