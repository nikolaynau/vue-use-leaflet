import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
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
import { useLeafletControl, type UseLeafletControlOptions } from '.';

describe('useLeafletControl', () => {
  let onAddSpy: Mock;
  let onRemoveSpy: Mock;
  let onDisableSpy: Mock;
  let onEnableSpy: Mock;
  let options: UseLeafletControlOptions;
  let map: Map;

  beforeEach(() => {
    onAddSpy = vi.fn();
    onRemoveSpy = vi.fn();
    onDisableSpy = vi.fn();
    onEnableSpy = vi.fn();
    options = {
      onAdd: onAddSpy,
      onRemove: onRemoveSpy,
      onDisable: onDisableSpy,
      onEnable: onEnableSpy
    };

    const div = document.createElement('div');
    map = new Map(div);
  });

  function expectNotCalled() {
    expect(onAddSpy).not.toBeCalled();
    expect(onRemoveSpy).not.toBeCalled();
    expect(onDisableSpy).not.toBeCalled();
    expect(onEnableSpy).not.toBeCalled();
  }

  it('should return not empty instance', () => {
    expect(unref(useLeafletControl())).toBeInstanceOf(Control);
  });

  it('should work with factory', () => {
    const factory = vi.fn().mockImplementation(options => new Control(options));
    const instance = useLeafletControl({
      factory
    });
    expect(unref(instance)).toBeInstanceOf(Control);
    expect(factory).toBeCalledTimes(1);
  });

  it('should work with callbacks', () => {
    onAddSpy.mockImplementation(() => document.createElement('div'));

    const instance = useLeafletControl(options);
    expect(unref(instance)).toBeInstanceOf(Control);
    expectNotCalled();

    map.addControl(unref(instance)!);

    expect(onAddSpy).toBeCalledTimes(1);
    expect(onAddSpy).toBeCalledWith(map, unref(instance.value));
    expect(onRemoveSpy).not.toBeCalled();
    expect(onDisableSpy).not.toBeCalled();
    expect(onEnableSpy).toBeCalledTimes(1);
    expect(onEnableSpy).toBeCalledWith(map, unref(instance.value));

    map.removeControl(unref(instance)!);

    expect(onRemoveSpy).toBeCalledTimes(1);
    expect(onRemoveSpy).toBeCalledWith(map, unref(instance.value));
    expect(onAddSpy).toBeCalledTimes(1);
    expect(onDisableSpy).not.toBeCalled();
    expect(onEnableSpy).toBeCalledTimes(1);
  });

  it('should not call callbacks when control not added to map', async () => {
    const disabled = ref(false);
    const instance = useLeafletControl({ ...options, disabled });
    expect(unref(instance)).toBeInstanceOf(Control);
    expectNotCalled();

    disabled.value = true;
    await nextTick();

    expectNotCalled();
  });

  it('should work with disabled', async () => {
    onAddSpy.mockImplementation(() => document.createElement('div'));

    const disabled = ref(false);
    const instance = useLeafletControl({ ...options, disabled });
    expect(unref(instance)).toBeInstanceOf(Control);
    expectNotCalled();

    map.addControl(unref(instance)!);

    expect(onDisableSpy).not.toBeCalled();
    expect(onEnableSpy).toBeCalledTimes(1);
    expect(onEnableSpy).toBeCalledWith(map, unref(instance.value));

    disabled.value = true;
    await nextTick();

    expect(onEnableSpy).toBeCalledTimes(1);
    expect(onDisableSpy).toBeCalledTimes(1);
    expect(onDisableSpy).toBeCalledWith(map, unref(instance.value));

    disabled.value = false;
    await nextTick();

    expect(onEnableSpy).toBeCalledTimes(2);
    expect(onDisableSpy).toBeCalledTimes(1);
  });

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletControl();

          expect(unref(instance)).toBeInstanceOf(Control);
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
