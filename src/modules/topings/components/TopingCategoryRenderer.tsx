import { useAppDispatch, useAppSelector } from "@/hooks/state";
import {
    removeFromTopingCategories,
} from "@/store/slices/topings";
import { Chip } from "@nextui-org/react";

type Props = {
    className?: string;
};

function TopingCategoryRenderer({ className }: Props) {
    const dispatch = useAppDispatch();
    const categoriesMap = useAppSelector((state) => state.toping.categories);
    const categories = Object.keys(categoriesMap);

    function handleClose(cat: string) {
        dispatch(removeFromTopingCategories(cat));
    }

    return (
        <div
            className={`border p-2 rounded-lg flex flex-wrap gap-2 w-full overflow-y-scroll h-[100px] ${className}`}
        >
            {categories.map((cat) => (
                <Chip
                    key={cat}
                    classNames={{
                        base: "my-1 text-white bg-primaryOrange font-bold text-[12px] lg:text-[16px]",
                        closeButton: "text-2xl text-red-800",
                    }}
                    onClose={() => handleClose(cat)}
                    radius="sm"
                >
                    {cat}
                </Chip>
            ))}
        </div>
    );
}

export default TopingCategoryRenderer;
