import ProductBar from "./components/ProductBar";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import {
    setLoadingProduct,
    setStartedSearchingProduct,
} from "@/store/features/searchSlice";
import { ProductContextProvider, useProductContext } from "./context";
import SearchProductTable from "./components/tables/SearchProductTable";

interface Props {}

function Product({}: Props) {
    const {search,setSearch} = useProductContext()
    const dispatch = useAppDispatch();
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
        <ProductContextProvider>
            <ProductBar
            />
            <SearchProductTable />
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
        </ProductContextProvider>
    );
}

export default Product;
