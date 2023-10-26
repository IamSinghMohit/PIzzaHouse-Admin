import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

interface Props {
    buttonText:string
}

function CreateButton({buttonText}: Props) {
    return (
        <>
        <Button
            startContent={(() => (
                <div className="text-2xl">
                    <TiPlus />
                </div>
            ))()}
            className="bg-primaryOrange text-white"
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
