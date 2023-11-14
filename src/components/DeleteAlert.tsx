import UiModal from "@/ui/UiModal";
import { ModalRefType } from "@/schema/modal";
import { useEffect, useRef } from "react";
import { Button } from "@nextui-org/react";

interface Props {
    onYesPress: () => void;
    onNoPress: () => void;
    content: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

function DeleteAlart({ onYesPress, onNoPress, content, open, onClose }: Props) {
    const ModalRef = useRef<ModalRefType>(null);

    useEffect(() => {
        if (open) {
            ModalRef.current?.onOpen();
        }
    }, [open]);

    return (
        <UiModal
            ref={ModalRef}
            onClose={onClose}
            footerContent={
                <>
                    <Button
                        className="text-white bg-primaryOrange"
                        onPress={() => {
                            ModalRef.current?.onClose();
                            onYesPress();
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        className="bg-red-500 text-white"
                        onPress={() => {
                            onNoPress();
                            ModalRef.current?.onClose();
                        }}
                    >
                        No
                    </Button>
                </>
            }
        >
            {content}
        </UiModal>
    );
}

export default DeleteAlart;
