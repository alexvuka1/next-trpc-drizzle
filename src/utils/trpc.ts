import type { AppRouter, RouterInput } from '@server/api/root';
import type { Tables } from '@server/db';
import type { BuildQueryResult, KnownKeysOnly } from 'drizzle-orm';
import type { Get } from 'type-fest';
import type { Join, PathTail } from './types';
import { get } from 'lodash-es';
import { api } from './api';

type GetRoutersWithMethod<T, Method> = T extends object ?
  {
    [K in keyof T]-?
    : K extends string
    ? K extends '_def'
    ? never
    : K extends Method
    ? ''
    : Join<K, GetRoutersWithMethod<T[K], Method>>
    : never
  }[keyof T] : never;

export const loadMany = <
  Path extends GetRoutersWithMethod<AppRouter['_def']['procedures'], 'findMany'>,
  Input extends Get<RouterInput, `${Path}.findMany`>,
>(path: Path, input: Input & KnownKeysOnly<Input, Get<RouterInput, `${Path}.findMany`>>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  return get(api, path).findMany.useQuery<Input, BuildQueryResult<Tables, Tables[PathTail<Path>], Input>[]>(input as any);
};
