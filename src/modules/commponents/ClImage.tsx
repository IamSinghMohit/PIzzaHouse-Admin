import { Cloudinary } from "@cloudinary/url-gen";
import { Avatar } from "@nextui-org/react";

type Props = {
    imageId: string;
};

function ClImage({ imageId}: Props) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        },
    });
    const image = cld.image(imageId).toURL();

    return <Avatar src={image} size="lg" radius="sm" />;
}

export default ClImage;
