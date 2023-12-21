import { useCategoryScroll } from "@/hooks/useCategoryScroll";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Key, useState } from "react";

interface Props {
    setSelectedCategory: (e: Key) => void;
    className?: string;
}

function CategorySelector({ setSelectedCategory, className }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { items, hasMore, isLoading, onLoadMore } = useCategoryScroll();

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
        onLoadMore,
    });

    return (
        <Autocomplete
            className={`max-w-[252px] ${className}`}
            variant="bordered"
            isLoading={isLoading}
            aria-label="cateogry selector input"
            defaultItems={items}
            size="sm"
            color="primary"
            radius="sm"
            onSelectionChange={setSelectedCategory}
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
        >
            {(item) => {
                return (
                    <AutocompleteItem
                        key={`${item.id}:${item.name}`}
                        className="capitalize"
                    >
                        {item.name}
                    </AutocompleteItem>
                );
            }}
        </Autocomplete>
    );
}

export default CategorySelector;
