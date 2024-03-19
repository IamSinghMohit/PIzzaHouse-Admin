import { Cloudinary } from "@cloudinary/url-gen";

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

export { makeRequest } from "./makeRequest";
export type { TBackendErrorReponse } from "./makeRequest";

import { z, ZodSchema } from "zod";

export function ValidateBackendResponse<T>(
    response: any,
    schema: ZodSchema<T>,
) {
    try {
        const baseResponse = z.object({
            success: z.boolean(),
            data: schema,
        });
        return baseResponse.parse(response).data!;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export function ValidateBackendErrorResponse(res: any) {
    const schema = z.object({
        success: z.literal(false),
        error: z.object({
            code: z.number(),
            message: z.string(),
        }),
    });
    return schema.parse(res).error;
}
