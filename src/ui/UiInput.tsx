import { extendVariants } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

const UiInput = extendVariants(Input, {
    variants: {
        variant: {
            bordered: {
                inputWrapper: [
                    "group-data-[focus=true]:border-primaryOrange",
                    "after:bg-primaryOrange",
                ],
                label: "text-primaryOrange",
                input: "uppercase",
            },
            underlined: {
                inputWrapper: [
                    "group-data-[focus=true]:border-primaryOrange",
                    "after:bg-primaryOrange",
                ],
                label: "text-primaryOrange",
                input: "uppercase",
            },
        },
    },
});
export default UiInput;
