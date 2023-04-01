import { describe, expect, it, vi } from 'vitest';
import { ref, defineComponent } from 'vue-demi';
import { mount } from '../../.test';
import { useLeafletRemoveLayer, type LeafletRemovableLayer } from '.';

describe('useLeafletRemoveLayer', () => {
  it('should work when nulling the ref', async () => {
    const obj = {
      off: vi.fn(() => obj),
      remove: vi.fn(() => obj)
    } as LeafletRemovableLayer;
    const layer = ref<LeafletRemovableLayer | null>(obj);
    (layer.value as any)._map = {};

    useLeafletRemoveLayer(layer);
    layer.value = null;

    expect(obj.off).toBeCalledTimes(1);
    expect(obj.remove).toBeCalledTimes(1);
  });

  it('should work when component unmounted', () => {
    const obj = {
      off: vi.fn(() => obj),
      remove: vi.fn(() => obj)
    } as LeafletRemovableLayer;
    const layer = ref<LeafletRemovableLayer | null>(obj);
    (layer.value as any)._map = {};

    const vm = mount(
      defineComponent({
        setup() {
          useLeafletRemoveLayer(layer);
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expect(obj.off).toBeCalledTimes(1);
    expect(obj.remove).toBeCalledTimes(1);
    expect(layer.value).toBeNull();
  });
});
