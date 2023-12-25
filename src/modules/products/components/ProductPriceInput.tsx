import useDebounce from "@/hooks/useDebounce";
import {
    setDefaultProductPrices,
    setProductPriceSectionAttribute,
} from "@/store/slices/product";
import { Badge, Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useProductContext } from "../context";
import { useAppDispatch, useAppSelector } from "@/hooks/state";

interface Props {
    attribute: {
        id: string;
        name: string;
    };
    section: string;
}

function ProductPriceInput({ attribute, section }: Props) {
    const data = useAppSelector(
        (state) => state.product.product_price_section_attribute[attribute.id],
    );
    const isDefault = useAppSelector((state) => {
        const is = state.product.default_prices[section]?.id === attribute.id;
        return is;
    });
    const [inputValue, setInputValue] = useState("");
    const [shouldChange, setShouldChange] = useState(false);
    const shouldChangeRef = useRef(true);
    const dispatch = useAppDispatch();
    const debounce = useDebounce(inputValue, 350);
    const { InputRef, inputIdArrayRef } = useProductContext();

    useEffect(() => {
        if (shouldChangeRef.current) {
            if (data) {
                setInputValue(data.value);
                shouldChangeRef.current = false;
            }
        }
    }, [data]);

    useEffect(() => {
        if (shouldChange) {
            dispatch(
                setProductPriceSectionAttribute({
                    type: "UPDATE",
                    data: {
                        [attribute.id]: {
                            ...data,
                            value: debounce,
                        },
                    },
                }),
            );
        }
    }, [debounce]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            const index = inputIdArrayRef.current.findIndex(
                (inputId) => inputId == attribute.id,
            );
            const inputs = [...inputIdArrayRef.current].slice(
                (index + 1) % inputIdArrayRef.current.length,
            );
            const input = InputRef.current[inputs[0]];
            input?.focus();
        }
    }
    return (
        data && (
            <Badge
                content="Default"
                isInvisible={!isDefault}
                color="primary"
                className="border-darkOrange mr-3"
                placement="top-right"
            >
                <div className="flex">
                    <Button
                        className={`h-[40px] text-white rounded-none rounded-l-md pl-2 border-2 ${
                            !isDefault
                                ? "border-darkOrange bg-primaryOrange"
                                : "border-red-700 bg-red-500"
                        }`}
                        onPress={() => {
                            console.log("called here");
                            dispatch(
                                setDefaultProductPrices({
                                    type: "UPDATE",
                                    data: {
                                        id: attribute.id,
                                        name: attribute.name,
                                        section: section,
                                    },
                                }),
                            );
                        }}
                    >
                        {attribute.name}
                    </Button>
                    <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => {
                            if (data.error) {
                                dispatch(
                                    setProductPriceSectionAttribute({
                                        type: "UPDATE",
                                        data: {
                                            [attribute.id]: {
                                                ...data,
                                                error: false,
                                            },
                                        },
                                    }),
                                );
                            }
                            if (!shouldChange) {
                                setShouldChange(true);
                            }
                            setInputValue(e.target.value);
                        }}
                        radius="none"
                        classNames={{
                            base: "w-[100px] h-[40px]",
                            inputWrapper: "rounded-r-md h-[40px]",
                        }}
                        isInvalid={data.error}
                        onKeyDown={handleKeyDown}
                        ref={(e) => {
                            inputIdArrayRef.current.push(attribute.id);
                            InputRef.current[attribute.id] = e;
                        }}
                    />
                </div>
            </Badge>
        )
    );
}

export default ProductPriceInput;
