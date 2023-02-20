import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, nextTick, type Ref, h, onMounted, toRef, isVue2 } from 'vue-demi';
import {
  latLng,
  latLngBounds,
  Map,
  type LatLngBoundsLiteral,
  type LatLngExpression
} from 'leaflet';
import { useLeafletMap } from '.';

describe('useLeafletMap', () => {
  let domElement: HTMLElement;
  let element: Ref<HTMLElement | null>;

  beforeEach(() => {
    domElement = document.createElement('div');
    element = ref<HTMLElement | null>(domElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should work with default options', async () => {
    const map = useLeafletMap(element);

    expect(map.value).toBeDefined();
    expect(map.value).toBeInstanceOf(Map);
    expect(map.value?.getCenter()).toEqual({ lat: 0, lng: 0 });
    expect(map.value?.getZoom()).toBe(0);
  });

  it('should initialize center and zoom', () => {
    const map = useLeafletMap(element, {
      center: [1, 2],
      zoom: 2
    });

    expect(map.value).toBeDefined();
    expect(map.value?.options.center).toBeDefined();
    expect(map.value?.options.zoom).toBeDefined();
    expect(map.value?.getCenter()).toEqual({ lat: 1, lng: 2 });
    expect(map.value?.getZoom()).toBe(2);
  });

  it('should initialize bounds', () => {
    const map = useLeafletMap(element, {
      bounds: [
        [1, 2],
        [3, 4]
      ]
    });

    expect(map.value).toBeDefined();
    expect(map.value?.options.center).toBeUndefined();
    expect(map.value?.options.zoom).toBeUndefined();

    const resultBounds = map.value?.getBounds();
    expect(resultBounds?.getEast()).toBeCloseTo(2.8, 1);
    expect(resultBounds?.getNorth()).toBeCloseTo(1.4, 1);
    expect(resultBounds?.getSouth()).toBeCloseTo(1.4, 1);
    expect(resultBounds?.getWest()).toBeCloseTo(2.8, 1);
  });

  it('should work when lazy element assignment', async () => {
    element.value = null;
    const map = useLeafletMap(element);

    expect(map.value).toBeNull();
    element.value = domElement!;
    await nextTick();
    expect(map.value).toBeDefined();
  });

  it('should destroy previous map instance when element changes', async () => {
    const domElement1 = document.createElement('div');
    const domElement2 = document.createElement('div');

    const element = ref<HTMLElement | null>(domElement1);
    const map = useLeafletMap(element);
    expect(map.value).toBeDefined();

    const map1 = map.value;
    const removeSpy = vi.spyOn(map1!, 'remove');

    element.value = domElement2;
    await nextTick();
    const map2 = map.value;

    expect(map2).toBeDefined();
    expect(map1).not.toBe(map2);
    expect(removeSpy).toBeCalled();
  });

  it('should destroy map instance when element changed to null', async () => {
    const map = useLeafletMap(element);

    expect(map.value).toBeDefined();
    const removeSpy = vi.spyOn(map.value!, 'remove');

    element.value = null;
    await nextTick();

    expect(map.value).toBeNull();
    expect(removeSpy).toBeCalled();
  });

  it('should trigger onViewChanged when view changed', () => {
    const listener = vi.fn();
    const map = useLeafletMap(element, {
      onViewChanged: listener
    });

    map.value?.setView([1, 2], 3, { animate: false });

    expect(listener).toBeCalledTimes(1);
    expect(listener.mock.calls[0][0].center).toEqual({ lat: 1, lng: 2 });
    expect(listener.mock.calls[0][0].zoom).toBe(3);
    expect(listener.mock.calls[0][0].bounds).toBeDefined();
  });

  it.each([
    [false, 'fitBounds'],
    [true, 'flyToBounds']
  ])(
    'should change the bounds (useFly: %s, method: %s)',
    async (useFly, methodName) => {
      const bounds = ref<LatLngBoundsLiteral>([
        [1, 2],
        [3, 4]
      ]);
      const map = useLeafletMap(element, {
        bounds,
        useFly
      });

      expect(map.value).toBeDefined();
      const spy = vi.spyOn(map.value!, methodName as any);

      bounds.value = [
        [5, 6],
        [7, 8]
      ];
      await nextTick();

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual(
        latLngBounds([
          [5, 6],
          [7, 8]
        ])
      );
    }
  );

  it.each([
    [false, 'setView'],
    [true, 'flyTo']
  ])(
    'should change the center and zoom (useFly: %s, method: %s)',
    async (useFly, methodName) => {
      const center = ref<LatLngExpression>([1, 2]);
      const zoom = ref(1);
      const map = useLeafletMap(element, {
        center,
        zoom,
        useFly
      });

      expect(map.value).toBeDefined();
      const spy = vi.spyOn(map.value!, methodName as any);

      center.value = [3, 4];
      zoom.value = 2;
      await nextTick();

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual([3, 4]);
      expect(spy.mock.calls[0][1]).toBe(2);
    }
  );

  it.each([
    [false, 'panTo'],
    [true, 'flyTo']
  ])(
    'should change the center (useFly: %s, method: %s)',
    async (useFly, methodName) => {
      const center = ref<LatLngExpression>([1, 2]);
      const map = useLeafletMap(element, {
        center,
        useFly
      });

      expect(map.value).toBeDefined();
      const spy = vi.spyOn(map.value!, methodName as any);

      center.value = [3, 4];
      await nextTick();

      expect(spy).toBeCalledTimes(1);
      expect(spy.mock.calls[0][0]).toEqual([3, 4]);
    }
  );

  it.each([
    [false, 'setZoom'],
    [true, 'flyTo']
  ])(
    'should change the zoom (useFly: %s, method: %s)',
    async (useFly, methodName) => {
      const center = ref<LatLngExpression>([1, 2]);
      const zoom = ref(1);
      const map = useLeafletMap(element, {
        center,
        zoom,
        useFly
      });

      expect(map.value).toBeDefined();
      const spy = vi.spyOn(map.value!, methodName as any);

      zoom.value = 2;
      await nextTick();

      expect(spy).toBeCalledTimes(1);
      if (useFly) {
        expect(spy.mock.calls[0][0]).toEqual(latLng([1, 2]));
        expect(spy.mock.calls[0][1]).toBe(2);
      } else {
        expect(spy.mock.calls[0][0]).toBe(2);
      }
    }
  );

  it.skipIf(isVue2)('should be defined map in the onMounted hook', () => {
    const wrapper = mount({
      setup(props, { expose }) {
        const el = ref<HTMLElement | null>(null);
        const map = useLeafletMap(el);

        expose({
          map
        });

        onMounted(() => {
          expect(map.value).toBeInstanceOf(Map);
        });

        return () => h('div', { ref: el });
      }
    });

    expect((wrapper.vm as any).map).toBeInstanceOf(Map);
  });

  it('should be created one instance of the Map class', () => {
    const factory = vi
      .fn()
      .mockImplementation((element, options) => new Map(element, options));
    const map = useLeafletMap(element, { factory });

    expect(map.value).toBeDefined();
    expect(factory).toBeCalledTimes(1);
  });

  it.skipIf(isVue2)(
    'should be created one instance map after call onMounted hook in component',
    async () => {
      const factory = vi
        .fn()
        .mockImplementation((element, options) => new Map(element, options));

      mount({
        setup() {
          const el = ref<HTMLElement | null>(null);
          const map = useLeafletMap(el, { factory });

          onMounted(() => {
            expect(map.value).toBeDefined();
          });

          return () => h('div', { ref: el });
        }
      });

      expect(factory).toBeCalledTimes(1);
      await nextTick();
      expect(factory).toBeCalledTimes(1);
    }
  );

  it.skipIf(isVue2)('should destroy map in the onUnmounted hook', () => {
    const wrapper = mount({
      setup(props, { expose }) {
        const el = ref<HTMLElement | null>(null);
        const map = useLeafletMap(el);

        expose({ map });

        return () => h('div', { ref: el });
      }
    });

    const map = toRef(wrapper.vm as any, 'map');
    expect(map.value).toBeDefined();
    const spy = vi.spyOn(map.value!, 'remove');

    expect(spy).toBeCalledTimes(0);
    wrapper.unmount();
    expect(spy).toBeCalledTimes(1);
  });
});
