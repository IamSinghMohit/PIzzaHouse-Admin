import { useEffect, useState } from "react";
import AppTable from "@/components/Table";
import { CategoryColumns } from "@/data/cateogry-table";
import { useCategory } from "../../hooks/useCategory";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { CategorySchemaType } from "../../schema";
import ViewCategory from "../ViewCategory";
import DeleteAlart from "@/components/DeleteAlert";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    setCurrentSelectedCategory,
    setTotalPages,
} from "@/store/features/categorySlice";
import { errorToast } from "@/lib/toast";
import { Pagination, Select, SelectItem } from "@nextui-org/react";

interface Props {}

function SearchCategoryTable({}: Props) {
    const [page, setPage] = useState(1);

    const [selected, setSelected] = useState("10");
    const { mutate } = useDeleteCategory();
    const { current_selected_category: category, total_pages } = useAppSelector(
        (state) => state.category
    );
    const {
        fetchedCategories,
        startedSearching,
        isLoading: searchCategoryLoading,
    } = useAppSelector((state) => state.search.categories);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleSetCategory(cat: CategorySchemaType) {
        dispatch(setCurrentSelectedCategory(cat));
    }

    function handleDelete() {
        if (!category) return;
        const { id } = category;
        const url = category.image.split("/");
        const image = url[url.length - 1].split(".")[0];
        mutate({ id, image });
    }

    useEffect(() => {
        if (isError) {
            errorToast("Some error while fetching categories");
        }
    }, [isError]);

    useEffect(() => {
        if (total_pages == 1 && data?.pages) {
            dispatch(setTotalPages(data?.pages));
        }
    }, [data]);


    return (
        <>
            <AppTable
                columns={CategoryColumns}
                emptyContent={
                    isError
                        ? "Some server occured ❌"
                        : "No Category found create 🔥 one!"
                }
                isLoading={searchCategoryLoading || isLoading}
                classsName="screen"
                data={startedSearching ? fetchedCategories : data?.data || []}
                onDeleteClick={(cat) => {
                    handleSetCategory(cat);
                    setDeleteModalOpen(true);
                }}
                onEditClick={(cat) => {
                    handleSetCategory(cat);
                    navigate(`update`);
                }}
                onViewClick={(cat) => {
                    handleSetCategory(cat);
                    setViewModalOpen(true);
                }}
                bottomContent={
                    <div className="flex items-center gap-1">
                        <Pagination
                            className="w-full"
                            total={total_pages}
                            page={page}
                            onChange={setPage}
                            isCompact
                            showControls
                            showShadow
                        />
                        <Select
                            className="w-[140px] items-center"
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
                }
            />
            <DeleteAlart
                onClose={() => setDeleteModalOpen(false)}
                open={deleteModalOpen}
                text={`Are you sure you want to delte ${category?.name} category`}
                onNoPress={() => setDeleteModalOpen(false)}
                onYesPress={handleDelete}
            />
            <ViewCategory
                open={viewModalOpen}
                setModalOpen={setViewModalOpen}
            />
        </>
    );
}

export default SearchCategoryTable;
