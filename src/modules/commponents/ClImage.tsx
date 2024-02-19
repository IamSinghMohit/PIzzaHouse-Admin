import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Avatar } from "@nextui-org/react";

type Props = {
    imageId: string;
};

function ClImage({ imageId, className }: Props) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: "uchihamadara",
        },
    });
    const image = cld.image(imageId).toURL();

    return <Avatar src={image} size="lg" radius="sm" />;
}

export default ClImage;
