import { Button } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
interface Props {
    baseClassName?:string;
    inputClassName?:string;
    buttonClassName?:string;
    inputEvents?:React.HTMLProps<HTMLInputElement>
}

function SearchField({baseClassName,buttonClassName,inputClassName}: Props) {
    return (
        <div className={`flex bg-gray-100 rounded-lg overflow-hidden border-1 ${baseClassName}`}>
            <input
                type="text"
                className={`w-[250px] active:outline-none focus:outline-none px-2 bg-white ${inputClassName}`}
                {...InputEvent}
            />
            <Button isIconOnly radius="none" className={`bg-gray-100 border-l-2 h-full ${buttonClassName}`}>
                <BiSearch />
            </Button>
        </div>
    );
}

export default SearchField;
