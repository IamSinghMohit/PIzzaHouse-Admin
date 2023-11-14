import { Card, CardBody, Input } from "@nextui-org/react";
import CreateButton from "@/components/TopBar/CreateButton";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setPriceAttribute } from "@/store/features/categorySlice";
import { SearchIcon } from "@/icons";
import { setLoading, setStartedSearching } from "@/store/features/searchSlice";
import SearchCategoryTable from "./components/tables/SearchTable";
import { useState} from "react";
import useDebounce from "@/hooks/useDebounce";
import PaginatedTable from "./components/tables/PaginatedTable";

interface Props {}

function Category({}: Props) {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    const { started_searching ,isLoading} = useAppSelector(
        (state) => state.search.categories
    );
    const debounceText = useDebounce(search.trim(), 500);

    function handleSearching(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setSearch(inputValue);
        if (inputValue.length == 0) {
            dispatch(setStartedSearching(false));
        }
        if (!started_searching && inputValue.length != 0) {
            dispatch(setStartedSearching(true));
        }
        if (inputValue == "" || inputValue.trim() == ''){
            dispatch(setStartedSearching(false));
            dispatch(setLoading(false))
        }
        if(!isLoading && debounceText != inputValue.trim()){
            dispatch(setLoading(true))
        }
    }

    return (
        <>
            <Card className="mb-2" shadow="sm">
                <CardBody className="flex-row justify-between gap-2 flex-wrap">
                    <Input
                        placeholder="Search by name"
                        startContent={<SearchIcon />}
                        className="max-w-[300px] sm:w-[290px]"
                        value={search}
                        onChange={handleSearching}
                        size="lg"
                    />
                    <CreateButton
                        buttonText="Create Category"
                        onPress={() => dispatch(setPriceAttribute((_) => []))}
                    />
                </CardBody>
            </Card>
            {started_searching ? (
                <SearchCategoryTable text={debounceText} />
            ) : (
                <PaginatedTable/>
            )}
        </>
    );
}

export default Category;
