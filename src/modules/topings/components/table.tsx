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
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { memo, useMemo } from "react";
import { ProductColumns } from "@/data/product-table";
import { FaCrown } from "react-icons/fa6";
import { TbCrownOff } from "react-icons/tb";
import IconWrapper from "@/components/IconWrapper";

interface Props {
    classsName?: string;
    data: ProductSchemaType[];
    onEditClick: (cat: ProductSchemaType) => void;
    onViewClick: (cat: ProductSchemaType) => void;
    onDeleteClick: (cat: ProductSchemaType) => void;
    isLoading: boolean;
    cbIntersectionObr: () => void;
    isError: boolean;
}

function DumbProductTable({
    classsName,
    data,
    onEditClick,
    onViewClick,
    onDeleteClick,
    isLoading,
    cbIntersectionObr,
    isError,
}: Props) {
    const shouldRenderData: any = data && !isLoading;
    const columns = useMemo(() => ProductColumns, []);
    const lastProductRef = useIntersectionObserver(
        cbIntersectionObr || (() => {}),
        [isLoading, data.length]
    );
    return (
        <Table
            isHeaderSticky
            aria-label="Prodcut table"
            layout="auto"
            className={classsName}
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
                {shouldRenderData &&
                    data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Avatar
                                    src={item.image}
                                    size="lg"
                                    radius="sm"
                                />
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
                                    ref={(e) => {
                                        if (e) {
                                            index + 10 == data.length &&
                                                lastProductRef(e);
                                        }
                                    }}
                                    editIconEvents={{
                                        onClick: () => onEditClick(item),
                                    }}
                                    deleteIconEvents={{
                                        onClick: () => onDeleteClick(item),
                                    }}
                                    viewIconEvents={{
                                        onClick: () => onViewClick(item),
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default memo(DumbProductTable);
