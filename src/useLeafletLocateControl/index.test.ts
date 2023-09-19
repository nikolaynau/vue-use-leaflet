import { describe, it, expect, vi } from 'vitest';
import { unref, defineComponent, onUnmounted, h } from 'vue-demi';
import { Control, Map } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletLocateControl } from '.';
import { LocateConstructor } from './extension';
import '@leaflet-extensions/locatecontrol';

describe('useLeafletLocateControl', () => {
  const Locate = (Control as any).Locate as LocateConstructor;

  it('should return not empty instance', () => {
    expect(unref(useLeafletLocateControl())).toBeInstanceOf(Locate);
  });

  it('should work with factory', () => {
    const factory = vi.fn().mockImplementation(options => new Locate(options));
    const instance = useLeafletLocateControl({
      factory
    });
    expect(unref(instance)).toBeInstanceOf(Locate);
    expect(factory).toBeCalledTimes(1);
  });

  it('should destroy instance when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const map = new Map(document.createElement('div'));
          const instance = useLeafletLocateControl();

          expect(unref(instance)).toBeInstanceOf(Locate);
          map.addControl(unref(instance)!);
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

  it('should destroy instance when clear ref', () => {
    const map = new Map(document.createElement('div'));
    const instance = useLeafletLocateControl();

    expect(unref(instance)).toBeInstanceOf(Locate);
    map.addControl(unref(instance)!);
    const removeSpy = vi.spyOn(unref(instance)!, 'remove');

    instance.value = null;

    expect(unref(instance)).toBeNull();
    expect(removeSpy).toBeCalledTimes(1);
  });
});
