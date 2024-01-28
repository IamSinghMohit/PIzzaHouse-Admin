import { useAppSelector } from "@/hooks/state";
import { useCallback, useRef, useState ,useEffect} from "react";
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
    const [limit, setLimit] = useState("10");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const {
        name,
        category:topingCategory,
        status,
        range,
    } = useAppSelector((state) => state.toping.fetching_states, shallowEqual);

    const { data, isError, isLoading } = useTopings({
        max: range[1],
        min: range[0],
        name: name,
        category: topingCategory,
        status: status,
        limit: parseInt(limit),
        page: page,
    });

    const handleDeleteClick = useCallback(() => {
        DeleteModalRef.current?.onOpen();
    }, []);

    const handleViewClick = useCallback(() => {
        ProductMoalRef.current?.onOpen();
    }, []);

    useEffect(() => {
        setPages(data?.pages || 1);
    }, [data]);

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
                totalPages={pages}
                page={page}
                setPage={setPage}
                setSelected={setLimit}
                selected={limit}
            />
            <TopingModal type="Update" ref={ProductMoalRef} />
            <DeleteTopingModal ref={DeleteModalRef} />
        </>
    );
}

export default  TopingTable;
