import { describe, expect, it } from 'vitest';
import { ref, unref } from 'vue-demi';
import { useLeafletReady } from '.';

describe('useLeafletReady', () => {
  it('should work', () => {
    const a = ref(false);
    const b = ref(false);
    const ready = useLeafletReady(a, b);

    expect(unref(ready)).toBeFalsy();

    a.value = true;

    expect(unref(ready)).toBeFalsy();

    b.value = true;

    expect(unref(ready)).toBeTruthy();
  });
});
