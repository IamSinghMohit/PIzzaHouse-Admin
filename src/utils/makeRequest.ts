import api from "@/lib/axios";
import { AxiosError } from "axios";
import { ZodError, ZodSchema, z } from "zod";
import { errorToast } from "@/lib/toast";

export type TBackendErrorReponse = {
    code: number;
    message: string;
};

type RequestOptions = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Add more methods as needed
    params?: Record<string, any>;
    data?: any;
    headers?: Record<string, string>;
};

export async function makeRequest<T>(
    options: RequestOptions,
    schema: ZodSchema<T>,
): Promise<T> {
    try {
        const response = await api({
            url: options.url,
            method: options.method || "GET",
            params: options.params,
            data: options.data,
            headers: options.headers,
        });

        const baseResponse = z.object({
            success: z.literal(true),
            data: schema,
        });
        const result = baseResponse.parse(response.data);
        return result.data!;
    } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
            errorToast("received bad from server");
            throw {
                code: 500,
                message: new Error("received bad from server"),
            };
        }

        const errorSchema = z.object({
            success: z.boolean(),
            error: z.object({
                code: z.number(),
                message: z.string(),
            }),
        });
        const e = error as AxiosError<TBackendErrorReponse>;
        const res = errorSchema.parse(e.response?.data);
        errorToast(res.error.message);
        throw new Error(res.error.message);
    }
}
