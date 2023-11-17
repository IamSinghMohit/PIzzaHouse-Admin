import { AttributeSchemaType } from "@/modules/category/schema";
import {
    useEffect,
    useRef,
    useMemo,
    forwardRef,
    useImperativeHandle,
    Ref,
    Dispatch,
    SetStateAction,
} from "react";
import { Input, Chip } from "@nextui-org/react";
import { PriceAttributesState } from "../schema";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setProductAttributeState } from "@/store/features/productSlice";

interface Props {
    data: AttributeSchemaType;
    showError: boolean;
    setShowError:Dispatch<SetStateAction<boolean>>
}
export type InputMapperRefType = {
    price: React.MutableRefObject<PriceAttributesState[]>;
};

function InputMapper({ data, showError ,setShowError}: Props, ref: Ref<InputMapperRefType>) {
    const InputRef = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const inputIdArrayRef = useRef<Array<string>>([]);
    // const memoizedData = useMemo(() => data, [data]);
    const priceRef = useRef<PriceAttributesState[]>([]);
    const dispatch = useAppDispatch()
    const {product_attributes} = useAppSelector((state) => state.product)

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
        blockId: number,
        attId: number
    ) {
        if(showError){
           setShowError(false) 
        }
        dispatch(setProductAttributeState())
        priceRef.current[paIndex].attributes[attIndex].value = parseInt(
            e.target.value
        );
    }

    useEffect(() => {
        InputRef.current[inputIdArrayRef.current[0]]?.focus();
    }, [data[0]]);

    useImperativeHandle(
        ref,
        () => {
            return { price: priceRef};
        },
        []
    );

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:w-full lg:gap-5 lg:flex-col my-1">
            {product_attributes.map((d, blockIndex) => {
                // after mapping on main category array
                priceRef.current[blockIndex] = {
                    attribute_title: d.attribute_title,
                    attributes: [],
                };
                return (
                    <div className="flex gap-3 flex-col" key={d.id}>
                        <h1 className="font-bold">{d.attribute_title} :</h1>
                        <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
                            {/* mapping inside attribute sub array of main category array */}

                            {d.attributes.map((a, attIndex) => {
                                // important refs on for navigating between input and another controlling the price
                                inputIdArrayRef.current.push(a.id);
                                priceRef.current[blockIndex].attributes.push({
                                    title: a.title,
                                    value:0,
                                    error: false,
                                });
                                return (
                                    <div className="flex" key={a.id}>
                                        <Chip className="h-[40px] bg-primaryOrange text-white rounded-none rounded-l-md pl-2 border-2 border-darkOrange">
                                            {a.title}
                                        </Chip>
                                        <Input
                                            type="number"
                                            radius="none"
                                            ref={(e) => {
                                                InputRef.current[a.id] = e;
                                            }}
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, a.id)
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    blockIndex,
                                                    attIndex
                                                    )
                                            }
                                            classNames={{
                                                base: "w-[100px] h-[40px]",
                                                inputWrapper:
                                                    "rounded-r-md h-[40px]",
                                            }}
                                            isInvalid={
                                                showError && !InputRef.current[a.id]?.value
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default forwardRef(InputMapper);
