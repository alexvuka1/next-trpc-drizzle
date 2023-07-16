import type { Tables } from "@server/db";
import type { DBQueryConfig } from "drizzle-orm";

export type QueryConfig<T extends keyof Tables> = DBQueryConfig<'many', true, Tables, Tables[T]>;
