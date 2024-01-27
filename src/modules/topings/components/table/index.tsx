import { useAppSelector } from "@/hooks/state";
import { useCallback, useRef, useState } from "react";
import { TModalRef } from "@/types/Modal";
import { shallowEqual } from "react-redux";
import AppPagination from "@/modules/commponents/AppPagination";
import { useTopings } from "../../hooks/useTopings";
import TopingTableRender from "./TopingTableRender";
import TopingModal from "../modals/TopingModal";
import DeleteTopingModal from "../modals/DeleteTopingModal";

function TopingTable() {
    const ProductMoalRef = useRef<TModalRef>(null);
    const DeleteModalRef = useRef<TModalRef>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState("10");
    const {
        name,
        category:topingCategory,
        status,
        range,
    } = useAppSelector((state) => state.toping.fetching_states, shallowEqual);
    const category = topingCategory ? topingCategory.split(":")[1] : "";

    const { data, isError, isLoading } = useTopings({
        max: range[1],
        min: range[0],
        name: name,
        category: category,
        status: status,
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
            <TopingTableRender
                data={data?.topings || []}
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
            <TopingModal type="Update" ref={ProductMoalRef} />
            <DeleteTopingModal ref={DeleteModalRef} />
        </>
    );
}

export default  TopingTable;
