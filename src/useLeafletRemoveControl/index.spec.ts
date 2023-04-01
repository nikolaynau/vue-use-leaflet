import { describe, expect, it, vi } from 'vitest';
import { ref, markRaw, defineComponent } from 'vue-demi';
import { Control, Map } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletRemoveControl } from '.';

describe('useLeafletRemoveControl', () => {
  it('should work when nulling the ref', async () => {
    const map = new Map(document.createElement('div'));
    const control = ref<Control | null>(markRaw(new Control()));
    control.value!.onAdd = () => document.createElement('div');
    map.addControl(control.value!);
    const removeSpy = vi.spyOn(control.value!, 'remove');

    useLeafletRemoveControl(control);
    control.value = null;
    expect(removeSpy).toBeCalledTimes(1);
  });

  it('should work when component unmounted', () => {
    const map = new Map(document.createElement('div'));
    const control = ref<Control | null>(markRaw(new Control()));
    control.value!.onAdd = () => document.createElement('div');
    map.addControl(control.value!);
    const removeSpy = vi.spyOn(control.value!, 'remove');

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletRemoveControl(control);
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expect(removeSpy).toBeCalledTimes(1);
    expect(control.value).toBeNull();
  });
});
