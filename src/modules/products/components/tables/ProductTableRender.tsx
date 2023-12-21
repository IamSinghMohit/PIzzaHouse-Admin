import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Spinner,
    Chip,
} from "@nextui-org/react";
import * as dayjs from "dayjs";
import TableActions from "@/components/Table/TableAction";
import { memo, useMemo } from "react";
import { ProductColumns } from "@/data/product-table";
import { FaCrown } from "react-icons/fa6";
import { TbCrownOff } from "react-icons/tb";
import IconWrapper from "@/components/IconWrapper";
import { useAppDispatch } from "@/hooks/state";
import { TProductSchema } from "../../schema";
import { setDefaultProductPrices, setProductState } from "@/store/slices/product";

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
    console.log("table rendered");
    const columns = useMemo(() => ProductColumns, []);
    const dispatch = useAppDispatch();
    return (
        <Table
            isHeaderSticky
            aria-label="Prodcut table"
            layout="auto"
            classNames={{
                table: `${isLoading && "h-[520px]"}`,
            }}
        >
            <TableHeader>
                {columns.map((col) => (
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
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <Avatar src={item.image} size="lg" radius="sm" />
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
                                    startContent={
                                        <IconWrapper
                                            icon={<FaCrown />}
                                            className="text-[18px]"
                                        />
                                    }
                                >
                                    Yes
                                </Chip>
                            ) : (
                                <Chip
                                    radius="sm"
                                    color="secondary"
                                    variant="bordered"
                                    startContent={
                                        <IconWrapper
                                            icon={<TbCrownOff />}
                                            className="text-[18px]"
                                        />
                                    }
                                >
                                    No
                                </Chip>
                            )}
                        </TableCell>
                        <TableCell>
                            <TableActions
                                deleteIconEvents={{
                                    onClick: () => {
                                        dispatch(
                                            setProductState({
                                                product_id: item.id,
                                                product_category: item.category,
                                                product_description:
                                                    item.description,
                                                product_featured: item.featured,
                                                product_name: item.name,
                                                product_price: item.price,
                                                product_status: item.status,
                                                product_image: item.image,
                                            })
                                        );
                                        onDeleteClick();
                                    },
                                }}
                                viewIconEvents={{
                                    onClick: () => {
                                        dispatch(
                                            setProductState({
                                                product_id: item.id,
                                                product_category: item.category,
                                                product_description:
                                                    item.description,
                                                product_featured: item.featured,
                                                product_name: item.name,
                                                product_price: item.price,
                                                product_status: item.status,
                                                product_image: item.image,
                                            })
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

export default memo(ProductTableRender);
