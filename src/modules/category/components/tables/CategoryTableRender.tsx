import {  memo } from "react";
import { CategoryColumns } from "@/data/cateogry-table";
import { useAppDispatch} from "@/hooks/state";
import { Spinner } from "@nextui-org/spinner";
import { Avatar } from "@nextui-org/avatar";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { TCategorySchema } from "../../schema";
import * as dayjs from "dayjs";
import TableAction from "@/components/Table/TableAction";
import { setCurrentSelectedCategory } from "@/store/features/categorySlice";

interface Props {
    data: TCategorySchema[];
    isLoading: boolean;
    isError: boolean;
    onDelete?: () => void;
    onDeleteClick: () => void;
    onViewClick: () => void;
}

function CategoryTableRender({
    data,
    isLoading,
    isError,
    onViewClick,
    onDeleteClick,
}: Props) {

    const disaptch = useAppDispatch();
    const shouldRenderData: any = data && !isLoading;

    return (
        <Table
            isHeaderSticky
            radius="sm"
            aria-label="category table"
            layout="auto"
            classNames={{
                table: `${isLoading && "h-[520px]"}`,
            }}
        >
            <TableHeader>
                {CategoryColumns.map((col) => (
                    <TableColumn key={col.id}>{col.name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody
                emptyContent={
                    !isLoading && isError
                        ? "Some server occured ❌"
                        : "No Category found create 🔥 one!"
}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {shouldRenderData &&
                    data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar
                                    src={item.image}
                                    size="lg"
                                    radius="sm"
                                />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>
                                <TableAction
                                    deleteIconEvents={{
                                        onClick: () => {
                                            disaptch(
                                                setCurrentSelectedCategory(item)
                                            ),
                                                onDeleteClick();
                                        },
                                    }}
                                    viewIconEvents={{
                                        onClick: () => {
                                            disaptch(
                                                setCurrentSelectedCategory(item)
                                            );
                                            onViewClick();
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

export default memo(CategoryTableRender);
