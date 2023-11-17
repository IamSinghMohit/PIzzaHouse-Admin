import SelectCategory from "@/components/SelectCategory";
import { Switch,  Card, CardBody ,Input} from "@nextui-org/react";
import CreateButton from "@/components/TopBar/CreateButton";
import { useState } from "react";
interface Props {}

function ProductBar({}: Props) {
    const [category, setCategory] = useState('');
    const [search,setSearched] = useState('')

    return (
        <Card className="mb-2" shadow="sm">
            <CardBody>
                <div className="flex flex-col justify-between gap-2 md:flex-row">

                    <div className="flex flex-col gap-2 lg:flex-row lg:w-2/3">
                    {/* <Input
                        placeholder="Search by name"
                        startContent={<SearchIcon />}
                        className="max-w-[300px] sm:w-[290px]"
                        value={search}
                        onChange={handleSearching}
                        size="sm"
                    /> */}
                        <SelectCategory
                            size="sm"
                            className="w-[200px]"
                            selectedKeys={setCategory}
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
