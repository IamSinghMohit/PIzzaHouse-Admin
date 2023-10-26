import { AttributeSchemaType } from "@/modules/category/schema";
import { useEffect, useRef, useMemo } from "react";
import { Input, Chip } from "@nextui-org/react";
import {z} from "zod"

interface Props {
    data: AttributeSchemaType;
    register:any
    formState:any
}

function InputMapper({ data ,register,formState}: Props) {
    const InputRef = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const inputIdArrayRef = useRef<Array<string>>([]);
    const memoizedData = useMemo(() => data, [data]);
    const {errors} = formState

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>,
        id: string
    ) {
        if (e.key === "Enter") {
            const index = inputIdArrayRef.current.findIndex(
                (inputId) => inputId == id
            );
            const inputs = [...inputIdArrayRef.current].slice(
                (index + 1) % inputIdArrayRef.current.length
            );
            e.preventDefault();
            const input = InputRef.current[inputs[0]];
            input?.focus();
        }
    }

    useEffect(() => {
        InputRef.current[inputIdArrayRef.current[0]]?.focus();
    }, [data[0]]);

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:w-full lg:gap-5 lg:flex-col my-1">
            {memoizedData.map((d) => {
                // after mapping on main category array
                return (
                    <div className="flex gap-3 flex-col" key={d.id}>
                        <h1 className="font-bold">{d.attribute_title} :</h1>
                        <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
                            {/* mapping inside attribute sub array of main category array */}

                            {d.attributes.map((a) => {
                                inputIdArrayRef.current.push(a.id);
                                const { ref, onBlur, onChange ,name} = register(
                                    a.title,{
                                        require:true,
                                        required:`*required`
                                    }
                                );
                                return (
                                    <div className="flex" key={a.id}>
                                        <Chip className="h-[40px] bg-primaryOrange text-white rounded-none rounded-l-md pl-2 border-2 border-darkOrange">
                                            {a.title}
                                        </Chip>
                                        <Input
                                            radius="none"
                                            ref={(e) => {
                                                InputRef.current[a.id] = e;
                                                ref(e);
                                            }}
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, a.id)
                                            }
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name={name}
                                            classNames={{
                                                base: "w-[100px]",
                                                inputWrapper: "rounded-r-md",
                                            }}
                                            isInvalid={!!errors[a.title]}
                                            errorMessage={errors[a.title]?.message} 
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default InputMapper;
