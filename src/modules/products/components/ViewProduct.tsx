import { ModalRefType } from "@/types/Modal";
import UiModal from "@/ui/UiModal";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { useAppSelector } from "@/hooks/state";
import { useProductDetails } from "../hooks/useProductDetails";
import { Image, Chip, Badge } from "@nextui-org/react";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

function ViewProduct({ open, setOpen }: Props) {
    const modelRef = useRef<ModalRefType>();
    const { current_product } = useAppSelector((state) => state.product);
    const { data } = useProductDetails(current_product?.id || "");

    const defaultPriceArray = useMemo(() => {
        if (data) {
            const array = [];
            for (let key in data.data.default_prices) {
                array.push(data.data.default_prices[key]);
            }
            return array;
        }
        return [""];
    }, [data]);

    useEffect(() => {
        if (open) {
            modelRef.current?.onOpen();
        }
    }, [open]);

    return (
        <UiModal
            ref={modelRef}
            onClose={() => setOpen(false)}
            size="5xl"
            bodyClassName="flex-col sm:flex-row gap-4"
        >
            <div className="flex flex-col items-center gap-2 justify-center">
                <Image
                    src={current_product?.image}
                    classNames={{
                        wrapper:
                            "border-2 border-primaryOrange mt-2 w-4/5 max-w-[380px] xs:w-[290px] md:w-[350px]",
                    }}
                />
                <Chip
                    className=""
                    variant="bordered"
                    radius="sm"
                    classNames={{
                        content: "text-lg p-2 text-primaryOrange",
                        base: "border-darkOrange",
                    }}
                >
                    {current_product?.name}
                </Chip>
            </div>
            {data?.data.attributes.map((att) => (
                <div className="flex gap-3 flex-col" key={att.attribute_title}>
                    <h1 className="font-bold"> {att.attribute_title} :</h1>
                    <div className="flex gap-2 lg:gap-3 flex-wrap">
                        {att.attributes.map((a) => {
                            const showBadge = defaultPriceArray.includes(
                                a.title
                            );
                            return (
                                <div
                                    className="flex items-center"
                                    key={a.title}
                                >
                                    <Badge
                                        content="Default"
                                        isInvisible={!showBadge}
                                        color="primary"
                                        className="border-darkOrange"
                                        placement="top-left"
                                        classNames={{
                                            badge: "left-4 ",
                                        }}
                                    >
                                        <div
                                            className={`${
                                                showBadge
                                                    ? "bg-red-700"
                                                    : "bg-primaryOrange"
                                            } p-2 text-white rounded-l-md flex items-center gap-1`}
                                        >
                                            {a.title}
                                            <FaIndianRupeeSign />
                                        </div>
                                        <div className="bg-gray-100 p-2 rounded-r-md min-w-[70px]">
                                            {a.value}
                                        </div>
                                    </Badge>
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <h1 className="font-bold"> Default price :</h1>
                        <div className="flex items-center rounded-md">
                            <div className="p-2 text-white rounded-l-md flex items-center gap-1 bg-red-700">
                                Price
                                <FaIndianRupeeSign />
                            </div>
                            <div className="bg-gray-100 p-2 rounded-r-md min-w-[70px]">
                                {current_product?.price}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </UiModal>
    );
}

export default ViewProduct;
