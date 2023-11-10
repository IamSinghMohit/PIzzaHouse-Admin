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
import { getCurrentWindow } from "@/utils";

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
    classNames?: {
        base: React.HTMLProps<HTMLDivElement>;
        table: React.HTMLProps<HTMLTableElement>
        thead: React.HTMLProps<HTMLTableHeaderCellElement>;
        tbody: React.HTMLProps<HTMLTableSectionElement>; // Adjust the type as needed
        tfoot: React.HTMLProps<HTMLTableHeaderCellElement>;
        emptyWrapper: React.HTMLProps<HTMLDivElement>;
        loadingWrapper: React.HTMLProps<HTMLDivElement>;
        wrapper: React.HTMLProps<HTMLDivElement>;
        tr: React.HTMLProps<HTMLTableRowElement>; // Adjust the type as needed
        th: React.HTMLProps<HTMLTableHeaderCellElement>;
        td: React.HTMLProps<HTMLTableCellElement>;
        sortIcon: React.HTMLProps<HTMLDivElement>;
    };
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
    classNames,
}: Props) {
    const shouldRenderData: any = data && !isLoading;
    const screen = getCurrentWindow();
    return (
        <Table
            isHeaderSticky
            aria-label="Prodcut table"
            layout="auto"
            className={classsName}
            // classNames={{
            //     table: `${isLoading && "min-h-[250px]"}`,
            //     base: `${
            //         screen == "mobile" ? "max-h-[420px]" : "max-h-[520px]"
            //     } overflow-scroll`,
            // }}
            // the library was throwing type errors, to resolve them 
            classNames={classNames as unknown as Record<string,string>}
            bottomContent={bottomContent}
            bottomContentPlacement={bottomContentPlacement}
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
