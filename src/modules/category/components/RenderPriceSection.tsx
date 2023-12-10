import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Chip,
    Divider,
} from "@nextui-org/react";
import { deleteAttribute} from "@/store/features/categorySlice";
import { memo } from "react";
import { useAppDispatch, useAppSelector} from "@/hooks/state";
import { SubAttribute } from "@/schema/categorySlice";
import { DeleteIcon } from "@/icons";
import { setUpdatedFields } from "@/store/features/categorySlice";

interface Props {
    id: string;
    attribute_title: string;
    attributes: SubAttribute[];
}

function RenderAttribute({ attribute_title, attributes, id }: Props) {
    const dispatch = useAppDispatch();
    const {updated_fields} = useAppSelector((state) => state.category)

    function handleDeleteAtt(id:string){
        dispatch(deleteAttribute(id))
        // updating the filds in reduxstore
        if(!updated_fields.price_attributes){
            dispatch(setUpdatedFields('price_attributes'))
        }
    }

    return (
        <Card
            shadow="sm"
            className="max-w-[400px] w-full mx-auto lg:mx-0 lg:min-w-[350px] xl:w-full border-1 border-darkOrange"
        >
            <CardHeader className="flex gap-2 p-0 justify-between bg-primaryOrange text-lg uppercase text-white">
                <div className="flex m-1 justify-between w-full items-center text-[14px] lg:text-[16px]">
                    <span className="ml-2">{attribute_title}</span>
                    <Button
                        className="rounded-lg text-white text-lg bg-darkOrange p-[5px]"
                        isIconOnly
                        onClick={() => handleDeleteAtt(id)}
                    >
                        {<DeleteIcon />}
                    </Button>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-2 flex-wrap flex-row gap-2">
                {attributes.map((att) => (
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
    );
}

export default memo(RenderAttribute)
