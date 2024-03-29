import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Chip,
} from "@nextui-org/react";
import { DeleteIcon } from "@/icons";
import { TCategorySection } from "@/store/slices/category/types";

interface IProps {
    renderDeleteButton?: boolean;
    priceSections: TCategorySection[];
    onDelete?: (id:string) => void;
    className?:string
}

function CategoryPriceSectionRenderer({
    renderDeleteButton = true,
    priceSections,
    onDelete,
    className
}: IProps) {
    return priceSections.map((sec) => (
        <Card
            shadow="sm"
            className={`max-w-[400px] w-full mx-auto lg:mx-0 lg:min-w-[350px] xl:w-full border-1 border-darkOrange ${className}`}
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
                                    onDelete(sec.id);
                                }
                            }}
                        >
                            {<DeleteIcon />}
                        </Button>
                    )}
                </div>
            </CardHeader>
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
