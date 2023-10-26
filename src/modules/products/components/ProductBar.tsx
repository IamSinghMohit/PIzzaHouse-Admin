import SelectCategory from "@/components/SelectCategory";
import { Switch, Selection, Card, CardBody } from "@nextui-org/react";
import SearchField from "@/components/TopBar/SearchField";
import CreateButton from "@/components/TopBar/CreateButton";
import { useState } from "react";
interface Props {}

function ProductBar({}: Props) {
    const [category, setCategory] = useState<Selection>(new Set([]));
    console.log(category);
    return (
        <Card className="mb-2" shadow="sm">
            <CardBody>
                <div className="flex flex-col justify-between gap-2 md:flex-row">

                    <div className="flex flex-col gap-2 lg:flex-row lg:w-2/3">
                        <SearchField
                            baseClassName="h-[45px] max-w-[350px] w-full"
                            inputClassName="w-full"
                        />
                        <SelectCategory
                            size="sm"
                            setValue={setCategory}
                            baseClassName="max-w-[350px] h-[45px] lg:w-[240px]"
                        />
                    </div>
                    <div className="flex justify-between gap-2 md:flex-col lg:flex-row lg:w-auto">
                        <Switch
                            size="sm"
                            classNames={{
                                label: "text-[12px] text-primaryOrange lg:text-sm",
                            }}
                        >
                            Show Only Published
                        </Switch>
                        <CreateButton buttonText="Create Product" />
                    </div>

                </div>
            </CardBody>
        </Card>
    );
}

export default ProductBar;
