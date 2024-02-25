import { useCategoryScroll } from "@/hooks/useCategoryScroll";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Key, useState } from "react";

export type TCategorySelectorPayload = {
    id: string;
    name: string;
    isSectionExists: boolean;
};

interface Props {
    setSelectedCategory: (e: Key) => void;
    className?: string;
    inputValue?: string;
}

function CategorySelector({
    setSelectedCategory,
    className,
    inputValue,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { items, hasMore, isLoading, onLoadMore } = useCategoryScroll();

    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false, 
        onLoadMore,
    });

    return (
        <Autocomplete
            className={`max-w-[252px] ${className} normal-case`}
            variant="bordered"
            isLoading={isLoading}
            placeholder="Category"
            aria-label="cateogry selector input"
            defaultItems={items}
            shouldCloseOnBlur={true}
            defaultInputValue={inputValue}
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
                        key={JSON.stringify({
                            id: item.id,
                            name: item.name,
                            isSectionExists: item.sections.length > 0,
                        } as TCategorySelectorPayload)}
                    >
                        {item.name}
                    </AutocompleteItem>
                );
            }}
        </Autocomplete>
    );
}

export default CategorySelector;
