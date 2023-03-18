import { describe, it, expect, vi } from 'vitest';
import {
  unref,
  defineComponent,
  onUnmounted,
  h,
  ref,
  nextTick,
  reactive
} from 'vue-demi';
import { Control } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletAttributionControl } from '.';

describe('useLeafletAttributionControl', () => {
  it('should return not empty instance', () => {
    expect(unref(useLeafletAttributionControl())).toBeInstanceOf(
      Control.Attribution
    );
  });

  it('should work with factory', () => {
    const factory = vi
      .fn()
      .mockImplementation(options => new Control.Attribution(options));
    const instance = useLeafletAttributionControl({
      factory
    });
    expect(unref(instance)).toBeInstanceOf(Control.Attribution);
    expect(factory).toBeCalledTimes(1);
  });

  it('should work with emtpy prefix', () => {
    expect(unref(useLeafletAttributionControl())!.options.prefix).toContain(
      'Leaflet'
    );
    expect(
      unref(useLeafletAttributionControl({ prefix: null }))!.options.prefix
    ).toBeNull();
    expect(
      unref(useLeafletAttributionControl({ prefix: ref(null) }))!.options.prefix
    ).toBeNull();
    expect(
      unref(useLeafletAttributionControl({ prefix: ref(undefined) }))!.options
        .prefix
    ).toContain('Leaflet');
  });

  it('should work with reactive prefix', async () => {
    const prefix = ref<string | null>(null);
    const instance = useLeafletAttributionControl({ prefix });
    expect(unref(instance)!.options.prefix).toBeNull();

    prefix.value = 'abc';
    await nextTick();

    expect(unref(instance)!.options.prefix).toBe('abc');
  });

  it.each([
    [null, {}],
    [undefined, {}],
    [ref(null), {}],
    [ref(undefined), {}],
    [ref(['a', 'b']), { a: 1, b: 1 }],
    [reactive(['a', 'b']), { a: 1, b: 1 }]
  ])('should work with attributions', (attributions, expected) => {
    expect(
      (unref(useLeafletAttributionControl({ attributions })) as any)
        ._attributions
    ).toEqual(expected);
  });

  it('should work with reactive attributions', async () => {
    const attributions = ref<string[] | null>(null);
    const instance = useLeafletAttributionControl({ attributions });
    expect((unref(instance) as any)._attributions).toEqual({});

    attributions.value = ['a'];
    await nextTick();
    expect((unref(instance) as any)._attributions).toEqual({ a: 1 });

    attributions.value.push('b');
    await nextTick();
    expect((unref(instance) as any)._attributions).toEqual({ a: 1, b: 1 });

    attributions.value.splice(0, 1);
    attributions.value.push('c');
    await nextTick();
    expect((unref(instance) as any)._attributions).toEqual({
      a: 0,
      b: 1,
      c: 1
    });

    attributions.value = null;
    await nextTick();
    expect((unref(instance) as any)._attributions).toEqual({
      a: 0,
      b: 0,
      c: 0
    });
  });

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletAttributionControl();

          expect(unref(instance)).toBeInstanceOf(Control.Attribution);
          const removeSpy = vi.spyOn(unref(instance)!, 'remove');

          onUnmounted(() => {
            expect(unref(instance)).toBeNull();
            expect(removeSpy).toBeCalledTimes(1);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });
});
