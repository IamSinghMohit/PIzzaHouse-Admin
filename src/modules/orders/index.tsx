import { OrderColumns } from "@/data/order-table";
import { EyeIcon } from "@/icons";
import {
    Avatar,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import { useOrders } from "./hooks/useOrders";
import * as dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { OrderStatusEnum } from "./schema";
import { useUpdateOrderStatus } from "./hooks/useUpdateOrderStatus";

interface Props {}

function Orders({}: Props) {
    const isLoading = false;
    const isError = false;
    const { data = [] } = useOrders();
    const [selected, setSelected] = useState("");
    const [disabled, setDisabled] = useState<Array<string>>([]);
    const { mutate } = useUpdateOrderStatus();
    function handleOnChange(e: { id: string; data: string }) {
        setDisabled((prev) => [...prev, selected]);
        setSelected(e.data);
        mutate({ id: e.id, data: e.data });
    }
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
                {OrderColumns.map((col) => (
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
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                            <Select
                                className="w-[140px]"
                                color="primary"
                                aria-label="order status changer"
                                isDisabled={
                                    selected === OrderStatusEnum.COMPLETE
                                }
                                defaultSelectedKeys={[item.status]}
                                disabledKeys={disabled}
                                size="sm"
                                radius="sm"
                                variant="faded"
                                onChange={(e) =>
                                    handleOnChange({
                                        id: item.id,
                                        data: e.target.value,
                                    })
                                }
                                classNames={{
                                    selectorIcon: "text-primaryOrange",
                                    base: "p-0 h-[40px]",
                                    innerWrapper: "p-0 ",
                                    mainWrapper: "p-0 h-[40px]",
                                    label: "font-bold",
                                }}
                            >
                                <SelectItem
                                    key={OrderStatusEnum.PLACED}
                                    value={OrderStatusEnum.PLACED}
                                >
                                    PLACED
                                </SelectItem>
                                <SelectItem
                                    key={OrderStatusEnum.PREPARING}
                                    value={OrderStatusEnum.PREPARING}
                                >
                                    PREPARING
                                </SelectItem>
                                <SelectItem
                                    key={OrderStatusEnum.OUTFORDELIVERY}
                                    value={OrderStatusEnum.OUTFORDELIVERY}
                                >
                                    OUT FOR DELIVERY
                                </SelectItem>
                                <SelectItem
                                    key={OrderStatusEnum.COMPLETE}
                                    value={OrderStatusEnum.COMPLETE}
                                >
                                    COMPLETE
                                </SelectItem>
                            </Select>
                        </TableCell>
                        <TableCell>{item.user_full_name}</TableCell>
                        <TableCell>{item.state}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>
                            {dayjs(item.created_at).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>
                            <div>
                                <Tooltip
                                    content="view"
                                    color="primary"
                                    showArrow
                                    classNames={{
                                        base: "text-white",
                                    }}
                                >
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-primaryOrange">
                                        <EyeIcon />
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Orders;

