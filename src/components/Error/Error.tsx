import { BiErrorCircle } from "react-icons/bi";
import IconWrapper from "../IconWrapper";
interface Props {
    text: string;
}

function Error({ text }: Props) {
    return (
        <div className="flex items-center text-red-500">
            <IconWrapper icon={<BiErrorCircle />} className="" />
            {text}
        </div>
    );
}

export default Error;
