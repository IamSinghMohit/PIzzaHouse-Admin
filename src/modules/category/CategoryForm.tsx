import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import { setCategoryName } from "@/store/slices/category";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function CategoryInput() {
    const [value, setValue] = useState(
        useAppSelector(
            (state) => state.category.current_selected_category?.name,
        ) || "",
    );
    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 300);

    useEffect(() => {
        dispatch(setCategoryName(debounce));
    }, [debounce]);

    return (
        <Input
            label="Name"
            radius="sm"
            size="sm"
            className="w-[200px]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
