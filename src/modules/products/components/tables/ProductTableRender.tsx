import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@nextui-org/react";
import dayjs from "dayjs";
import TableActions from "@/components/Table/TableAction";
import { memo, useMemo } from "react";
import { ProductColumns } from "@/data/product-table";
import { useAppDispatch } from "@/hooks/state";
import { TProductSchema } from "../../schema";
import { setProductState } from "@/store/slices/product";
import { IconCrown, IconCrownOff } from "@tabler/icons-react";
import ClImage from "@/modules/commponents/ClImage";
import { TableLoader } from "@/modules/loaders";
import { generateCloudinaryImageUrl } from "@/utils";

interface Props {
    data: TProductSchema[];
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
    const columns = useMemo(() => ProductColumns, []);
    const dispatch = useAppDispatch();

    function handleOnViewClick(item: TProductSchema) {
        dispatch(
            setProductState({
                type: "SET",
                data: {
                    product_id: item.id,
                    product_category: item.category,
                    product_description: item.description,
                    product_featured: item.featured,
                    product_name: item.name,
                    product_price: item.price,
                    product_status: item.status,
                    product_image: generateCloudinaryImageUrl(item.image),
                },
            }),
        );
        onViewClick();
    }
    function handleDeleteClick(item: TProductSchema) {
        dispatch(
            setProductState({
                type: "SET",
                data: {
                    product_id: item.id,
                    product_name: item.name,
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
            radius="sm"
            classNames={{
                table: `${isLoading && "h-[500px]"}`,
                base:'thin-scroll-thumb max-h-[600px]'
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
                        : "No Product found create 🔥 one!")
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
                            {item.featured ? (
                                <Chip
                                    radius="sm"
                                    color="primary"
                                    variant="bordered"
                                    startContent={<IconCrown />}
                                >
                                    Yes
                                </Chip>
                            ) : (
                                <Chip
                                    radius="sm"
                                    color="secondary"
                                    variant="bordered"
                                    startContent={<IconCrownOff />}
                                >
                                    No
                                </Chip>
                            )}
                        </TableCell>
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
