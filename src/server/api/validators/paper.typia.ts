import type { DeepPartial } from "@trpc/server";
import type { QueryConfig } from "src/utils/drizzle";
import { createAssertEquals } from "typia";

const paperQueryConfig = {
    with: {
        authorPaperJT: {
            with: {
                author: true,
            },
        },
        content: true,
    },
} satisfies QueryConfig<'paper'>;

export const paperValidator = createAssertEquals<DeepPartial<typeof paperQueryConfig>>()