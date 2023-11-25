import { ModalRefType } from "@/types/Modal";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import UiModal from "@/ui/UiModal";
import {
    Image,
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
    const category = useAppSelector((state) => state.category.current_selected_category)
    const { data } = useCategoryAttributes(category ? category.id : "");

    useEffect(() => {
        if (open) {
            modalRef.current?.onOpen();
        }
    }, [open]);

    return (
        <>
            <UiModal ref={modalRef} size="5xl" bodyClassName="flex-col sm:flex-row gap-4" onClose={() => setModalOpen(false)}>
                <div className="flex flex-col items-center gap-2 justify-center">
                    <Image src={category?.image}  classNames={{
                        wrapper:'border-2 border-primaryOrange mt-2 w-4/5 max-w-[380px] xs:w-[290px] md:w-[350px]',
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
                <div className="flex flex-col gap-3 mt-3  max-h-[220px] sm:max-h-[300px] overflow-y-auto pr-1 mr-1">
                    {data &&
                            data.map((a) => (
                            <div
                                className="max-w-[400px] w-full mx-auto lg:mx-0 lg:min-w-[350px] xl:w-full border-1 border-darkOrange rounded-lg"
                                key={a.id}
                            >
                                <div className="flex gap-2 p-0 md:p-1 justify-between bg-primaryOrange text-lg uppercase text-white pl-3 rounded-t-lg ">
                                    {a.attribute_title}
                                </div>
                                <Divider />
                                <div className="block flex-wrap flex-row overflow-auto">
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
                                </div>
                            </div>
                        ))}
                </div>
            </UiModal>
        </>
    );
}

export default ViewCategory;
