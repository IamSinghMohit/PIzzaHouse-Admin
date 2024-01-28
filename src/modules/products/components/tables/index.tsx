import { useAppSelector } from "@/hooks/state";
import { useProducts } from "../../hooks/useProducts";
import ProductTableRender from "./ProductTableRender";
import DeleteProductModal from "../modal/DeleteProductModal";
import ProductModal from "../modal/ProductModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { TModalRef } from "@/types/Modal";
import { shallowEqual } from "react-redux";
import AppPagination from "@/modules/commponents/AppPagination";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function ProductTable() {
    const ProductMoalRef = useRef<TModalRef>(null);
    const DeleteModalRef = useRef<TModalRef>(null);
    const [limit, setLimit] = useState("10");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const {
        product_category,
        product_featured,
        product_name,
        product_status,
        range,
    } = useAppSelector((state) => state.product.fetching_states, shallowEqual);
    const navigate = useNavigate();

    const { data, isError, isLoading } = useProducts({
        max: range[1],
        min: range[0],
        name: product_name,
        category: product_category,
        featured: product_featured,
        status: product_status,
        limit: parseInt(limit),
        page: page,
    });
    const shouldOpenUpdateProductModal = useMediaQuery({
        query: "(min-width:825px)",
    });

    const handleDeleteClick = useCallback(() => {
        DeleteModalRef.current?.onOpen();
    }, []);

    const handleViewClick = useCallback(() => {
        if (shouldOpenUpdateProductModal) {
            ProductMoalRef.current?.onOpen();
        } else {
            navigate("view");
        }
    }, []);

    useEffect(() => {
        setPages(data?.pages || 1);
    }, [data]);

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
                totalPages={pages}
                page={page}
                setPage={setPage}
                setSelected={setLimit}
                selected={limit}
            />
            <ProductModal type="Update" ref={ProductMoalRef} />
            <DeleteProductModal ref={DeleteModalRef} />
        </>
    );
}

export default ProductTable;
