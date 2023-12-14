import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Chip,
    Divider,
} from "@nextui-org/react";
import { deletePriceSection } from "@/store/features/categorySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import { DeleteIcon } from "@/icons";
import { shallowEqual } from "react-redux";

function RenderCateogryPriceSection() {
    const dispatch = useAppDispatch();
    const  category_price_sec  = useAppSelector((state) => state.category.category_price_sec,shallowEqual)

    function handleDeleteSection(id: string) {
        dispatch(deletePriceSection(id));
    }


    return category_price_sec.map((sec) => (
        <Card
            shadow="sm"
            className="max-w-[400px] w-full mx-auto lg:mx-0 lg:min-w-[350px] xl:w-full border-1 border-darkOrange"
            key={sec.id}
        >
            <CardHeader className="flex gap-2 p-0 justify-between bg-primaryOrange text-lg uppercase text-white">
                <div className="flex m-1 justify-between w-full items-center text-[14px] lg:text-[16px]">
                    <span className="ml-2">{sec.title}</span>
                    <Button
                        className="rounded-lg text-white text-lg bg-darkOrange p-[5px]"
                        isIconOnly
                        onClick={() => handleDeleteSection(sec.id)}
                    >
                        {<DeleteIcon />}
                    </Button>
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
                        {att.title}
                    </Chip>
                ))}
            </CardBody>
        </Card>
    ));
}

export default  RenderCateogryPriceSection;
