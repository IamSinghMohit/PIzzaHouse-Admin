import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/icons";
import { useSearchCateogry } from "../hooks/useSearchCategory";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setSearchCategoryLoading,
    setSearchedCategories,
    setStartedSearching,
} from "@/store/features/searchSlice";

interface Props {}

function SearchCategory({}: Props) {
    const [text, setText] = useState("");
    const debouncedText = useDebounce(text.trim(), 500);
    const { data, isLoading } = useSearchCateogry(debouncedText || "");
    const { isLoading: categoryLoading, startedSearching } = useAppSelector(
        (state) => state.search.categories
    );
    const dispatch = useAppDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!startedSearching && e.target.value.trim().length != 0) {
            dispatch(setStartedSearching(true));
        }
        if(e.target.value.trim().length == 0){
            dispatch(setStartedSearching(false));
        }
        const inputValue = e.target.value;
        setText(inputValue);
        if (inputValue == "") {
            dispatch(setSearchedCategories([]));
            dispatch(setStartedSearching(false));
            dispatch(setSearchCategoryLoading(false));
        }
        if (inputValue.length > 0 && inputValue.trim() != text.trim()) {
            if (!categoryLoading) {
                dispatch(setSearchCategoryLoading(true));
            }
        }
    }

    useEffect(() => {
        if (data) {
            dispatch(setSearchedCategories(data));
        }
        dispatch(setSearchCategoryLoading(isLoading));
    }, [data, isLoading]);

    return (
        <Input
            label="Search"
            endContent={<SearchIcon />}
            className="max-w-[300px] sm:w-[290px]"
            value={text}
            onChange={handleChange}
            size="sm"
            classNames={{
                label: "text-primaryOrange",
            }}
        />
    );
}

export default SearchCategory;
