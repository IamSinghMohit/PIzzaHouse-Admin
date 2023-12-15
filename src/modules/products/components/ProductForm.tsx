import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import { setProductState } from "@/store/features/productSlice";
import { Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function ProductNameInput() {
    const [value, setValue] = useState("");
    const productName = useAppSelector(
        (state) => state.product.current_selected_product?.name
    );
    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 300);

    useEffect(() => {
        if (debounce) {
            dispatch(setProductState({ product_description: debounce }));
        }
    }, [debounce]);

    return (
        <Input
            label="Name"
            radius="sm"
            size="sm"
            className="w-[200px]"
            value={value ? value : productName}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export function ProductDescriptionInput() {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState("");
    const debounce = useDebounce(value, 300);
    const productDescription = useAppSelector(
        (state) => state.product.current_selected_product?.description
    );

    useEffect(() => {
        if (debounce) {
            dispatch(setProductState({ product_description: value }));
        }
    }, [debounce]);

    return (
        <Textarea
            placeholder="Enter your description"
            size="lg"
            value={value ? value : productDescription}
            onChange={(e) => {
                if (e.target.value.length < 120) {
                    setValue(e.target.value);
                }
            }}
            minRows={4}
            // isInvalid={showError && !product_management.product_description}
            classNames={{
                base: "max-w-xs h-full",
                label: "hidden",
            }}
        />
    );
}
