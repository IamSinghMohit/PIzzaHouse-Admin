import { Card, CardBody, Button } from "@nextui-org/react";
import { useRef } from "react";
import { IconRowInsertBottom } from "@tabler/icons-react";
import { TModalRef } from "@/types/Modal";
import SearchCategoryInput from "./SearchCategoryInput";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import CreateCategoryModal from "./modals/CreateCategoryModal";

function SearchBar() {
    const ModalRef = useRef<TModalRef | null>(null);
    const shouldDirect = useMediaQuery({ query: "(max-width:750px)" });
    const navigate = useNavigate();
    return (
        <Card className="mb-2" shadow="sm" radius="sm">
            <CardBody className="flex-row justify-between gap-2 items-center flex-wrap">
                <SearchCategoryInput />
                <Button
                    radius="sm"
                    endContent={<IconRowInsertBottom />}
                    className="bg-primaryOrange text-white"
                    onPress={() => {
                        if (shouldDirect) {
                            navigate("create");
                        } else {
                            ModalRef.current?.onOpen();
                        }
                    }}
                >
                    Create Category
                </Button>
                <CreateCategoryModal ref={ModalRef}/>
            </CardBody>
        </Card>
    );
}

export default SearchBar;
