import { Button, Divider } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";
import { InputHTMLAttributes } from "react";

interface ButtonProps {
    onButtonPress: (...args: any) => void;
    containerClassName?: string;
}

type SearchInputProps = ButtonProps & InputHTMLAttributes<HTMLInputElement>;

function SearchInput({
    onButtonPress,
    containerClassName,
    ...others
}: SearchInputProps) {
    return (
        <div className={`flex items-center ${containerClassName}`}>
            <input
                {...others}
                className="bg-gray-100 text-black p-2 outline-none rounded-l-md flex-grow"
                placeholder="search..."
            />
            <Divider orientation="vertical" className="h-[40px] bg-gray-400" />
            <Button
                onPress={onButtonPress}
                color="primary"
                className="text-white rounded-l-none"
                isIconOnly
                radius="sm"
            >
                <IconSearch />
            </Button>
        </div>
    );
}

export default SearchInput;
