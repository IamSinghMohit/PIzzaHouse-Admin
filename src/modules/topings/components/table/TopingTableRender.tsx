import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@nextui-org/react";
import * as dayjs from "dayjs";
import TableActions from "@/components/Table/TableAction";
import { memo, useMemo } from "react";
import { useAppDispatch } from "@/hooks/state";
import { TTopingSchema } from "../../schema";
import { TopingColumns } from "@/data/topings-table";
import { setTopingState } from "@/store/slices/topings";
import ClImage from "@/modules/commponents/ClImage";
import { TableLoader } from "@/modules/loaders";

interface Props {
    data: TTopingSchema[];
    onViewClick: () => void;
    onDeleteClick: () => void;
    isLoading: boolean;
    isError: boolean;
}

function ProductTableRender({
    data,
    onViewClick,
    onDeleteClick,
    isLoading,
    isError,
}: Props) {
    const columns = useMemo(() => TopingColumns, []);
    const dispatch = useAppDispatch();

    function handleOnViewClick(item: TTopingSchema) {
        dispatch(
            setTopingState({
                type: "SET",
                data: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    status: item.status,
                    image: item.image,
                },
            }),
        );
        onViewClick();
    }
    function handleDeleteClick(item: TTopingSchema) {
        dispatch(
            setTopingState({
                type: "SET",
                data: {
                    id: item.id,
                    name: item.name,
                },
            }),
        );
        onDeleteClick();
    }

    return (
        <Table
            isHeaderSticky
            aria-label="Prodcut table"
            layout="auto"
            classNames={{
                table: `${isLoading && "h-[500px]"}`,
            }}
        >
            <TableHeader>
                {columns.map((col) => (
                    <TableColumn key={col.id}>{col.name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody
                emptyContent={
                    !isLoading &&
                    (isError
                        ? "Some server error occured ❌"
                        : "No Toping found create 🔥 one!")
                }
                isLoading={isLoading}
                loadingContent={<TableLoader />}
            >
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <ClImage imageId={item.image} />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                            <Chip
                                radius="sm"
                                variant="bordered"
                                color={
                                    item.status == "Published"
                                        ? "success"
                                        : "secondary"
                                }
                            >
                                {item.status}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            {dayjs(item.created_at).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                            <TableActions
                                deleteIconEvents={{
                                    onClick: () => {
                                        handleDeleteClick(item);
                                    },
                                }}
                                viewIconEvents={{
                                    onClick: () => {
                                        handleOnViewClick(item);
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default memo(ProductTableRender);
