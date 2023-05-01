import { watch, type WatchOptions } from 'vue-demi';
import { type MaybeRefOrGetter, notNullish, toValue } from '@vueuse/shared';

export interface UseLeafletDiffOptions<T> {
  enabled?: boolean;
  diffFn?: ArrayDiffFunction<T>;
  update?: (newVal: T[], oldVal: T[] | undefined) => void;
  add?: (arr: T[]) => void;
  remove?: (arr: T[]) => void;
  watchOptions?: WatchOptions;
}

export type UseLeafletDiffReturn = () => void;

export type ArrayDiffFunction<T = any> = (
  newArr: T[],
  oldArr: T[]
) => { remove: T[]; add: T[] };

export function useLeafletDiff<T>(
  source: MaybeRefOrGetter<T[]>,
  compareFn: (value: T, othVal: T) => boolean,
  options: UseLeafletDiffOptions<T> = {}
): UseLeafletDiffReturn {
  const { enabled = true, diffFn, update, add, remove, watchOptions } = options;

  const stop = watch(
    () => [...toValue(source)],
    (newVal, oldVal) => {
      if (enabled) {
        if (notNullish(oldVal)) {
          const { add: addArr, remove: removeArr } = (diffFn ?? diff)(
            newVal,
            oldVal
          );
          remove?.(removeArr);
          add?.(addArr);
        } else {
          add?.(newVal);
        }
      } else {
        update?.(newVal, oldVal);
      }
    },
    { deep: true, ...watchOptions }
  );

  function diff(newArr: T[], oldArr: T[]): { remove: T[]; add: T[] } {
    return {
      add: arrayDiff(newArr, oldArr, compareFn),
      remove: arrayDiff(oldArr, newArr, compareFn)
    };
  }

  function arrayDiff<T>(
    arrA: T[],
    arrB: T[],
    compare: (a: T, b: T) => boolean
  ): T[] {
    return arrA.filter(a => !arrB.some(b => compare(a, b)));
  }

  return stop;
}
