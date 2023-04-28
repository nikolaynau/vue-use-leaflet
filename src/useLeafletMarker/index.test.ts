import { describe, it, expect, vi } from 'vitest';
import {
  Ref,
  defineComponent,
  h,
  markRaw,
  nextTick,
  onUnmounted,
  ref
} from 'vue-demi';
import { DivIcon, Icon, LatLngExpression, Marker } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletMarker } from '.';

describe('useLeafletMarker', () => {
  it('should be create marker', () => {
    const marker = useLeafletMarker([0, 0]);
    expect(marker.value).toBeInstanceOf(Marker);
    expect(marker.value?.getLatLng()).toEqual({ lat: 0, lng: 0 });
  });

  it('should be lazy init while position is null', async () => {
    const position = ref<LatLngExpression | null>(null);
    const marker = useLeafletMarker(position);
    expect(marker.value).toBeNull();

    position.value = [0, 0];
    await nextTick();

    expect(marker.value).toBeInstanceOf(Marker);
    expect(marker.value?.getLatLng()).toEqual({ lat: 0, lng: 0 });
  });

  it('should work when change position', async () => {
    const position = ref<LatLngExpression | null>([0, 0]);
    const marker = useLeafletMarker(position);

    expect(marker.value).toBeInstanceOf(Marker);
    expect(marker.value?.getLatLng()).toEqual({ lat: 0, lng: 0 });

    position.value = [-10, -10];
    await nextTick();

    expect(marker.value?.getLatLng()).toEqual({ lat: -10, lng: -10 });

    position.value = null;
    await nextTick();

    expect(marker.value?.getLatLng()).toEqual({ lat: -10, lng: -10 });
  });

  it('should work with icon', async () => {
    const divIconA = new DivIcon();
    const divIconB = new DivIcon();
    const defIcon = new Icon.Default();
    const icon = ref<DivIcon | undefined>(markRaw(divIconA)) as Ref<
      DivIcon | undefined
    >;
    const marker = useLeafletMarker([0, 0], { icon, defIcon });

    expect(marker.value).toBeInstanceOf(Marker);
    expect(marker.value?.getIcon()).toBe(divIconA);

    icon.value = markRaw(divIconB);
    await nextTick();

    expect(marker.value?.getIcon()).toBe(divIconB);

    icon.value = undefined;
    await nextTick();

    expect(marker.value?.getIcon()).toBe(defIcon);
  });

  it('should work with opacity', async () => {
    const opacity = ref<number | undefined>(1);
    const marker = useLeafletMarker([0, 0], { opacity });

    expect(marker.value).toBeInstanceOf(Marker);
    expect(marker.value?.options.opacity).toBe(1);

    opacity.value = 0;
    await nextTick();

    expect(marker.value?.options.opacity).toBe(0);

    opacity.value = undefined;
    await nextTick();

    expect(marker.value?.options.opacity).toBe(0);
  });

  it('should work with zIndexOffset', async () => {
    const zIndexOffset = ref<number | undefined>(10);
    const marker = useLeafletMarker([0, 0], { zIndexOffset });

    expect(marker.value).toBeInstanceOf(Marker);
    expect(marker.value?.options.zIndexOffset).toBe(10);

    zIndexOffset.value = 15;
    await nextTick();

    expect(marker.value?.options.zIndexOffset).toBe(15);

    zIndexOffset.value = undefined;
    await nextTick();

    expect(marker.value?.options.zIndexOffset).toBe(15);
  });

  it('enable/disable dragging', async () => {
    const dragging = {
      enable: vi.fn(),
      disable: vi.fn()
    };

    const draggable = ref(false);
    const marker = useLeafletMarker([0, 0], { draggable });

    expect(marker.value).toBeInstanceOf(Marker);
    (marker.value as any).dragging = dragging;

    draggable.value = true;
    await nextTick();

    draggable.value = false;
    await nextTick();

    expect(dragging.enable).toBeCalledTimes(1);
    expect(dragging.disable).toBeCalledTimes(1);
  });

  it('should change position ref when dragging', () => {
    const position = ref<LatLngExpression>([0, 0]);
    const marker = useLeafletMarker(position, { draggable: true });

    expect(marker.value).toBeInstanceOf(Marker);

    marker.value?.setLatLng([-10, -10]);
    marker.value?.fire('moveend');

    expect(position.value).toEqual({ lat: -10, lng: -10 });
  });

  it('should work with factory', () => {
    const instance = new Marker([0, 0]);
    const factory = vi.fn().mockImplementation(() => instance);
    const marker = useLeafletMarker([0, 0], { factory });

    expect(marker.value).toBe(instance);

    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toEqual([0, 0]);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const marker = useLeafletMarker([0, 0]);
          expect(marker.value).toBeInstanceOf(Marker);

          const remove = vi.fn();
          marker.value!.remove = remove;
          (marker.value as any)._map = {};

          onUnmounted(() => {
            expect(marker.value).toBeNull();
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
          const marker = useLeafletMarker([0, 0], { dispose: false });
          expect(marker.value).toBeInstanceOf(Marker);

          const remove = vi.fn();
          marker.value!.remove = remove;
          (marker.value as any)._map = {};

          onUnmounted(() => {
            expect(marker.value).toBeInstanceOf(Marker);
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

  it('should destroy instance when set ref to null', () => {
    const marker = useLeafletMarker([0, 0]);
    expect(marker.value).toBeInstanceOf(Marker);

    const remove = vi.fn();
    marker.value!.remove = remove;
    (marker.value as any)._map = {};

    marker.value = null;

    expect(marker.value).toBeNull();
    expect(remove).toBeCalledTimes(1);
  });
});
