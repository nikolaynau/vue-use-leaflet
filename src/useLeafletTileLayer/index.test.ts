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
import { isDefined } from '@vueuse/shared';
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

  it('should destroy when change url to null', async () => {
    const tileLayer = useLeafletTileLayer(url);
    expectTileLayer(tileLayer, rawUrl);
    const spy = vi.spyOn(tileLayer.value!, 'remove');

    url.value = null;
    await nextTick();

    expect(tileLayer.value).toBeNull();
    expect(spy).toBeCalledTimes(1);
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

  it('should not set instance when factory return is null', async () => {
    const tileSize = ref<number | null>(null);
    let instance: TileLayer | undefined = undefined;

    const factory = vi.fn().mockImplementation((url, options) => {
      if (!isDefined(tileSize)) {
        return null;
      }
      instance = new TileLayer(url, { ...options, tileSize: unref(tileSize)! });
      return instance;
    });
    const tileLayer = useLeafletTileLayer(url, { factory });
    expect(tileLayer.value).toBeNull();

    tileSize.value = 250;
    await nextTick();

    expectTileLayer(tileLayer, rawUrl);
    expect(tileLayer.value).toBe(instance);
    expect(tileLayer.value?.getTileSize()).toEqual({ x: 250, y: 250 });
  });

  it('should destroy when component is unmounted', async () => {
    const vm = mount(
      defineComponent({
        setup() {
          const tileLayer = useLeafletTileLayer(url);

          expect(tileLayer.value).toBeInstanceOf(TileLayer);
          const spy = vi.spyOn(tileLayer.value!, 'remove');

          onUnmounted(() => {
            expect(tileLayer.value).toBeNull();
            expect(spy).toBeCalledTimes(1);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });

  it('should disable destroy when component is unmounted', async () => {
    const vm = mount(
      defineComponent({
        setup() {
          const tileLayer = useLeafletTileLayer(url, { dispose: false });

          expect(tileLayer.value).toBeInstanceOf(TileLayer);
          const spy = vi.spyOn(tileLayer.value!, 'remove');

          onUnmounted(() => {
            expect(tileLayer.value).toBeInstanceOf(TileLayer);
            expect(spy).toBeCalledTimes(0);
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
