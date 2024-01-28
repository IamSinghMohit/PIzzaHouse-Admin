import { useAppDispatch, useAppSelector } from "@/hooks/state";
import useDebounce from "@/hooks/useDebounce";
import CategorySelector from "@/modules/commponents/CategorySelector";
import SearchInput from "@/modules/commponents/SearchInput";
import StatusSelector from "@/modules/commponents/StatusSelector";
import { setTopingFetchingStates } from "@/store/slices/topings";
import { TModalRef } from "@/types/Modal";
import { Card, CardBody, Button, Slider } from "@nextui-org/react";
import { IconCubePlus } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import TopingModal from "./modals/TopingModal";
import { useTopingStats } from "../hooks/useTopingStats";

function TopingSearchInput() {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const debounce = useDebounce(value, 400);
    useEffect(() => {
        dispatch(
            setTopingFetchingStates({
                name: value,
            }),
        );
    }, [debounce]);

    return (
        <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
    );
}

function TopingPriceRange() {
    const dispatch = useAppDispatch();
    const { data } = useTopingStats();
    const range = useAppSelector((state) => state.toping.fetching_states.range);

    useEffect(() => {
        if (data) {
            dispatch(setTopingFetchingStates({ range: [0, data.max_price] }));
        }
    }, [data]);

    return (
        <Slider
            label="Price"
            className="mb-2"
            onChangeEnd={(e) =>
                dispatch(
                    setTopingFetchingStates({ range: e as [number, number] }),
                )
            }
            size="sm"
            step={1}
            minValue={0}
            defaultValue={range}
            maxValue={data?.max_price || 10}
            formatOptions={{
                style: "currency",
                currency: "INR",
            }}
        />
    );
}

function FetchingCategorySelector() {
    const dispatch = useAppDispatch();
    return (
        <CategorySelector
            setSelectedCategory={(e) => {
                dispatch(
                    setTopingFetchingStates({
                        category: JSON.parse(e as any)?.name || "",
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
export function FetchingTopingStatusSelector() {
    const status = useAppSelector(
        (state) => state.toping.fetching_states.status,
    );
    const dispatch = useAppDispatch();
    return (
        <StatusSelector
            onChange={(e) => {
                if (!e.target.value) return;
                dispatch(
                    setTopingFetchingStates({
                        status: e.target.value as any,
                    }),
                );
            }}
            label="Show"
            selectedKeys={[status]}
            items={statuses}
        />
    );
}

function TopingBar() {
    const ModalRef = useRef<TModalRef | null>(null);
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between">
                <div className="flex gap-8 ">
                    <div className="flex flex-col gap-2">
                        <TopingSearchInput />
                        <FetchingCategorySelector />
                    </div>
                    <div className="flex gap-2 flex-col w-[250px]">
                        <FetchingTopingStatusSelector />
                        <TopingPriceRange />
                    </div>
                </div>
                <Button
                    color="primary"
                    className="text-white"
                    radius="sm"
                    endContent={<IconCubePlus />}
                    onPress={() => ModalRef.current?.onOpen()}
                >
                    Create Toping
                </Button>
                <TopingModal type="Create" ref={ModalRef} />
            </CardBody>
        </Card>
    );
}

export default TopingBar;
