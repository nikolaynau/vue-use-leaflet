import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick, ref, defineComponent, onUnmounted, h } from 'vue-demi';
import {
  type LatLngExpression,
  type LatLngTuple,
  type PointExpression,
  Layer,
  latLng,
  Popup,
  PopupOptions
} from 'leaflet';
import { mount } from '../../.test';
import { type PopupReactiveProperty, useLeafletPopup } from '.';

describe('useLeafletPopup', () => {
  let point: LatLngExpression;

  beforeEach(() => {
    point = [-10, -5];
  });

  it('should work init', () => {
    const instance = useLeafletPopup(point);
    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });

  it('should work lazy init', async () => {
    const pointRef = ref<LatLngExpression | null>(null);
    const instance = useLeafletPopup(pointRef);
    expect(instance.value).toBeNull();

    pointRef.value = point;
    await nextTick();

    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));
  });

  it('should work init reactive options', () => {
    const options = {
      offset: [1, 2],
      maxWidth: 10,
      minWidth: 1,
      maxHeight: 20,
      keepInView: true,
      autoPan: false,
      autoPanPaddingTopLeft: [1, 2],
      autoPanPaddingBottomRight: [3, 4],
      autoPanPadding: [8, 9],
      className: 'a b',
      content: 'text'
    } as PopupOptions;

    const instance = useLeafletPopup(point, options);
    expect(instance.value).toBeInstanceOf(Popup);

    for (const key in options) {
      expect(instance.value?.options[key]).toEqual(options[key]);
    }
  });

  it('should work with source', () => {
    const layer = new Layer();
    const instance = useLeafletPopup(undefined, { source: layer });
    expect(instance.value).toBeInstanceOf(Popup);
    expect((instance.value as any)._source).toBe(layer);
  });

  it('should work when changing latlng', async () => {
    const newPoint: LatLngTuple = [-5, -15];
    const pointRef = ref<LatLngExpression | null>(null);
    const instance = useLeafletPopup(pointRef);
    expect(instance.value).toBeNull();

    pointRef.value = point;
    await nextTick();

    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.getLatLng()).toEqual(latLng(point));

    pointRef.value = newPoint;
    await nextTick();

    expect(instance.value?.getLatLng()).toEqual(latLng(newPoint));

    pointRef.value = null;
    await nextTick();

    expect(instance.value?.getLatLng()).toEqual(latLng(newPoint));
  });

  it('should work with content as string', async () => {
    const defOptions = Popup.prototype.options;
    const contentRef = ref<string | null>(null);
    const instance = useLeafletPopup(point, { content: contentRef });

    expect(instance.value).toBeInstanceOf(Popup);
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
    const defOptions = Popup.prototype.options;
    const contentRef = ref<HTMLElement | null>(null);
    const instance = useLeafletPopup(point, { content: contentRef });

    expect(instance.value).toBeInstanceOf(Popup);
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

    const defOptions = Popup.prototype.options;
    const contentRef = ref<((layer: Layer) => string) | null>(null);
    const instance = useLeafletPopup(point, { content: contentRef });

    expect(instance.value).toBeInstanceOf(Popup);
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
    const defOptions = Popup.prototype.options;
    const className = ref<string | null>(null);
    const instance = useLeafletPopup(point, { className });

    expect(instance.value).toBeInstanceOf(Popup);
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

  it('should work with offset', async () => {
    const defOptions = Popup.prototype.options;
    const offset = ref<PointExpression | null>(null);
    const instance = useLeafletPopup(point, { offset });

    expect(instance.value).toBeInstanceOf(Popup);
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

  it('should work with max width', async () => {
    const defOptions = Popup.prototype.options;
    const property = ref<number | null>(null);
    const instance = useLeafletPopup(point, { maxWidth: property });

    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.options.maxWidth).toBe(defOptions.maxWidth);
    const spy = vi.spyOn(instance.value!, 'update');

    property.value = 1;
    await nextTick();

    expect(instance.value?.options.maxWidth).toBe(1);

    property.value = null;
    await nextTick();

    expect(instance.value?.options.maxWidth).toBe(defOptions.maxWidth);

    expect(spy).toBeCalledTimes(2);
  });

  it('should work with min width', async () => {
    const defOptions = Popup.prototype.options;
    const property = ref<number | null>(null);
    const instance = useLeafletPopup(point, { minWidth: property });

    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.options.minWidth).toBe(defOptions.minWidth);
    const spy = vi.spyOn(instance.value!, 'update');

    property.value = 1;
    await nextTick();

    expect(instance.value?.options.minWidth).toBe(1);

    property.value = null;
    await nextTick();

    expect(instance.value?.options.minWidth).toBe(defOptions.minWidth);

    expect(spy).toBeCalledTimes(2);
  });

  it('should work with max height', async () => {
    const defOptions = Popup.prototype.options;
    const property = ref<number | null>(null);
    const instance = useLeafletPopup(point, { maxHeight: property });

    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.options.maxHeight).toBe(defOptions.maxHeight);
    const spy = vi.spyOn(instance.value!, 'update');

    property.value = 1;
    await nextTick();

    expect(instance.value?.options.maxHeight).toBe(1);

    property.value = null;
    await nextTick();

    expect(instance.value?.options.maxHeight).toBe(defOptions.maxHeight);

    expect(spy).toBeCalledTimes(2);
  });

  it.each([
    ['autoPan', false],
    ['autoPanPaddingTopLeft', [1, 2]],
    ['autoPanPaddingBottomRight', [3, 4]],
    ['autoPanPadding', [5, 6]]
  ] as [PopupReactiveProperty, any][])(
    'should work with %s',
    async (propertyName, propertyValue) => {
      const property = ref<any>(null);
      const defOptions = Popup.prototype.options;
      const instance = useLeafletPopup(point, { [propertyName]: property });

      expect(instance.value).toBeInstanceOf(Popup);
      expect(instance.value?.options[propertyName]).toBe(
        defOptions[propertyName]
      );

      property.value = propertyValue;
      await nextTick();

      expect(instance.value?.options[propertyName]).toBe(propertyValue);

      property.value = null;
      await nextTick();

      expect(instance.value?.options[propertyName]).toBe(
        defOptions[propertyName]
      );
    }
  );

  it('should work with keep in view', async () => {
    const obj = {
      on: vi.fn(),
      off: vi.fn()
    };

    const defOptions = Popup.prototype.options;
    const property = ref<boolean | null>(null);
    const instance = useLeafletPopup(point, { keepInView: property });

    expect(instance.value).toBeInstanceOf(Popup);
    expect(instance.value?.options.keepInView).toBe(defOptions.keepInView);

    (instance.value as any)._map = obj;

    property.value = true;
    await nextTick();

    expect(instance.value?.options.keepInView).toBe(true);

    property.value = false;
    await nextTick();

    expect(instance.value?.options.keepInView).toBe(false);

    property.value = null;
    await nextTick();

    expect(instance.value?.options.keepInView).toBe(defOptions.keepInView);

    expect(obj.on).toBeCalledTimes(1);
    expect(obj.off).toBeCalledTimes(3);

    expect(obj.on).toBeCalledWith(
      'moveend',
      (instance.value as any)._adjustPan
    );
    expect(obj.off).toBeCalledWith(
      'moveend',
      (instance.value as any)._adjustPan
    );
  });

  it('should work with factory', () => {
    const tooltip = new Popup(point);
    const factory = vi.fn().mockImplementation(() => tooltip);
    const instance = useLeafletPopup(point, { factory });

    expect(instance.value).toBe(tooltip);
    expect(factory).toBeCalledTimes(1);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletPopup(point);
          expect(instance.value).toBeInstanceOf(Popup);
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
