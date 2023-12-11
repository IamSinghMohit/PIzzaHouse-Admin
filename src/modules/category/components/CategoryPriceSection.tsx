import {
    Chip,
    Card,
    CardHeader,
    CardBody,
    Button,
    Divider,
} from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import { BsPlusSquareDotted } from "react-icons/bs";
import IconWrapper from "@/components/IconWrapper";
import { BiReset } from "react-icons/bi";
import { useRef, useState} from "react";
import { uuid } from "@/utils/uuid";
import {
    setCategorySections,
    setUpdatedFields,
} from "@/store/features/categorySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/state";
import UiInput from "@/ui/UiInput";
import { validateString } from "@/utils/ValidateString";
import { TAttributes } from "@/types/slice/Category";

function CategoryPriceSection() {
    // this is for chip input tag
    const [attributes,setAttributes] = useState<TAttributes[]>([])
    const chipRef = useRef<HTMLInputElement>(null);
    const [chipText, setChipText] = useState("");
    // this is for title of the category attribute
    const [title, setTitle] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);
    // Errors
    const [errors, setErrors] = useState({ title: "", att: "" });
    const { updated_fields } = useAppSelector((state) => state.category);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();

    function handleClick() {
        if (!validateString(chipText)) {
            setErrors((prev) => ({
                att: "value must be valid",
                title: prev.title,
            }));
            return;
        }
        setAttributes((prev) => [
            ...prev,
            {
                id: `${uuid()}`,
                title: chipText.toUpperCase(),
            },
        ]);
        setChipText("");
    }

    function handleInputKeyEvent(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    function handleTitltInputEvent(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            chipRef.current?.focus();
        }
    }

    function handleChipClose(id: string) {
        setAttributes(attributes.filter((att) => att.id != id));
    }

    function handleRegisterClick() {
        if (!validateString(title)) {
            if (chipText.length > 0) {
                setErrors((prev) => ({
                    att: "please add",
                    title: prev.title,
                }));
            }
            setErrors((prev) => ({
                att: prev.att,
                title: "value must be valid",
            }));
            return;
        }

        if (chipText.length > 0) {
            setErrors((prev) => ({
                att: "please save",
                title: prev.title,
            }));
            return;
        }

        if (attributes.length <= 0) {
            setErrors((prev) => ({
                att: "please add something",
                title: prev.title,
            }));
            chipRef.current?.focus();
            return;
        }

        dispatch(
            setCategorySections({
                data: {
                    id: `${uuid()}`,
                    title: title,
                    attributes: attributes,
                },
                type: "PUSH",
            })
        );

        // updating the filds in reduxstore
        if (!updated_fields.attributes) {
            dispatch(setUpdatedFields("price_attributes"));
        }
        setErrors({
            att: "",
            title: "",
        });

        setAttributes([]);
        setChipText("");
        setTitle("");
        titleRef.current?.focus();
    }

    return (
        <Card
            shadow="sm"
            className="max-w-[400px] w-full mx-auto lg:mx-0 lg:w-[450px] border-primaryOrange"
        >
            <CardHeader className="flex flex-col gap-2 p-2">
                <div className="flex justify-between items-baseline w-full">
                    <UiInput
                        variant="underlined"
                        size="sm"
                        type="text"
                        label="TITLE"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setErrors((prev) => ({ att: prev.att, title: "" }));
                        }}
                        isInvalid={!!errors.title}
                        errorMessage={errors.title}
                        onKeyDown={handleTitltInputEvent}
                        ref={titleRef}
                    />
                    <Button
                        isIconOnly
                        radius="sm"
                        className="mb-1 text-white bg-primaryOrange"
                        size="md"
                        onClick={handleRegisterClick}
                    >
                        <IconWrapper icon={<FaCheck />} className="text-md" />
                    </Button>
                </div>
                <div className="flex justify-between w-full gap-1">
                    <UiInput
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        onChange={(e) => {
                            setChipText(e.target.value);
                            setErrors((prev) => ({
                                att: "",
                                title: prev.title,
                            }));
                        }}
                        onKeyDown={handleInputKeyEvent}
                        ref={chipRef}
                        classNames={{
                            base: "max-w-[220px]",
                        }}
                        isInvalid={!!errors.att}
                        errorMessage={errors.att}
                        value={chipText}
                    />
                    <div className="flex gap-1">
                        <Button
                            radius="sm"
                            isIconOnly
                            onClick={handleClick}
                            ref={buttonRef}
                            className="bg-primaryOrange text-white"
                        >
                            <IconWrapper icon={<BsPlusSquareDotted />} />
                        </Button>
                        <Button
                            radius="sm"
                            isIconOnly
                            onClick={() => setAttributes([])}
                            className="bg-primaryOrange text-white"
                        >
                            <IconWrapper icon={<BiReset />} />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-2 flex-wrap flex-row gap-2 max-h-[100px] overflow-y-scroll">
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

export default CategoryPriceSection
