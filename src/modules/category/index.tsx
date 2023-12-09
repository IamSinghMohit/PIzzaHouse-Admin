import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setStartedSearchingCategory,
    setLoadingCategory,
} from "@/store/features/searchSlice";
import SearchCategoryTable from "./components/tables/SearchTable";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import PaginatedTable from "./components/tables/PaginatedTable";
import SearchBar from "./components/SearchBar";

interface Props {}

function Category({}: Props) {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    const { started_searching, isLoading } = useAppSelector(
        (state) => state.search.categories
    );
    const debounceText = useDebounce(search.trim(), 500);

    function handleSearching(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setSearch(inputValue);
        if (inputValue.length == 0) {
            dispatch(setStartedSearchingCategory(false));
        }
        if (!started_searching && inputValue.length != 0) {
            dispatch(setStartedSearchingCategory(true));
        }
        if (inputValue == "" || inputValue.trim() == "") {
            dispatch(setStartedSearchingCategory(false));
            dispatch(setLoadingCategory(false));
        }
        if (!isLoading && debounceText != inputValue.trim()) {
            dispatch(setLoadingCategory(true));
        }
    }

    return (
        <>
            <SearchBar />
            {started_searching ? (
                <SearchCategoryTable text={debounceText} />
            ) : (
                <PaginatedTable />
            )}
        </>
    );
}

export default Category;
