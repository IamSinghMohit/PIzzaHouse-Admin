import SelectCategory from "@/components/SelectCategory";
import {
    Select,
    SelectItem,
    Card,
    CardBody,
    Input,
    Slider,
} from "@nextui-org/react";
import CreateButton from "@/components/TopBar/CreateButton";
import { memo } from "react";
import { SearchIcon } from "@/icons";
import AppCheck from "@/modules/shared/AppCheck";
import { useTopingContext } from "../context";

function ProductBar() {
    const {
        search,
        setCategory,
        setSearch,
        setSlider,
        slider,
        setShowFeatured,
        showFeatured,
        topingType,
        setTopingType
    } = useTopingContext();
    return (
        <Card className="mb-2" shadow="sm">
            <CardBody className="flex-row justify-between items-end flex-wrap gap-2">
                <div className="flex justify-between gap-4 flex-wrap">
                    <div className="flex flex-col gap-2">
                        <Input
                            placeholder="Search by name"
                            startContent={<SearchIcon />}
                            className="max-w-[300px] sm:w-[290px]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size="sm"
                        />
                        <SelectCategory
                            size="sm"
                            selectedKeys={(e) => setCategory(e as string)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-1">
                        <Select
                            className="w-[160px] items-center ml-1"
                            label="Show"
                            labelPlacement="outside-left"
                            defaultSelectedKeys={["10"]}
                            radius="sm"
                            variant="faded"
                            selectedKeys={[topingType]}
                            onChange={(e) => {
                                if (!e.target.value) return;
                                setTopingType(`${e.target.value}` as any);
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
                        <AppCheck
                            text="Featured(will only show featured)"
                            checked={showFeatured}
                            onValueChange={(e) => setShowFeatured(e)}
                        />
                        <Slider
                            label="Price Range"
                            className="mb-2"
                            onChangeEnd={(e) => setSlider(e as number[])}
                            size="sm"
                            step={1}
                            minValue={0}
                            maxValue={20000}
                            defaultValue={slider}
                            formatOptions={{
                                style: "currency",
                                currency: "INR",
                            }}
                        />
                    </div>
                </div>
                <CreateButton buttonText="Create Toping" />
            </CardBody>
        </Card>
    );
}

export default memo(ProductBar);
