import { Button } from "@nextui-org/react";

interface Props {
    isLoading: boolean;
    onPress: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

function ModalButton({ isLoading, onPress, icon, children, className }: Props) {
    return (
        <Button
            radius="sm"
            isLoading={isLoading}
            startContent={icon}
            color="primary"
            className={"text-white overlay-modal-button" + ` ${className}`}
            onPress={onPress}
        >
            {children}
        </Button>
    );
}

export default ModalButton;

