import { Card, CardBody, Button } from "@nextui-org/react";
import { useRef } from "react";
import { IconRowInsertBottom } from "@tabler/icons-react";
import { TModalRef } from "@/types/Modal";
import CategoryModal from "./modals/CategoryModal";
import SearchCategoryInput from "./SearchCategoryInput";

function SearchBar() {
    const ModalRef = useRef<TModalRef | null>(null);
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between gap-2 items-center flex-wrap">
                <SearchCategoryInput />
                <Button
                    radius="sm"
                    endContent={<IconRowInsertBottom />}
                    className="bg-primaryOrange text-white"
                    onPress={() => ModalRef.current?.onOpen()}
                >
                    Create Category
                </Button>
                <CategoryModal type="Create" ref={ModalRef} />
            </CardBody>
        </Card>
    );
}

export default SearchBar;
