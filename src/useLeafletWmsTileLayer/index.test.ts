import { describe, it, expect, beforeEach, vi } from 'vitest';
import { defineComponent, h, nextTick, onUnmounted, Ref, ref } from 'vue-demi';
import { TileLayer, WMSParams } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletWmsTileLayer } from '.';

describe('useLeafletWmsTileLayer', () => {
  let wmsUrl: string;
  let url: Ref<string | null | undefined>;

  beforeEach(() => {
    wmsUrl = 'https://a/b/c';
    url = ref(wmsUrl);
  });

  it('should work with url', async () => {
    url.value = null;
    const wms = useLeafletWmsTileLayer(url);
    expect(wms.value).toBeNull();

    url.value = wmsUrl;
    await nextTick();

    expect(wms.value).toBeInstanceOf(TileLayer.WMS);
  });

  it('should init params', () => {
    const params: WMSParams = {
      layers: 'A',
      format: 'image/png',
      transparent: true,
      version: '2'
    };
    const wms = useLeafletWmsTileLayer(url, params);
    expect(wms.value?.wmsParams).toContain(params);
  });

  it('should work with params', async () => {
    const def = (TileLayer.WMS.prototype as any).defaultWmsParams;
    const wmsParams = ref<WMSParams | null>(null);
    const wms = useLeafletWmsTileLayer(url, wmsParams);

    expect(wms.value).toBeInstanceOf(TileLayer.WMS);
    expect(wms.value?.wmsParams).toContain(def);

    const newParams = {
      layers: 'A,B,C',
      format: 'image/png',
      transparent: true,
      version: '1.1.2'
    } as WMSParams;
    wmsParams.value = newParams;
    await nextTick();

    expect(wms.value?.wmsParams).toContain(newParams);

    wmsParams.value.layers = 'A,B';
    await nextTick();

    expect(wms.value?.wmsParams.layers).toBe('A,B');

    wmsParams.value = null;
    await nextTick();

    expect(wms.value?.wmsParams).toContain(def);
  });

  it('should work with factory', () => {
    const instance = new TileLayer.WMS(wmsUrl, {});
    const factory = vi.fn().mockImplementation(() => instance);
    const wms = useLeafletWmsTileLayer(url, undefined, { factory });

    expect(wms.value).toBe(instance);
    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toBe(wmsUrl);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const wms = useLeafletWmsTileLayer(url);
          expect(wms.value).toBeInstanceOf(TileLayer.WMS);
          const remove = vi.fn();
          wms.value!.remove = remove;
          (wms.value as any)._map = {};

          onUnmounted(() => {
            expect(wms.value).toBeNull();
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
