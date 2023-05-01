import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue-demi';
import { useLeafletDiff } from '.';

describe('useLeafletDiff', () => {
  function compare(a: number, b: number) {
    return a === b;
  }

  it('should work when diff disabled', async () => {
    const arr = ref([1, 2]);
    const update = vi.fn();

    useLeafletDiff(arr, compare, { enabled: false, update });
    expect(update).toHaveBeenCalledTimes(0);

    arr.value.push(3);
    await nextTick();

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith([1, 2, 3], [1, 2]);
  });

  it('should immediate work when diff disabled', async () => {
    const arr = ref([1, 2]);
    const update = vi.fn();

    useLeafletDiff(arr, compare, {
      enabled: false,
      watchOptions: { immediate: true },
      update
    });
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith([1, 2], undefined);

    arr.value.push(3);
    await nextTick();

    expect(update).toHaveBeenCalledTimes(2);
    expect(update).toHaveBeenCalledWith([1, 2, 3], [1, 2]);
  });

  it('should immediate work diff', async () => {
    const arr = ref([1, 2]);
    const add = vi.fn();
    const remove = vi.fn();

    useLeafletDiff(arr, compare, {
      watchOptions: { immediate: true },
      add,
      remove
    });
    expect(add).toHaveBeenCalledTimes(1);
    expect(add).toHaveBeenCalledWith([1, 2]);
    expect(remove).toHaveBeenCalledTimes(0);

    arr.value.push(3);
    arr.value.push(4);
    await nextTick();

    expect(add).toHaveBeenCalledTimes(2);
    expect(add).toHaveBeenCalledWith([3, 4]);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith([]);

    arr.value.splice(1, 2);
    await nextTick();

    expect(add).toHaveBeenCalledTimes(3);
    expect(add).toHaveBeenCalledWith([]);
    expect(remove).toHaveBeenCalledTimes(2);
    expect(remove).toHaveBeenCalledWith([2, 3]);
  });

  it('should work diff', async () => {
    const arr = ref([1, 2]);
    const add = vi.fn();
    const remove = vi.fn();

    useLeafletDiff(arr, compare, {
      add,
      remove
    });
    expect(add).toHaveBeenCalledTimes(0);
    expect(remove).toHaveBeenCalledTimes(0);

    arr.value.push(3);
    arr.value.push(4);
    await nextTick();

    expect(add).toHaveBeenCalledTimes(1);
    expect(add).toHaveBeenCalledWith([3, 4]);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith([]);

    arr.value.splice(1, 2);
    await nextTick();

    expect(add).toHaveBeenCalledTimes(2);
    expect(add).toHaveBeenCalledWith([]);
    expect(remove).toHaveBeenCalledTimes(2);
    expect(remove).toHaveBeenCalledWith([2, 3]);

    arr.value.push(5);
    arr.value.splice(0, 1);
    await nextTick();

    expect(add).toHaveBeenCalledTimes(3);
    expect(add).toHaveBeenCalledWith([5]);
    expect(remove).toHaveBeenCalledTimes(3);
    expect(remove).toHaveBeenCalledWith([1]);
  });

  it('should work with compare', async () => {
    const arr = ref([1, 2]);
    const add = vi.fn();
    const remove = vi.fn();
    const compareFn = vi.fn();

    useLeafletDiff(arr, compareFn, {
      add,
      remove
    });
    expect(add).toHaveBeenCalledTimes(0);
    expect(remove).toHaveBeenCalledTimes(0);
    expect(compareFn).toHaveBeenCalledTimes(0);

    arr.value.push(3);
    arr.value.push(4);
    await nextTick();

    expect(compareFn).toHaveBeenCalledTimes(16);
    expect(compareFn.mock.calls[0]).toEqual([1, 1]);
  });

  it('should work stop watch', async () => {
    const arr = ref([1, 2]);
    const add = vi.fn();
    const remove = vi.fn();

    const stop = useLeafletDiff(arr, compare, {
      add,
      remove
    });
    expect(add).toHaveBeenCalledTimes(0);
    expect(remove).toHaveBeenCalledTimes(0);

    arr.value.push(3);
    arr.value.push(4);
    await nextTick();

    expect(add).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);

    stop();
    arr.value.push(5);
    arr.value.splice(0, 1);

    expect(add).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
