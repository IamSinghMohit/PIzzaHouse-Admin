import { useEffect, useRef, Dispatch, SetStateAction, memo } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/hooks/state";
import { createSelector } from "@reduxjs/toolkit";
import {
    setDefaultPriceInputs,
    setProductAttributeState,
    setProductState,
} from "@/store/features/productSlice";
import PriceInput from "../../../shared/PriceInput";
import { ProductSubAttributesType } from "@/types/slice/Product";

interface Props {
    showError: boolean;
    setShowError: Dispatch<SetStateAction<boolean>>;
}
const ProductAttributes = createSelector(
    [(state:RootState) => state.product.product_attributes],
    (att) => att
);

function InputMapper({ showError, setShowError }: Props) {
    const InputRef = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const inputIdArrayRef = useRef<Array<string>>([]);
    const dispatch = useAppDispatch();
    const { product_management, default_prices } =
        useAppSelector((state) => state.product);
    const product_attributes = useAppSelector(ProductAttributes)
    

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        id: string
    ) {
        if (e.key === "Enter") {
            const index = inputIdArrayRef.current.findIndex(
                (inputId) => inputId == id
            );
            const inputs = [...inputIdArrayRef.current].slice(
                (index + 1) % inputIdArrayRef.current.length
            );
            e.preventDefault();
            const input = InputRef.current[inputs[0]];
            input?.focus();
        }
    }

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement>,
        blockId: string,
        attId: string
    ) {
        const price = parseInt(e.target.value);
        if (showError) {
            setShowError(false);
        }
        dispatch(
            setProductAttributeState({
                attId,
                blockId,
                data: { value: price },
            })
        );
    }

    function handleChipClick(
        value: string | undefined,
        att: ProductSubAttributesType,
        blockTitle: string
    ) {
        const inputValue = parseInt(value!);
        if (inputValue) {
            dispatch(setDefaultPriceInputs({ [blockTitle]: att.title }));
            InputRef.current[att.id]?.focus();
        }
    }

    useEffect(() => {
        let price = 0;
        for (const value in default_prices) {
            console.log(value, default_prices[value]);
            product_attributes.forEach((block) => {
                if (block.attribute_title == value) {
                    block.attributes.forEach((attributes) => {
                        if (attributes.title == default_prices[value]) {
                            price += attributes.value!;
                        }
                    });
                }
            });
        }

        dispatch(
            setProductState({
                product_price: price,
            })
        );

        // Assuming InputRef is a ref to a DOM element you want to focus
    }, [default_prices, product_attributes]);

    useEffect(() => {
        InputRef.current[inputIdArrayRef.current[0]]?.focus();
    }, []);

    return (
        <div className="max-w-[980px] mt-2">
            {product_attributes.map((d) => {
                return (
                    <div className="flex gap-1 flex-col mt-1" key={d.id}>
                        <h1 className="font-bold">{d.attribute_title} :</h1>
                        <div className="flex gap-2 lg:gap-3 flex-wrap">
                            {/* mapping inside attribute sub array of main category array */}
                            {d.attributes.map((a) => {
                                // important refs on for navigating between input and another controlling the price
                                inputIdArrayRef.current.push(a.id);
                                return (
                                    <PriceInput
                                        onClick={() =>
                                            handleChipClick(
                                                InputRef.current[a.id]?.value,
                                                a,
                                                d.attribute_title
                                            )
                                        }
                                        isDeafult={
                                            default_prices[d.attribute_title] ==
                                            a.title
                                        }
                                        isInvalid={
                                            showError &&
                                            !InputRef.current[a.id]?.value
                                        }
                                        key={a.id}
                                        onChange={(e) =>
                                            handleInputChange(e, d.id, a.id)
                                        }
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, a.id)
                                        }
                                        refCb={(e) => {
                                            InputRef.current[a.id] = e;
                                        }}
                                        title={a.title}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            <div className="flex flex-col gap-1 mt-4 font-bold">
                <span>Default(Original price)</span>
                <PriceInput
                    title="Price"
                    className="border-primaryOrange border-3 rounded-lg"
                    chipClass="bg-red-500  border-red-700"
                    onChange={(e) => {
                        if (product_attributes.length != 0) return;
                        dispatch(
                            setProductState({
                                product_price: parseInt(e.target.value),
                            })
                        );
                    }}
                    value={product_management.product_price.toString()}
                />
            </div>
        </div>
    );
}

export default memo(InputMapper);
