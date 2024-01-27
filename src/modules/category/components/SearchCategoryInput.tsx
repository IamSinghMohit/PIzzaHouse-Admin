import SearchInput from "@/modules/commponents/SearchInput";
import { useAppDispatch } from "@/hooks/state";
import { setCategorySearchName } from "@/store/slices/category";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

interface Props {}

function SearchCategoryInput({}: Props) {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const debouncedText = useDebounce(value, 400);

    useEffect(() => {
        dispatch(setCategorySearchName(debouncedText));
    }, [value]);

    return (
        <div className="w-[280px]">
            <SearchInput
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
}

export default SearchCategoryInput;
