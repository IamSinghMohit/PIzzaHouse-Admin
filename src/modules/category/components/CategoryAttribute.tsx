import {
    Chip,
    Card,
    CardHeader,
    CardBody,
    Button,
    Divider,
} from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import { BsPatchPlus } from "react-icons/bs";
import IconWrapper from "@/components/IconWrapper";
import { useRef, useState } from "react";
import { uuid } from "@/utils/uuid";
import { setPriceAttribute } from "@/store/features/categorySlice";
import { SubAttribute } from "@/schema/categorySlice";
import { useAppDispatch } from "@/hooks/state";
import UiInput from "@/ui/UiInput";
import UiButton from "@/ui/UiButton";

interface Props {}

function CategoryAttribute({}: Props) {
    const [attributes, setAttributes] = useState<SubAttribute[]>([]);
// this is for chip input tag
const chipRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState("");
 // this is for title of the category attribute
    const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLInputElement>(null)

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();

    function handleClick() {
        setAttributes((prev) => [
            ...prev,
            {
                id: `${uuid()}`,
                title: value.toUpperCase(),
            },
        ]);
        setValue("");
    }

    function handleInputKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    function handleTitltInputEvent(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key === "Enter") {
            chipRef.current?.focus()
        }
    }

    function handleChipClose(id: string) {
        setAttributes(attributes.filter((att) => att.id != id));
    }

    function handleRegisterClick() {
        dispatch(
            setPriceAttribute({
                id: `${uuid()}`,
                attribute_title: title,
                attributes: attributes,
            })
        );
            setAttributes([])
            setValue('')
            setTitle('')
            titleRef.current?.focus()
    }


    return (
            <Card shadow="sm" className="max-w-[400px] w-full mx-auto lg:mx-0 lg:w-[450px] border-primaryOrange">
                <CardHeader className="flex flex-col gap-2 p-2">
                    <div className="flex justify-between items-end w-full">
                        <UiInput
                            variant="underlined"
                            type="text"
                            label="TITLE"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleTitltInputEvent}
                            ref={titleRef}
                        />
                        <UiButton
                            isIconOnly
                            radius="md"
                            className="mb-1 "
                            size="md"
                            onClick={handleRegisterClick}
                            >

                            <IconWrapper
                                icon={<FaCheck />}
                                className="text-md"
                            />
                        </UiButton>
                    </div>
                    <div className="flex justify-between w-full gap-1">
                        <UiInput
                            variant="bordered"
                            radius="sm"
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleInputKeyEvent}
                            ref={chipRef}
                            classNames={{
                                base: "max-w-[220px]",
                            }}
                            value={value}
                        />
                        <Button
                            isIconOnly
                            onClick={handleClick}
                            ref={buttonRef}
                            className="bg-primaryOrange text-white"
                        >
                            <IconWrapper icon={<BsPatchPlus />} />
                        </Button>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody className="p-2 flex-wrap flex-row gap-2">
                        {attributes.map((att) => (
                            <Chip
                                key={att.id}
                                onClose={() => handleChipClose(att.id)}
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

export default CategoryAttribute;
