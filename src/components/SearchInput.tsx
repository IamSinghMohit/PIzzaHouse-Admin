import { Button, Divider } from "@nextui-org/react";
import { IconSearch } from "@tabler/icons-react";

function SearchInput({
    onButtonPress,
    onKeyDown,
    value,
    onChange,
}: {
    onButtonPress: (...args: any) => void;
    onKeyDown: (...args: any) => void;
    onChange: (...args: any) => void;
    value: string;
}) {
    return (
        <div className="flex items-center">
            <input
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={value}
                className="bg-gray-100 text-black p-2 outline-none rounded-l-md"
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
