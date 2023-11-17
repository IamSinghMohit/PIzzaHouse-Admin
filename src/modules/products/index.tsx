import ProductBar from "./components/ProductBar";
import {Card,CardBody,Input} from "@nextui-org/react"
import { SearchIcon } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import CreateButton from "@/components/TopBar/CreateButton";
import { setLoadingProduct, setStartedSearchingProduct } from "@/store/features/searchSlice";
import ProductPaginatedTable from "./components/tables/ProductPaginatedTable";
import SearchProductTable from "./components/tables/SearchProductTable";
import { useState } from "react";

interface Props {}

function Product({}: Props) {

    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    const { started_searching, isLoading } = useAppSelector(
        (state) => state.search.products
    );
    const debounceText = useDebounce(search.trim(), 500);

    function handleSearching(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setSearch(inputValue);
        if (inputValue.length == 0) {
            dispatch(setStartedSearchingProduct(false));
        }
        if (!started_searching && inputValue.length != 0) {
            dispatch(setStartedSearchingProduct(true));
        }
        if (inputValue == "" || inputValue.trim() == "") {
            dispatch(setStartedSearchingProduct(false));
            dispatch(setLoadingProduct(false));
        }
        if (!isLoading && debounceText != inputValue.trim()) {
            dispatch(setLoadingProduct(true));
        }
    }

    return (
        <>
            <ProductBar />

            {/* <Card className="mb-2" shadow="sm">
                <CardBody className="flex-row justify-between gap-2 items-center flex-wrap">
                    <CreateButton
                        buttonText="Create Category"
                    />
                </CardBody>
            </Card>
            {started_searching ? (
                < SearchProductTable text={debounceText} />
            ) : (
                <ProductPaginatedTable/ >
            )} */}
        </>
    );
}

export default Product;