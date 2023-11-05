import CategoryTable from "./components/CategoryTable";
import { Card, CardBody } from "@nextui-org/react";
import SearchCategory from "./components/SearchCategory";
import CreateButton from "@/components/TopBar/CreateButton";

interface Props {}

function Category({}: Props) {
    return (
        <>
            <Card className="mb-2" shadow="sm">
                <CardBody className="flex-row justify-between gap-2 flex-wrap">
                    <SearchCategory />
                    <CreateButton buttonText="Create Category" />
                </CardBody>
            </Card>
            <CategoryTable />
        </>
    );
}

export default Category;
