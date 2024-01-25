import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import AppCheck from "@/modules/commponents/AppCheck";
import CategorySelector from "@/modules/commponents/CategorySelector";
import StatusSelector from "@/modules/commponents/StatusSelector";
import {
    setCurrentProductCategory,
    setProductState,
} from "@/store/slices/product";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function ProductNameInput() {
    const [value, setValue] = useState(
        useAppSelector(
            (state) => state.product.product_management.product_name,
        ),
    );
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 300);
    useEffect(() => {
        if (shouldUpdate) {
            dispatch(
                setProductState({
                    type: "UPDATE",
                    data: { product_name: debounce },
                }),
            );
        }
    }, [debounce]);

    return (
        <Input
            label="Name"
            radius="sm"
            size="sm"
            className="min-w-[150px] max-w-[180px]"
            value={value}
            onChange={(e) => {
                if (!shouldUpdate) {
                    setShouldUpdate(true);
                }
                setValue(e.target.value);
            }}
        />
    );
}

export function ProductDescriptionInput() {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(
        useAppSelector(
            (state) => state.product.product_management.product_description,
        ) || "",
    );
    const [error, setError] = useState("");
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const debounce = useDebounce(value, 300);

    useEffect(() => {
        if (shouldUpdate) {
            dispatch(
                setProductState({
                    type: "UPDATE",
                    data: { product_description: value },
                }),
            );
        }
    }, [debounce]);

    return (
        <Textarea
            placeholder="Enter your description"
            // size="lg"
            radius="sm"
            value={value}
            onChange={(e) => {
                if (e.target.value.length < 120) {
                    setValue(e.target.value);
                    if (error.length > 0) {
                        setError("");
                    }
                } else {
                    setError("limit exceeded");
                }
                if (!shouldUpdate) {
                    setShouldUpdate(true);
                }
            }}
            minRows={4}
            isInvalid={error.length > 1 ? true : false}
            errorMessage={error}
            classNames={{
                base: "h-[90px]",
                label: "hidden",
            }}
        />
    );
}

export function ProductPrice() {
    const { product_price: price } = useAppSelector(
        (state) => state.product.product_management,
    );
    return (
        <div className={`flex`}>
            <Button
                className={`h-[40px]  bg-red-500 rounded-md rounded-r-none text-white`}
                isDisabled
            >
                Price
            </Button>
            <Input
                type="number"
                value={`${price}`}
                radius="none"
                classNames={{
                    base: "w-[100px] h-[40px]",
                    inputWrapper: "rounded-r-md h-[40px]",
                    input: "price-input",
                }}
            />
        </div>
    );
}

export function ProductCheck() {
    const featured = useAppSelector(
        (state) => state.product.product_management.product_featured,
    );
    const dispatch = useAppDispatch();
    return (
        <AppCheck
            text="Featured"
            isSelected={featured}
            onValueChange={(e) =>
                dispatch(
                    setProductState({
                        type: "UPDATE",
                        data: { product_featured: e },
                    }),
                )
            }
        />
    );
}

const productStatuses = [
    {
        key: "Draft",
        value: "Draft",
    },
    {
        key: "Published",
        value: "Published",
    },
];
export function ProductStatusSelector() {
    const status = useAppSelector(
        (state) => state.product.product_management.product_status,
    );
    const dispatch = useAppDispatch();
    return (
        <StatusSelector
            items={productStatuses}
            label="status"
            selectedKeys={[status]}
            onChange={(e) => {
                if (!e.target.value) return;
                dispatch(
                    setProductState({
                        type: "UPDATE",
                        data: {
                            product_status: e.target.value as any,
                        },
                    }),
                );
            }}
        />
    );
}

export function ProductCategorySelector() {
    const dispatch = useAppDispatch();
    const category = useAppSelector(
        (state) => state.product.product_management.product_category,
    );
    return (
        <CategorySelector
            inputValue={category}
            setSelectedCategory={(e) => {
                console.log(e);
                dispatch(setCurrentProductCategory(e as string));
            }}
        />
    );
}
