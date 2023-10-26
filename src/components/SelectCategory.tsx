import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useCategory } from "@/modules/category/hooks/useCategory";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import useCategoryAttributes from "@/modules/category/hooks/useCategoryAttributes";

interface Props {
    setValue: Dispatch<SetStateAction<string>>;
    value:string
    size: "sm" | "md" | "lg";
    baseClassName?: string;
    className?:string;
}

function SelectCategory({ setValue,value, size, baseClassName ,className}: Props) {
    const { data = [] } = useCategory();
    useCategoryAttributes(value)

    return (
        <Select
            size={size}
            placeholder="category"
            aria-label="category"
            className={className}
            onChange={(e) => setValue(e.target.value)}
            classNames={{
                base: baseClassName,
            }}
        >
            {data.map((cat) => (
                <SelectItem key={cat.id}>{cat.name}</SelectItem>
            ))}
        </Select>
    );
}

export default SelectCategory;
