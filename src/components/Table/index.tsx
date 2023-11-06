import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    Spinner,
} from "@nextui-org/react";
import * as dayjs from "dayjs";
import { uuid } from "@/utils/uuid";
import { CategorySchemaType } from "@/modules/category/schema";
import TableActions from "./TableAction";

interface Props {
    classsName?: string;
    columns: Array<{ name: string }>;
    data: CategorySchemaType[];
    onEditClick: (cat: CategorySchemaType) => void;
    onViewClick: (cat: CategorySchemaType) => void;
    onDeleteClick: (cat: CategorySchemaType) => void;
    emptyContent: string;
    isLoading: boolean;
}

function AppTable({
    classsName,
    columns,
    data,
    onEditClick,
    onViewClick,
    onDeleteClick,
    emptyContent,
    isLoading,
}: Props) {
    const shouldRenderData:any = data && !isLoading;
    return (
        <Table
            aria-label="Prodcut table"
            layout="auto"
            className={classsName}
            classNames={{
                table: `${isLoading && "min-h-[250px]"}`,
            }}
        >
            <TableHeader>
                {columns.map(({ name }) => (
                    <TableColumn key={`${uuid()}`}>{name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody
                emptyContent={!isLoading && emptyContent}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {shouldRenderData &&
                    data.map((cat, index) => (
                        <TableRow key={`${index + 1}`}>
                            <TableCell>
                                <Avatar src={cat.image} size="lg" radius="sm" />
                            </TableCell>
                            <TableCell>{cat.name}</TableCell>
                            <TableCell>
                                {dayjs(cat.createdAt).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>
                                <TableActions
                                    editIconEvents={{
                                        onClick: () => onEditClick(cat),
                                    }}
                                    deleteIconEvents={{
                                        onClick: () => onDeleteClick(cat),
                                    }}
                                    viewIconEvents={{
                                        onClick: () => onViewClick(cat),
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default AppTable;
