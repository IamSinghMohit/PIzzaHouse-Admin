import { errorToast } from "@/lib/toast";
import { Cloudinary } from "@cloudinary/url-gen";
import { z, ZodError, ZodObject, ZodRawShape } from "zod";

export function FormDataSend(
    data: Record<string, any>,
    func: (d: FormData) => void,
) {
    const form = new FormData();
    for (let key in data) {
        form.append(key, data[key]);
    }
    func(form);
}

export function ValidateBackendResponse<T extends ZodRawShape>(
    response: any,
    schema: ZodObject<T>,
) {
    const baseResponse = z.object({
        success: z.boolean(),
        data: schema,
    });
    try {
        const result = baseResponse.parse(response);
        if (!result.success) {
            errorToast("unsuccessful response");
            return undefined;
        }
        return result.data;
    } catch (error) {
        if (error instanceof ZodError) {
            errorToast("received bad data");
        } else {
            throw new Error(`Received bad data from the server`);
        }
    }
    return undefined;
}

export function validateString(str: any) {
    // Check if the input is a non-empty string (ignores spaces)
    return typeof str === "string" && str.trim() !== "";
}

export const uuid = () => {
    let dt = new Date().getTime();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        },
    );
};

export function generateCloudinaryImageUrl(id: string) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        },
    });
    return cld.image(id).toURL();
}

export function CapitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
