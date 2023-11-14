import { Select, SelectItem, Pagination } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
interface Props {
    totalPages: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

function AppPagination({
    totalPages,
    page,
    setPage,
    selected,
    setSelected,
}: Props) {
    return (
        <div className="self-start inline-flex items-start gap-3 bg-white p-2 rounded-xl mt-1 shadow-md flex-wrap sm:items-center">
            <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                showControls
                isCompact
            />
            <Select
                className="w-[140px] items-center ml-1"
                label="Limit"
                labelPlacement="outside-left"
                defaultSelectedKeys={["10"]}
                radius="sm"
                variant="faded"
                selectedKeys={[selected]}
                onChange={(e) => {
                    if (!e.target.value) return;
                    setSelected(`${e.target.value}`);
                }}
                classNames={{
                    selectorIcon: "text-primaryOrange",
                    base: "p-0 h-[40px]",
                    innerWrapper: "p-0 ",
                    mainWrapper: "p-0 h-[40px]",
                    label: "font-bold",
                }}
            >
                <SelectItem key={"10"} value={10}>
                    10
                </SelectItem>
                <SelectItem key={"20"} value={20}>
                    20
                </SelectItem>
                <SelectItem key={"30"} value={30}>
                    30
                </SelectItem>
            </Select>
        </div>
    );
}

export default AppPagination;
