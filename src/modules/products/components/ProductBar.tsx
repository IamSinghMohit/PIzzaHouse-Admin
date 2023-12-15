import { Select, SelectItem, Card, CardBody, Slider } from "@nextui-org/react";
import CreateButton from "@/components/TopBar/CreateButton";
import { memo, useState } from "react";
import AppCheck from "@/modules/shared/AppCheck";
import CategorySelector from "@/modules/shared/CategorySelector";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { setProductFetchingStates } from "@/store/features/productSlice";
import SearchInput from "@/components/SearchInput";

function ProductSearchInput() {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    const handleSearchClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(
                setProductFetchingStates({
                    product_name: value,
                })
            );
        }
    };

    return (
        <SearchInput
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            className="flex-grow"
            containerClassName="w-[253px]"
            onKeyDown={handleSearchClick}
            onButtonPress={handleSearchClick}
        />
    );
}

function ProductStatusSelector() {
    const status = useAppSelector(
        (state) => state.product.fetching_states.product_status
    );
    const dispatch = useAppDispatch();
    return (
        <Select
            className="w-[160px] items-center ml-1"
            color="primary"
            label="Show"
            labelPlacement="outside-left"
            radius="sm"
            variant="faded"
            selectedKeys={[status]}
            onChange={(e) => {
                if (!e.target.value) return;
                dispatch(
                    setProductFetchingStates({
                        product_status: e.target.value as any,
                    })
                );
            }}
            classNames={{
                selectorIcon: "text-primaryOrange",
                base: "p-0 h-[40px]",
                innerWrapper: "p-0 ",
                mainWrapper: "p-0 h-[40px]",
                label: "font-bold",
            }}
        >
            <SelectItem key={"All"} value={"All"}>
                All
            </SelectItem>
            <SelectItem key={"Published"} value={"Published"}>
                Published
            </SelectItem>
            <SelectItem key={"Draft"} value={"Draft"}>
                Draft
            </SelectItem>
        </Select>
    );
}

function ProductCategorySelector() {
    const current = useAppSelector(
        (state) => state.product.fetching_states.current_selected_category
    );
    const dispatch = useAppDispatch();
    return (
        <CategorySelector
            selectedCategory={current}
            setSelectedCategory={(e) =>
                dispatch(
                    setProductFetchingStates({
                        current_selected_category: e as string,
                    })
                )
            }
        />
    );
}

function ProductPriceRange() {
    const range = useAppSelector(
        (state) => state.product.fetching_states.range
    );
    const dispatch = useAppDispatch();
    return (
        <Slider
            label="Price"
            className="mb-2 w-[200px]"
            onChangeEnd={(e) =>
                dispatch(
                    setProductFetchingStates({ range: e as [number, number] })
                )
            }
            size="sm"
            step={1}
            minValue={0}
            maxValue={20000}
            defaultValue={range}
            formatOptions={{
                style: "currency",
                currency: "INR",
            }}
        />
    );
}
function ProductCheck() {
    const featured = useAppSelector(
        (state) => state.product.fetching_states.featured_status
    );
    const dispatch = useAppDispatch();
    return (
        <AppCheck
            text="Featured"
            checked={featured}
            onValueChange={(e) =>
                dispatch(setProductFetchingStates({ featured_status: e }))
            }
        />
    );
}

function ProductBar() {
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between">
                {/* <div className="flex gap-8 ">
                    <div className="flex flex-col gap-2"> */}
                        <ProductSearchInput />
                        <ProductCategorySelector />
                    {/* </div>
                    <div className="flex items-start gap-3">
                        <div className="flex flex-col gap-2"> */}
                            <ProductStatusSelector />
                            <ProductPriceRange />
                        {/* </div> */}
                        <ProductCheck />
                    {/* </div> */}
                {/* </div> */}
                <CreateButton buttonText="Create Product" />
            </CardBody>
        </Card>
    );
}

export default memo(ProductBar);
