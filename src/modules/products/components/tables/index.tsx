import { useAppSelector } from "@/hooks/state";
import { useProducts } from "../../hooks/useProducts.";
import ProductTableRender from "./ProductTableRender";
import DeleteProductModal from "../modal/DeleteProductModal";
import ProductModal from "../modal/ProductModal";
import { useCallback, useRef } from "react";
import { TModalRef } from "@/types/Modal";
import { shallowEqual } from "react-redux";

interface Props {}

function ProductTable({}: Props) {
    const ProductMoalRef = useRef<TModalRef>(null);
    const DeleteModalRef = useRef<TModalRef>(null);
    const {
        current_selected_category,
        product_featured,
        product_name,
        product_status,
        range,
    } = useAppSelector((state) => state.product.fetching_states);
    const { data, isError, isLoading } = useProducts({
        max: range[1],
        min: range[0],
        name: product_name,
        category: current_selected_category,
        featured: product_featured,
        status: product_status,
    });

    const handleDeleteClick = useCallback(() => {
        DeleteModalRef.current?.onOpen();
    }, []);

    const handleViewClick = useCallback(() => {
        ProductMoalRef.current?.onOpen();
    }, []);
    return (
        <>
            <ProductTableRender
                data={data || []}
                isError={isError}
                isLoading={isLoading}
                onDeleteClick={handleDeleteClick}
                onViewClick={handleViewClick}
            />
            <ProductModal type="Update" ref={ProductMoalRef} />
            <DeleteProductModal ref={DeleteModalRef} />
        </>
    );
}

export default ProductTable;
