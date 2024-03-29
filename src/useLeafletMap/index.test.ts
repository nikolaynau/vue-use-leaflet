/* eslint-disable vue/no-deprecated-dollar-scopedslots-api */
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import {
  ref,
  unref,
  nextTick,
  type Ref,
  h,
  toRef,
  defineComponent,
  provide,
  inject,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  watch
} from 'vue-demi';
import {
  latLng,
  LatLngBounds,
  latLngBounds,
  Map,
  type LatLngBoundsLiteral,
  type LatLngExpression
} from 'leaflet';
import { mount } from '../../.test';
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

  function expectMap(map: any) {
    map = unref(map);
    expect(map).toBeDefined();
    expect(map).not.toBeNull();
    expect(map).toBeInstanceOf(Map);
  }

  it('should work with default options', () => {
    const map = useLeafletMap(element);

    expectMap(map);
    expect(map.value?.getCenter()).toEqual({ lat: 0, lng: 0 });
    expect(map.value?.getZoom()).toBe(0);
  });

  it('should initialize center and zoom', () => {
    const map = useLeafletMap(element, {
      center: [1, 2],
      zoom: 2
    });

    expectMap(map);
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

    expectMap(map);
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
    expectMap(map);
  });

  it('should destroy previous map instance when element changes', async () => {
    const domElement1 = document.createElement('div');
    const domElement2 = document.createElement('div');

    const element = ref<HTMLElement | null>(domElement1);
    const map = useLeafletMap(element);
    expectMap(map);

    const map1 = map.value;
    const removeSpy = vi.spyOn(map1!, 'remove');

    element.value = domElement2;
    await nextTick();
    const map2 = map.value;

    expectMap(map2);
    expect(map1).not.toBe(map2);
    expect(removeSpy).toBeCalled();
  });

  it('should destroy map instance when element changed to null', async () => {
    const map = useLeafletMap(element);

    expectMap(map);
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
    expect(listener.mock.calls[0][0].bounds).toBeInstanceOf(LatLngBounds);
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

      expectMap(map);
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

      expectMap(map);
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

      expectMap(map);
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

      expectMap(map);
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

  it('should be created one instance of the Map class', () => {
    const factory = vi
      .fn()
      .mockImplementation((element, options) => new Map(element, options));
    const map = useLeafletMap(element, { factory });

    expectMap(map);
    expect(factory).toBeCalledTimes(1);
  });

  it('should be defined map when component is rendered', async () => {
    expect.assertions(6);

    const vm = mount(
      defineComponent({
        setup() {
          const el = ref<HTMLElement | null>(null);
          const map = useLeafletMap(el);

          watch(map, () => {
            expectMap(map);
          });

          return {
            map,
            el
          };
        },
        render() {
          return h('div', { ref: 'el' });
        }
      })
    );

    await nextTick();

    expectMap(vm.map);
  });

  it('should be created one instance map when component is mounted', async () => {
    expect.assertions(4);

    const factory = vi
      .fn()
      .mockImplementation((element, options) => new Map(element, options));

    mount(
      defineComponent({
        setup() {
          const el = ref<HTMLElement | null>(null);
          const map = useLeafletMap(el, { factory });

          watch(map, () => {
            expectMap(map);
          });

          return { el };
        },
        render() {
          return h('div', { ref: 'el' });
        }
      })
    );

    await nextTick();
    expect(factory).toBeCalledTimes(1);
  });

  it('should destroy map when component is unmounted', async () => {
    const vm = mount(
      defineComponent({
        setup() {
          const el = ref<HTMLElement | null>(null);
          const map = useLeafletMap(el);

          return { map, el };
        },
        render() {
          return h('div', { ref: 'el' });
        }
      })
    );

    await nextTick();

    const map = toRef(vm as any, 'map');
    expectMap(map);
    const spy = vi.spyOn(map.value!, 'remove');

    vm.unmount();

    expect(map.value).toBeNull();
    expect(spy).toBeCalledTimes(1);
  });

  it('should destroy instance when clear ref', () => {
    const map = useLeafletMap(element);

    expectMap(map.value);
    const removeSpy = vi.spyOn(map.value!, 'remove');

    map.value = null;

    expect(map.value).toBeNull();
    expect(removeSpy).toBeCalledTimes(1);
  });

  it('should disable destroy map when component is unmounted', async () => {
    const vm = mount(
      defineComponent({
        setup(props, { expose }) {
          const el = ref<HTMLElement | null>(null);
          const map = useLeafletMap(el, { dispose: false });

          expose({ map });

          return () => h('div', { ref: el });
        }
      })
    );

    await nextTick();

    const map = (vm as any).map;
    expectMap(map);
    const spy = vi.spyOn(map, 'remove');

    vm.unmount();

    expectMap(map);
    expect(spy).toBeCalledTimes(0);
  });

  it('should be defined map in child before unmount hook', async () => {
    expect.assertions(16);
    const mapKey = Symbol('map');

    const Map = defineComponent({
      setup() {
        const el = ref<HTMLElement | null>(null);
        const map = useLeafletMap(el);
        provide(mapKey, map);

        watch(map, () => {
          expectMap(map);
        });

        onBeforeUnmount(() => {
          expectMap(map);
        });

        onUnmounted(() => {
          expect(unref(map)).toBeNull();
        });

        return { el, map };
      },
      render() {
        const children = this.map
          ? this.$slots.default
            ? this.$slots.default()
            : this.$scopedSlots.default()
          : null;
        return h('div', { ref: 'el' }, children);
      }
    });

    const Child = defineComponent({
      setup() {
        const map = inject(mapKey) as Ref<Map | null>;

        onMounted(() => {
          expectMap(map);
        });

        onBeforeUnmount(() => {
          expectMap(map);
        });

        onUnmounted(() => {
          expectMap(map);
        });
      },
      render() {
        return null;
      }
    });

    const Root = defineComponent({
      render() {
        return h(Map, { scopedSlots: { default: () => h(Child) } }, {
          default: () => h(Child)
        } as any);
      }
    });

    const vm = mount(Root);
    await nextTick();
    vm.unmount();
  });

  it('should work with flush sync', () => {
    mount(
      defineComponent({
        setup() {
          const el = ref<HTMLElement | null>(null);
          const map = useLeafletMap(el, { flushSync: true });

          onMounted(() => {
            expectMap(map);
          });

          return { el };
        },
        render() {
          return h('div', { ref: 'el' });
        }
      })
    );
  });
});
