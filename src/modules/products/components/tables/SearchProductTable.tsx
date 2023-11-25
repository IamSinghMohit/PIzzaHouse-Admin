import useDebounce from "@/hooks/useDebounce";
import { useProductContext } from "../../context";
import { useProducts } from "../../hooks/useProducts.";
import ProductTable from "./ProductTable";

interface Props {}

function SearchProductTable({}: Props) {
    const { slider, showFeatured, productType, search ,category} = useProductContext();
    const debounceText = useDebounce(search,400)

    const { data ,isLoading,isError} = useProducts({
        min: slider[0],
        name: debounceText?.trim() || '',
        max: slider[1],
        featured: showFeatured,
        status: productType,
        category:category.split(':')[0]
    });

    return (
        <>
            <ProductTable data={data?.data || []}  isLoading={isLoading} isError={isError}/>
        </>
    );
}

export default SearchProductTable;
