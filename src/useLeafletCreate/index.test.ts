import { describe, it, expect, vi } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { useLeafletCreate } from '.';

describe('useLeafletCreate', () => {
  it('should work create', () => {
    const obj = { a: 1 };
    const create = vi.fn();
    create.mockImplementation(() => obj);
    const instance = useLeafletCreate(create);

    expect(create).toBeCalledTimes(1);
    expect(instance.value).toEqual(obj);
  });

  it('should work initial watch', async () => {
    const obj = { a: 1 };
    const create = vi.fn();
    const watchSource = ref(true);
    create.mockImplementation(() => obj);

    const instance = useLeafletCreate(create, { watch: watchSource });

    expect(create).toBeCalledTimes(1);
    expect(instance.value).toEqual(obj);
  });

  it('should work watch', async () => {
    const obj = { a: 1 };
    const create = vi.fn();
    const watchSource = ref<number | null>(null);
    create.mockImplementation(() => obj);

    const instance = useLeafletCreate(create, { watch: watchSource });
    expect(instance.value).toBeNull();

    watchSource.value = 0;
    await nextTick();

    expect(instance.value).toBeNull();
    expect(create).toBeCalledTimes(0);

    watchSource.value = 1;
    await nextTick();

    expect(instance.value).toEqual(obj);
    expect(create).toBeCalledTimes(1);

    watchSource.value = 2;
    await nextTick();

    expect(instance.value).toEqual(obj);
    expect(create).toBeCalledTimes(1);
  });

  it('should work watch sync', () => {
    const obj = { a: 1 };
    const create = vi.fn();
    const watchSource = ref<number | null>(null);
    create.mockImplementation(() => obj);

    const instance = useLeafletCreate(create, {
      watch: watchSource,
      flushSync: true
    });
    expect(instance.value).toBeNull();

    watchSource.value = 1;

    expect(create).toBeCalledTimes(1);
    expect(instance.value).toEqual(obj);
  });
});
