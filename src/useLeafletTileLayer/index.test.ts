import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  defineComponent,
  h,
  nextTick,
  onUnmounted,
  Ref,
  ref,
  unref
} from 'vue-demi';
import { Coords, TileLayer, TileLayerOptions } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletTileLayer } from '.';

describe('useLeafletTileLayer', () => {
  let rawUrl: string;
  let url: Ref<string | null | undefined>;

  beforeEach(() => {
    rawUrl = 'https://a/b/c';
    url = ref(rawUrl);
  });

  function expectTileLayer(layer: any, expectedUrl: string) {
    layer = unref(layer);
    expect(layer).toBeDefined();
    expect(layer).not.toBeNull();
    expect(layer).toBeInstanceOf(TileLayer);
    expect(layer.getTileUrl({ z: 1 } as Coords)).toBe(expectedUrl);
  }

  it('should create tile layer when url is defined', () => {
    const tileLayer = useLeafletTileLayer(url);
    expectTileLayer(tileLayer, rawUrl);
  });

  it('should not create tile layer when url is null', () => {
    url.value = null;
    const tileLayer = useLeafletTileLayer(url);
    expect(tileLayer.value).toBeNull();
  });

  it('should work when change url to be defined', async () => {
    url.value = null;
    const tileLayer = useLeafletTileLayer(url);
    expect(tileLayer.value).toBeNull();

    url.value = rawUrl;
    await nextTick();

    expectTileLayer(tileLayer, rawUrl);
    expect(tileLayer.value?.getTileUrl({ z: 1 } as Coords)).toBe(rawUrl);
  });

  it('should update url', async () => {
    const urlB = 'https://d/e/f';

    const tileLayer = useLeafletTileLayer(url);
    expectTileLayer(tileLayer, rawUrl);
    expect(tileLayer.value?.getTileUrl({ z: 1 } as Coords)).toBe(rawUrl);

    url.value = urlB;
    await nextTick();

    expectTileLayer(tileLayer, urlB);
    expect(tileLayer.value?.getTileUrl({ z: 1 } as Coords)).toBe(urlB);
  });

  it('should work with factory', () => {
    const options: TileLayerOptions = { tileSize: 250 };
    const instance = new TileLayer(rawUrl, options);
    const factory = vi.fn().mockImplementation(() => instance);
    const tileLayer = useLeafletTileLayer(url, { factory, ...options });

    expectTileLayer(tileLayer, rawUrl);
    expect(tileLayer.value).toBe(instance);

    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toBe(rawUrl);
    expect(factory.mock.calls[0][1]).toEqual(options);
  });

  it('should work with update', async () => {
    const opacity = ref<number | null>(null);
    const update = vi.fn(instance => {
      instance.setOpacity(opacity.value);
    });

    const tileLayer = useLeafletTileLayer(url, {
      updateSources: [{ watch: opacity, handler: update }]
    });

    expectTileLayer(tileLayer, rawUrl);
    expect(update).toBeCalledTimes(0);
    const setOpacitySpy = vi.spyOn(tileLayer.value!, 'setOpacity');

    opacity.value = 1;
    await nextTick();

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(tileLayer.value, 1, null);
    expect(setOpacitySpy).toBeCalledTimes(1);
    expect(setOpacitySpy).toBeCalledWith(1);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const tileLayer = useLeafletTileLayer(url);
          expect(tileLayer.value).toBeInstanceOf(TileLayer);
          const remove = vi.fn();
          tileLayer.value!.remove = remove;
          (tileLayer.value as any)._map = {};

          onUnmounted(() => {
            expect(tileLayer.value).toBeNull();
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

  it('should disable destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const tileLayer = useLeafletTileLayer(url, { dispose: false });
          expect(tileLayer.value).toBeInstanceOf(TileLayer);
          const remove = vi.fn();
          tileLayer.value!.remove = remove;
          (tileLayer.value as any)._map = {};

          onUnmounted(() => {
            expect(tileLayer.value).toBeInstanceOf(TileLayer);
            expect(remove).toBeCalledTimes(0);
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
    const tileLayer = useLeafletTileLayer(url);
    expect(tileLayer.value).toBeInstanceOf(TileLayer);
    const remove = vi.fn();
    tileLayer.value!.remove = remove;
    (tileLayer.value as any)._map = {};

    tileLayer.value = null;

    expect(tileLayer.value).toBeNull();
    expect(remove).toBeCalledTimes(1);
  });
});
