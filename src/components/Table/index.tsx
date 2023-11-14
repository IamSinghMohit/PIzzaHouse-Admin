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
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {memo} from "react"

interface Props {
    classsName?: string;
    columns: Array<{ name: string }>;
    data: CategorySchemaType[];
    onEditClick: (cat: CategorySchemaType) => void;
    onViewClick: (cat: CategorySchemaType) => void;
    onDeleteClick: (cat: CategorySchemaType) => void;
    emptyContent: string;
    isLoading: boolean;
    bottomContent?: React.ReactNode;
    bottomContentPlacement?: "inside" | "outside";
    cbIntersectionObr?: () => void;
    observeLastBy?: number;
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
    bottomContent,
    bottomContentPlacement,
    cbIntersectionObr,
    observeLastBy,
}: Props) {
    const shouldRenderData: any = data && !isLoading;
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
            bottomContent={bottomContent}
            bottomContentPlacement={bottomContentPlacement}
            classNames={{
                table:'h-[320px] sm:h-[420px] md:h-[450px] lg:h-[510px]'
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
                        <TableRow key={`${uuid()}`}>
                            <TableCell>
                                <Avatar src={cat.image} size="lg" radius="sm" />
                            </TableCell>
                            <TableCell>{cat.name}</TableCell>
                            <TableCell>
                                {dayjs(cat.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell>
                                <TableActions
                                    ref={(e) => {
                                        if (e && observeLastBy) {
                                            index + observeLastBy ==
                                                data.length &&
                                                lastProductRef(e);
                                        }
                                    }}
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

export default memo(AppTable)
