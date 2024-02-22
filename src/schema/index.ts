import { TypeOf, z } from "zod";

export const BaseResponse = z.object({
    id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const BaseResponseWithNameAndImage = z
    .object({
        name: z.string(),
        image: z.string(),
    })
    .merge(BaseResponse);

export const BaseDeleteResponseSchema = z.object({
    message: z.string(),
});
export type TBaseDeleteReponseSchema = TypeOf<typeof BaseDeleteResponseSchema>;
