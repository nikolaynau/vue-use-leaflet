import { describe, it, expect, vi } from 'vitest';
import {
  unref,
  defineComponent,
  onUnmounted,
  h,
  ref,
  nextTick
} from 'vue-demi';
import { Control, Map } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletZoomControl } from '.';

describe('useLeafletZoomControl', () => {
  it('should return not empty instance', () => {
    expect(unref(useLeafletZoomControl())).toBeInstanceOf(Control.Zoom);
  });

  it('should work with factory', () => {
    const factory = vi
      .fn()
      .mockImplementation(options => new Control.Zoom(options));
    const instance = useLeafletZoomControl({
      factory
    });
    expect(unref(instance)).toBeInstanceOf(Control.Zoom);
    expect(factory).toBeCalledTimes(1);
  });

  it('should work with disabled', async () => {
    const div = document.createElement('div');
    const map = new Map(div);
    const control = new Control.Zoom();
    const enableSpy = vi.spyOn(control as any, 'enable');
    const disableSpy = vi.spyOn(control as any, 'disable');
    const disabled = ref(false);
    const instance = useLeafletZoomControl({
      factory: () => control,
      disabled
    });
    expect(enableSpy).not.toBeCalled();
    expect(disableSpy).not.toBeCalled();
    map.addControl(unref(instance)!);

    disabled.value = true;
    await nextTick();

    expect(enableSpy).not.toBeCalled();
    expect(disableSpy).toBeCalledTimes(1);

    disabled.value = false;
    await nextTick();

    expect(enableSpy).toBeCalledTimes(1);
    expect(disableSpy).toBeCalledTimes(1);
  });

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletZoomControl();

          expect(unref(instance)).toBeInstanceOf(Control.Zoom);
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
