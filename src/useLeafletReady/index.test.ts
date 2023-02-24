import { describe, expect, it } from 'vitest';
import { nextTick, ref, unref } from 'vue-demi';
import { useLeafletReady } from '.';

describe('useLeafletReady', () => {
  it('should work', async () => {
    const a = ref(false);
    const b = ref(false);
    const ready = useLeafletReady(a, b);

    expect(unref(ready)).toBeFalsy();

    a.value = true;
    await nextTick();

    expect(unref(ready)).toBeFalsy();

    b.value = true;
    await nextTick();

    expect(unref(ready)).toBeTruthy();
  });
});
