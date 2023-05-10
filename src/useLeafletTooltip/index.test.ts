import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import {
  type LatLngExpression,
  type LatLngTuple,
  type PointExpression,
  type Direction,
  Layer,
  Tooltip,
  latLng
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

  it('should work with content as dom element', async () => {
    const defOptions = Tooltip.prototype.options;
    const contentRef = ref<HTMLElement | null>(null);
    const instance = useLeafletTooltip(point, { content: contentRef });

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.content).toBe(defOptions.content);
    expect(instance.value?.getContent()).toBeUndefined();

    const div = document.createElement('div');
    contentRef.value = div;
    await nextTick();

    expect(instance.value?.getContent()).toBe(div);

    contentRef.value = null;
    await nextTick();

    expect(instance.value?.getContent()).toBe(defOptions.content);
  });

  it('should work with content as function', async () => {
    const fn = vi.fn().mockImplementation(() => 'a');

    const defOptions = Tooltip.prototype.options;
    const contentRef = ref<((layer: Layer) => string) | null>(null);
    const instance = useLeafletTooltip(point, { content: contentRef });

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.content).toBe(defOptions.content);
    expect(instance.value?.getContent()).toBeUndefined();

    contentRef.value = fn;
    await nextTick();

    expect(instance.value?.getContent()).toBe(fn);
    (instance.value as any)._initLayout();
    (instance.value as any)._updateContent();

    contentRef.value = null;
    await nextTick();

    expect(instance.value?.getContent()).toBe(defOptions.content);

    expect(fn).toBeCalledTimes(1);
  });

  it('should work with class name', async () => {
    const defOptions = Tooltip.prototype.options;
    const className = ref<string | null>(null);
    const instance = useLeafletTooltip(point, { className });

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.className).toBe(defOptions.className);

    (instance.value as any)._initLayout();
    const classList = instance.value!.getElement()!.classList;

    className.value = 'classA classB';
    await nextTick();

    expect(instance.value?.options.className).toBe('classA classB');
    expect(classList.contains('classA')).toBeTruthy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = 'classB';
    await nextTick();

    expect(instance.value?.options.className).toBe('classB');
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = null;
    await nextTick();

    expect(instance.value?.options.className).toBe(defOptions.className);
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it('should work with opacity', async () => {
    const defOptions = Tooltip.prototype.options;
    const opacity = ref<number | null>(null);
    const instance = useLeafletTooltip(point, { opacity });

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.opacity).toBe(defOptions.opacity);

    opacity.value = 0.5;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(0.5);

    opacity.value = null;
    await nextTick();

    expect(instance.value?.options.opacity).toBe(defOptions.opacity);
  });

  it('should work with offset', async () => {
    const defOptions = Tooltip.prototype.options;
    const offset = ref<PointExpression | null>(null);
    const instance = useLeafletTooltip(point, { offset });

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.offset).toBe(defOptions.offset);
    const spy = vi.spyOn(instance.value!, 'update');

    offset.value = [1, 2];
    await nextTick();

    expect(instance.value?.options.offset).toEqual([1, 2]);

    offset.value = null;
    await nextTick();

    expect(instance.value?.options.offset).toBe(defOptions.offset);

    expect(spy).toBeCalledTimes(2);
  });

  it('should work with direction', async () => {
    const defOptions = Tooltip.prototype.options;
    const direction = ref<Direction | null>(null);
    const instance = useLeafletTooltip(point, { direction });

    expect(instance.value).toBeInstanceOf(Tooltip);
    expect(instance.value?.options.direction).toBe(defOptions.direction);
    const spy = vi.spyOn(instance.value!, 'update');

    direction.value = 'center';
    await nextTick();

    expect(instance.value?.options.direction).toBe('center');

    direction.value = null;
    await nextTick();

    expect(instance.value?.options.direction).toBe(defOptions.direction);

    expect(spy).toBeCalledTimes(2);
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
