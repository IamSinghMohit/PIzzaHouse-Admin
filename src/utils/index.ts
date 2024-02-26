import { Cloudinary } from "@cloudinary/url-gen";

export function FormDataSend(
    data: Record<string, any>,
    func: (d: FormData) => void
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
        }
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
