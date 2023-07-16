type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type Join<K, P> = K extends string | number ?
  P extends string | number ?
  `${K}${'' extends P ? '' : '.'}${P}`
  : never : never;

type NonUndefined<A> = A extends undefined ? never : A;

type NonFunctionKeys<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];

type Paths<T, D extends number = 5> = [D] extends [never] ? never : T extends object ?
  {
    [K in NonFunctionKeys<T>]-?
    : K extends string | number
    ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
    : never
  }[NonFunctionKeys<T>] : '';

type DeepPickRec<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
  ? { [key in First]: DeepPickRec<T[First], Rest> }
  : never
  : K extends keyof T
  ? { [key in K]: T[K] }
  : never;

export type DeepPick<T, K extends Paths<T>> = DeepPickRec<T, K>;

export type InputTypes = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' |
  'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' |
  'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type PathTail<Path extends string> = Path extends `${infer _}.${infer R}` ? PathTail<R> : Path;
