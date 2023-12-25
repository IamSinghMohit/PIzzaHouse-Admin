import { Checkbox } from "@nextui-org/react";
import { FaCrown } from "react-icons/fa6";
interface Props {
    isSelected?: boolean;
    onValueChange?: (e: boolean) => void;
    text: string;
}

function AppCheck({ onValueChange, isSelected, text }: Props) {
    return (
        <Checkbox
            size="lg"
            radius="sm"
            className="text-white"
            isSelected={isSelected}
            onValueChange={onValueChange}
        >
            <div className="flex gap-1 text-primaryOrange items-center">
                <FaCrown />{" "}
                <span className="text-black font-bold text-[14px]">{text}</span>
            </div>
        </Checkbox>
    );
}

export default AppCheck;
