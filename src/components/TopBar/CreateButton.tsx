import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

interface Props {
    buttonText:string;
    onPress?:() => void;
}

function CreateButton({buttonText,onPress}: Props) {
    return (
        <>
        <Button
            startContent={(() => (
                <div className="text-2xl">
                    <TiPlus />
                </div>
            ))()}
            className="bg-primaryOrange text-white"
            onPress={onPress}
            radius="sm"
            as={Link}
            to="create"
        >
            {buttonText}
        </Button>
        </>
    );
}

export default CreateButton;
