import { Button, extendVariants } from "@nextui-org/react";

const UiButton = extendVariants(Button, {
    variants: {
        variant: {
            application: "bg-primaryOrange text-white",
        },
        isIconOnly: {
            true: "bg-primaryOrange text-white text-md",
            //     false:'bg-primaryOrange text-white'
        },
    },
});
export default UiButton;
