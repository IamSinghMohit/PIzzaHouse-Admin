import CategoryTable from "./components/CategoryTable";
import { Card, CardBody } from "@nextui-org/react";
import SearchCategory from "./components/SearchCategory";
import CreateButton from "@/components/TopBar/CreateButton";
import { useAppDispatch } from "@/hooks/state";
import { setPriceAttribute } from "@/store/features/categorySlice";

interface Props {}

function Category({}: Props) {
    const dispatch = useAppDispatch()
    return (
        <>
            <Card className="mb-2" shadow="sm">
                <CardBody className="flex-row justify-between gap-2 flex-wrap">
                    <SearchCategory />
                    <CreateButton buttonText="Create Category" onPress={() => dispatch(setPriceAttribute((_) => []))}/>
                </CardBody>
            </Card>
            <CategoryTable />
        </>
    );
}

export default Category;
