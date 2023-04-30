import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { defineComponent, h, onUnmounted } from 'vue-demi';
import { GridLayer } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletGridLayer } from '.';

describe('useLeafletGridLayer', () => {
  let createTile: Mock;

  beforeEach(() => {
    createTile = vi.fn();
  });

  it('should work with create tile fn', () => {
    const gridLayer = useLeafletGridLayer(createTile);
    expect(gridLayer.value).toBeInstanceOf(GridLayer);
    expect((gridLayer.value as any).createTile).toBe(createTile);
  });

  it('should work with factory', () => {
    const instance = new GridLayer();
    const factory = vi.fn().mockImplementation(() => instance);
    const gridLayer = useLeafletGridLayer(createTile, { factory });

    expect(gridLayer.value).toBe(instance);
    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toBe(createTile);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const gridLayer = useLeafletGridLayer(createTile);
          expect(gridLayer.value).toBeInstanceOf(GridLayer);
          const remove = vi.fn();
          gridLayer.value!.remove = remove;
          (gridLayer.value as any)._map = {};

          onUnmounted(() => {
            expect(gridLayer.value).toBeNull();
            expect(remove).toBeCalledTimes(1);
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
