import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import { setTopingCategory, setTopingState } from "@/store/slices/topings";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import StatusSelector from "@/modules/commponents/StatusSelector";
import CategorySelector from "@/modules/commponents/CategorySelector";

export function TopingNameInput() {
    const [value, setValue] = useState(
        useAppSelector(
            (state) => state.toping.toping_management.name,
        ),
    );
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 300);
    useEffect(() => {
        if (shouldUpdate) {
            dispatch(
                setTopingState({
                    type: "UPDATE",
                    data: { name: debounce },
                }),
            );
        }
    }, [debounce]);

    return (
        <Input
            label="Name"
            radius="sm"
            size="sm"
            className="min-w-[150px]"
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

export function TopingPrice() {
    const [price, setPrice] = useState(
        useAppSelector((state) => state.toping.toping_management.price) || 0,
    );
    const [shouldUpdate, setShouldUpdate] = useState(false);

    const dispatch = useAppDispatch();
    const debounce = useDebounce(price, 300);

    useEffect(() => {
        if (shouldUpdate) {
            dispatch(
                setTopingState({
                    type: "UPDATE",
                    data: { price: debounce },
                }),
            );
        }
    }, [debounce]);

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
                onChange={(e) => {
                    if (!shouldUpdate) {
                        setShouldUpdate(true);
                    }
                    setPrice(parseInt(e.target.value));
                }}
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

const TopingStatuses = [
    {
        key: "Draft",
        value: "Draft",
    },
    {
        key: "Published",
        value: "Published",
    },
];
export function TopingStatusSelector() {
    const status = useAppSelector(
        (state) => state.toping.toping_management.status,
    );
    const dispatch = useAppDispatch();
    return (
        <StatusSelector
            items={TopingStatuses}
            label="status"
            selectedKeys={[status]}
            onChange={(e) => {
                if (!e.target.value) return;
                dispatch(
                    setTopingState({
                        type: "UPDATE",
                        data: {
                            status: e.target.value as any,
                        },
                    }),
                );
            }}
        />
    );
}

export function TopingCategorySelector() {
    const dispatch = useAppDispatch();
    return (
        <CategorySelector
            setSelectedCategory={(e) => {
                dispatch(setTopingCategory(JSON.parse(e as any)));
            }}
        />
    );
}
