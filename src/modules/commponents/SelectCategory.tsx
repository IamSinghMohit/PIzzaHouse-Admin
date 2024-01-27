import { Select, SelectItem } from "@nextui-org/react";
import { useCategoryScroll } from "@/hooks/useCategoryScroll";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";

interface Props {
    selectedKeys: (e: string) => void;
    size: "sm" | "md" | "lg";
    baseClassName?: string;
    className?: string;
    isInvalid?:boolean;
}

function SelectCategory({
    selectedKeys,
    size,
    baseClassName,
    className,
    isInvalid
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { items, hasMore, isLoading, onLoadMore } = useCategoryScroll();

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore,
    });

    return (
        <Select
            isLoading={isLoading}
            size={size}
            items={items}
            placeholder="category"
            aria-label="category"
            className={className}
            isInvalid={isInvalid}
            scrollRef={scrollerRef}
            onChange={(e) => selectedKeys(e.target.value)}   
            classNames={{
                base: baseClassName,
                selectorIcon: "text-primaryOrange",
                spinner: "text-primaryOrange",
            }}
            onOpenChange={setIsOpen}
        >
            {(cat) => <SelectItem key={`${cat.name}:${cat.id}`}>{cat.name}</SelectItem>}
        </Select>
    );
}

export default SelectCategory;
