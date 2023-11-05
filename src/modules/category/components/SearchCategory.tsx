import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/icons";
import { useSearchCateogry } from "../hooks/useSearchCategory";

interface Props {}

function SearchCategory({}: Props) {
    const [text, setText] = useState("");
    const debouncedText = useDebounce(text, 900);
    const { data, isLoading } = useSearchCateogry(debouncedText || '');
    return (
        <Input
            label="Search"
            endContent={<SearchIcon />}
            className="max-w-[300px] sm:w-[290px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="sm"
            classNames={{
                label: "text-primaryOrange",
            }}
        />
    );
}

export default SearchCategory;
