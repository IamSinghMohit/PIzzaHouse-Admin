import { Card, CardBody, Button, Slider } from "@nextui-org/react";
import { IconCodePlus } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";
import { TModalRef } from "@/types/Modal";
import ProductModal from "./modal/ProductModal";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setProductFetchingStates } from "@/store/slices/product";
import AppCheck from "@/modules/commponents/AppCheck";
import CategorySelector from "@/modules/commponents/CategorySelector";
import StatusSelector from "@/modules/commponents/StatusSelector";
import useDebounce from "@/hooks/useDebounce";
import { IconSearch } from "@tabler/icons-react";
import { useProductStats } from "../hooks/useProductStats";
import SearchInput from "@/modules/commponents/SearchInput";

export function ProductSearchInput() {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 400);
    useEffect(() => {
        if (debounce) {
            dispatch(
                setProductFetchingStates({
                    product_name: value,
                }),
            );
        }
    }, [debounce]);

    return <SearchInput value={value} onChange={(e) => setValue(e.target.value)}/>;
}

export function ProductPriceRange() {
    const { data } = useProductStats();

    const range = useAppSelector(
        (state) => state.product.fetching_states.range,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data) {
            dispatch(setProductFetchingStates({ range: [0, data.max_price] }));
        }
    }, [data]);

    return (
        <Slider
            label="Price"
            className="mb-2"
            onChangeEnd={(e) =>
                dispatch(
                    setProductFetchingStates({ range: e as [number, number] }),
                )
            }
            size="sm"
            step={1}
            minValue={0}
            maxValue={10 + (data?.max_price || 0)}
            defaultValue={range}
            formatOptions={{
                style: "currency",
                currency: "INR",
            }}
        />
    );
}
function ProductSearchCheck() {
    const featured = useAppSelector(
        (state) => state.product.fetching_states.product_featured,
    );
    const dispatch = useAppDispatch();
    return (
        <AppCheck
            text="Featured"
            isSelected={featured}
            onValueChange={(e) =>
                dispatch(setProductFetchingStates({ product_featured: e }))
            }
        />
    );
}
function FetchingCategorySelector() {
    const dispatch = useAppDispatch();
    return (
        <CategorySelector
            setSelectedCategory={(e) => {
                dispatch(
                    setProductFetchingStates({
                        product_category: e as unknown as string,
                    }),
                );
            }}
        />
    );
}

const statuses = [
    {
        key: "All",
        value: "All",
    },
    {
        key: "Draft",
        value: "Draft",
    },
    {
        key: "Published",
        value: "Published",
    },
];
export function FetchingProductStatusSelector() {
    const status = useAppSelector(
        (state) => state.product.fetching_states.product_status,
    );
    const dispatch = useAppDispatch();
    return (
        <StatusSelector
            onChange={(e) => {
                if (!e.target.value) return;
                dispatch(
                    setProductFetchingStates({
                        product_status: e.target.value as any,
                    }),
                );
            }}
            label="Show"
            selectedKeys={[status]}
            items={statuses}
        />
    );
}

function ProductBar() {
    const ModalRef = useRef<TModalRef | null>(null);
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between">
                <div className="flex gap-8 ">
                    <div className="flex flex-col gap-2">
                        <ProductSearchInput />
                        <FetchingCategorySelector />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <div className="flex gap-2 items-start">
                            <FetchingProductStatusSelector />
                            <ProductSearchCheck />
                        </div>
                        <ProductPriceRange />
                    </div>
                </div>
                <Button
                    color="primary"
                    className="text-white"
                    radius="sm"
                    endContent={<IconCodePlus />}
                    onPress={() => ModalRef.current?.onOpen()}
                >
                    Create Product
                </Button>
                <ProductModal type="Create" ref={ModalRef} />
            </CardBody>
        </Card>
    );
}

export default ProductBar;
