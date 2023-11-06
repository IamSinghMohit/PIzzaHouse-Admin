import { ModalRefType } from "@/schema/modal";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import UiModal from "@/ui/UiModal";
import {
    Image,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Chip,
} from "@nextui-org/react";
import { useCategoryAttributes } from "../hooks";
import { useAppSelector } from "@/hooks/state";

interface Props {
    open: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
}

function ViewCategory({ open, setModalOpen}: Props) {
    const modalRef = useRef<ModalRefType | null>(null);
    const category = useAppSelector((state) => state.category.currentSelectedCategory)
    const { data } = useCategoryAttributes(category ? category.id : "");

    useEffect(() => {
        if (open) {
            modalRef.current?.onOpen();
        }
    }, [open]);

    return (
        <>
            <UiModal ref={modalRef} bodyClassName="flex-col sm:flex-row" onClose={() => setModalOpen(false)}>
                <div className="flex flex-col items-center gap-2 justify-center">
                    <Image src={category?.image}  isZoomed classNames={{
                        wrapper:'border-2 border-primaryOrange w-4/5'
                    }}/>
                    <Chip
                        className=""
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            content: "text-lg p-2 text-primaryOrange",
                            base:'border-darkOrange'
                        }}
                    >
                        {category?.name}
                    </Chip>
                </div>
                <div className="flex flex-col gap-3 mt-3  max-h-[220px] sm:max-h-[550px] overflow-y-auto">
                    {data &&
                            data.map((a) => (
                            <Card
                                shadow="sm"
                                className="max-w-[400px] w-full mx-auto lg:mx-0 lg:min-w-[350px] xl:w-full border-1 border-darkOrange min-h-[80px] h-fit"
                                key={a.id}
                            >
                                <CardHeader className="flex gap-2 p-0 justify-between bg-primaryOrange text-lg uppercase text-white pl-3">
                                    {a.attribute_title}
                                </CardHeader>
                                <Divider />
                                <CardBody className="block h-full flex-wrap flex-row overflow-auto">
                                    {a.attributes.map((att) => (
                                        <Chip
                                            key={att.id}
                                            classNames={{
                                                base: "my-1 text-white bg-primaryOrange text-[12px] lg:text-[16px] m-1",
                                                closeButton:
                                                    "text-2xl text-red-800",
                                            }}
                                            radius="sm"
                                        >
                                            {att.title}
                                        </Chip>
                                    ))}
                                </CardBody>
                            </Card>
                        ))}
                </div>
            </UiModal>
        </>
    );
}

export default ViewCategory;
