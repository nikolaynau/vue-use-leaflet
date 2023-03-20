import { describe, it, expect, vi } from 'vitest';
import { unref, defineComponent, onUnmounted, h } from 'vue-demi';
import { Control } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletScaleControl } from '.';

describe('useLeafletScaleControl', () => {
  it('should return not empty instance', () => {
    expect(unref(useLeafletScaleControl())).toBeInstanceOf(Control.Scale);
  });

  it('should work with factory', () => {
    const factory = vi
      .fn()
      .mockImplementation(options => new Control.Scale(options));
    const instance = useLeafletScaleControl({
      factory
    });
    expect(unref(instance)).toBeInstanceOf(Control.Scale);
    expect(factory).toBeCalledTimes(1);
  });

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletScaleControl();

          expect(unref(instance)).toBeInstanceOf(Control.Scale);
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
