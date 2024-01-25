import { useAppSelector } from "@/hooks/state";
import { useProducts } from "../../hooks/useProducts";
import ProductTableRender from "./ProductTableRender";
import DeleteProductModal from "../modal/DeleteProductModal";
import ProductModal from "../modal/ProductModal";
import { useCallback, useRef, useState } from "react";
import { TModalRef } from "@/types/Modal";
import { shallowEqual } from "react-redux";
import AppPagination from "@/components/AppPagination";

function ProductTable() {
    const ProductMoalRef = useRef<TModalRef>(null);
    const DeleteModalRef = useRef<TModalRef>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState("10");
    const {
        product_category,
        product_featured,
        product_name,
        product_status,
        range,
    } = useAppSelector((state) => state.product.fetching_states, shallowEqual);
    const category = product_category ? product_category.split(":")[1] : "";

    const { data, isError, isLoading } = useProducts({
        max: range[1],
        min: range[0],
        name: product_name,
        category: category,
        featured: product_featured,
        status: product_status,
        limit: limit,
        page: page,
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
                data={data?.products || []}
                isError={isError}
                isLoading={isLoading}
                onDeleteClick={handleDeleteClick}
                onViewClick={handleViewClick}
            />
            <AppPagination
                page={page}
                totalPages={data?.pages || 1}
                setPage={setPage}
                selected={limit}
                setSelected={setLimit}
            />
            <ProductModal type="Update" ref={ProductMoalRef} />
            <DeleteProductModal ref={DeleteModalRef} />
        </>
    );
}

export default ProductTable;
