import { describe, it, expect } from 'vitest';
import { ref, nextTick } from 'vue-demi';
import { useLeafletDeps } from '.';

describe('useLeafletDeps', () => {
  it('should work', async () => {
    const foo = ref('foo');
    const bar = ref<string | null>(null);
    const baz = ref<string | null>(null);

    const result = useLeafletDeps(foo, bar, baz);
    expect(result.value).toBeUndefined();

    bar.value = 'bar';
    await nextTick();
    expect(result.value).toBeUndefined();

    baz.value = 'baz';
    await nextTick();
    expect(result.value).toBe('foo');
  });
});
