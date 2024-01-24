import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Chip,
    Divider,
} from "@nextui-org/react";
import { DeleteIcon } from "@/icons";
import { TCategorySection } from "@/store/slices/category/types";

interface IProps {
    renderDeleteButton?: boolean;
    categoryPriceSec: TCategorySection[];
    onDelete?: (sec: TCategorySection) => void;
}

function CategoryPriceSectionRenderer({
    renderDeleteButton = true,
    categoryPriceSec,
    onDelete,
}: IProps) {
    return categoryPriceSec.map((sec) => (
        <Card
            shadow="sm"
            className="max-w-[400px] w-full mx-auto lg:mx-0 lg:min-w-[350px] xl:w-full border-1 border-darkOrange"
            key={sec.id}
        >
            <CardHeader className="flex gap-2 p-0 justify-between bg-primaryOrange text-lg uppercase text-white">
                <div className="flex m-1 justify-between w-full items-center text-[14px] lg:text-[16px]">
                    <span className="ml-2">{sec.name}</span>
                    {renderDeleteButton && (
                        <Button
                            className="rounded-lg text-white text-lg bg-darkOrange p-[5px]"
                            isIconOnly
                            onClick={() => {
                                if (onDelete) {
                                    onDelete(sec);
                                }
                            }}
                        >
                            {<DeleteIcon />}
                        </Button>
                    )}
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-2 flex-wrap flex-row gap-2">
                {sec.attributes.map((att) => (
                    <Chip
                        key={att.id}
                        classNames={{
                            base: "my-1 text-white bg-primaryOrange text-[12px] lg:text-[16px]",
                            closeButton: "text-2xl text-red-800",
                        }}
                        radius="sm"
                    >
                        {att.name}
                    </Chip>
                ))}
            </CardBody>
        </Card>
    ));
}

export default CategoryPriceSectionRenderer;
/*
    const dispatch = useAppDispatch();
    const category_price_sec = useAppSelector(
        (state) => state.category.category_price_sec,
        shallowEqual,
    );

    function handleDeleteSection(id: string) {
        dispatch(deletePriceSection(id));
    }
 */
