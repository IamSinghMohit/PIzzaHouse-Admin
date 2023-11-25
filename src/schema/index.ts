import { z } from "zod";

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
