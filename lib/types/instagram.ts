import { z } from "zod";

export const InstagramPostSchema = z.object({
  id: z.string(),
  caption: z.string().optional(),
  media_type: z.enum(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]),
  media_url: z.string().url(),
  thumbnail_url: z.string().url().optional(),
  permalink: z.string().url(),
  timestamp: z.string(),
  username: z.string(),
});

export const InstagramResponseSchema = z.object({
  data: z.array(InstagramPostSchema),
  paging: z
    .object({
      cursors: z
        .object({ before: z.string(), after: z.string() })
        .optional(),
    })
    .optional(),
});

export type InstagramPost = z.infer<typeof InstagramPostSchema>;
export type InstagramResponse = z.infer<typeof InstagramResponseSchema>;