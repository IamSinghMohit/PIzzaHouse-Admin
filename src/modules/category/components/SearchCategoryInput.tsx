import SearchInput from "@/components/SearchInput";
import { useAppDispatch } from "@/hooks/state";
import { setCategorySearchName } from "@/store/features/categorySlice";
import { useState } from "react";

interface Props {}

function SearchCategoryInput({}: Props) {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(setCategorySearchName(value));
        }
    };

    return (
        <SearchInput
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            onKeyDown={handleSearchClick}
            onButtonPress={handleSearchClick}
        />
    );
}

export default SearchCategoryInput;
