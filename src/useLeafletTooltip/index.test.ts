import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import {
  type LatLngExpression,
  Tooltip,
  latLng,
  Layer,
  LatLngTuple
} from 'leaflet';
import { mount } from '../../.test';
import { useLeafletTooltip } from '.';

describe('useLeafletTooltip', () => {
  let point: LatLngExpression;

  beforeEach(() => {
    point = [-10, -5];
  });

  it('should work init', () => {
    const instance = useLeafletTooltip(point);
    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });

  it('should work lazy init', async () => {
    const pointRef = ref<LatLngExpression | null>(null);
    const instance = useLeafletTooltip(pointRef);
    expect(instance.value).toBeNull();

    pointRef.value = point;
    await nextTick();

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });

  it('should work with source', () => {
    const layer = new Layer();
    const instance = useLeafletTooltip(undefined, { source: layer });
    expect(instance.value).toBeInstanceOf(Tooltip);
    expect((instance.value as any)._source).toBe(layer);
  });

  it('should work when changing latlng', async () => {
    const newPoint: LatLngTuple = [-5, -15];
    const pointRef = ref<LatLngExpression | null>(null);
    const instance = useLeafletTooltip(pointRef);
    expect(instance.value).toBeNull();

    pointRef.value = point;
    await nextTick();

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));

    pointRef.value = newPoint;
    await nextTick();

    expect(instance.value?.getLatLng()).toEqual(latLng(newPoint));

    pointRef.value = null;
    await nextTick();

    expect(instance.value?.getLatLng()).toEqual(latLng(newPoint));
  });

  it('should work with content as string', async () => {
    const defOptions = Tooltip.prototype.options;
    const contentRef = ref<string | null>(null);
    const instance = useLeafletTooltip(point, { content: contentRef });
    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.content).toBe(defOptions.content);
    expect(instance.value?.getContent()).toBeUndefined();

    contentRef.value = 'a';
    await nextTick();

    expect(instance.value?.getContent()).toBe('a');

    contentRef.value = 'b';
    await nextTick();

    expect(instance.value?.getContent()).toBe('b');

    contentRef.value = null;
    await nextTick();

    expect(instance.value?.getContent()).toBe(defOptions.content);
  });

  it('should work with factory', () => {
    const tooltip = new Tooltip(point);
    const factory = vi.fn().mockImplementation(() => tooltip);
    const instance = useLeafletTooltip(point, { factory });

    expect(instance.value).toBe(tooltip);
    expect(factory).toBeCalledTimes(1);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletTooltip(point);
          expect(instance.value).toBeInstanceOf(Tooltip);
          const remove = vi.fn();
          instance.value!.remove = remove;
          (instance.value as any)._map = {};

          onUnmounted(() => {
            expect(instance.value).toBeNull();
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
