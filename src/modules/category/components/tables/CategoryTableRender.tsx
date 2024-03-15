import { memo } from "react";
import { CategoryColumns } from "@/data/cateogry-table";
import { useAppDispatch } from "@/hooks/state";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { TCategorySchema } from "../../schema";
import dayjs from "dayjs";
import TableAction from "@/components/Table/TableAction";
import { setCurrentSelectedCategory } from "@/store/slices/category";
import ClImage from "@/modules/commponents/ClImage";
import { TableLoader } from "@/modules/loaders";
import { generateCloudinaryImageUrl } from "@/utils";

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

    function handleCurrrentSelectedCategory(item: TCategorySchema) {
        disaptch(
            setCurrentSelectedCategory({
                ...item,
                image: generateCloudinaryImageUrl(item.image),
            }),
        );
    }
    return (
        <Table
            isHeaderSticky
            radius="sm"
            aria-label="category table"
            shadow="sm"
            layout="auto"
            className="thin-scroll-thumb"
            classNames={{
                table: `${isLoading && "h-[500px]"}`,
                base:'thin-scroll-thumb'
            }}
        >
            <TableHeader>
                {CategoryColumns.map((col) => (
                    <TableColumn key={col.id}>{col.name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody
                emptyContent={
                    !isLoading &&
                    (isError
                        ? "Some server error occured ❌"
                        : "No Category found create 🔥 one!")
                }
                isLoading={isLoading}
                loadingContent={<TableLoader />}
            >
                {shouldRenderData &&
                    data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <ClImage imageId={item.image} />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>
                                <TableAction
                                    deleteIconEvents={{
                                        onClick: () => {
                                            handleCurrrentSelectedCategory(
                                                item,
                                            );
                                            onDeleteClick();
                                        },
                                    }}
                                    viewIconEvents={{
                                        onClick: () => {
                                            handleCurrrentSelectedCategory(
                                                item,
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
