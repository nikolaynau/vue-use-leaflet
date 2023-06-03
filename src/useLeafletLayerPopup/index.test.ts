import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  nextTick,
  ref,
  defineComponent,
  onUnmounted,
  h,
  markRaw,
  Ref
} from 'vue-demi';
import { Layer, PointExpression, Popup, PopupOptions, Util } from 'leaflet';
import { mount } from '../../.test';
import { LayerPopupReactiveProperty, useLeafletLayerPopup } from '.';

describe('useLeafletLayerPopup', () => {
  let layer: Layer;
  let layerRef: Ref<Layer | null>;
  let contentA: string;
  let contentB: string;

  beforeEach(() => {
    layer = new Layer();
    layerRef = ref(markRaw(layer));
    contentA = 'a';
    contentB = 'b';
  });

  it('should work with empty init', () => {
    expect(useLeafletLayerPopup(null, null).popup.value).toBeNull();
    expect(useLeafletLayerPopup(undefined, undefined).popup.value).toBeNull();
  });

  it('should work init', () => {
    const { popup } = useLeafletLayerPopup(layer, contentA);
    expect(popup.value).toBeInstanceOf(Popup);
    expect(layer.getPopup()).toBeInstanceOf(Popup);
    expect(popup.value?.getContent()).toBe(contentA);
  });

  it.each([[null], [undefined], [ref(null)], [ref(undefined)]])(
    'should work with empty content',
    val => {
      const defOptions = Popup.prototype.options;
      expect(useLeafletLayerPopup(layer, val).popup.value?.getContent()).toBe(
        defOptions.content
      );
    }
  );

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
      className: 'a b'
    } as PopupOptions;

    const { popup } = useLeafletLayerPopup(layer, contentA, options);
    expect(popup.value).toBeInstanceOf(Popup);

    for (const key in options) {
      expect(popup.value?.options[key]).toEqual(options[key]);
    }
  });

  it('should work manual bind and unbind', () => {
    const { unbind, bind, popup } = useLeafletLayerPopup(layer, contentA, {
      autoBind: false
    });
    expect(popup.value).toBeNull();

    bind();

    expect(popup.value).toBeInstanceOf(Popup);
    expect(popup.value?.getContent()).toBe(contentA);

    unbind();

    expect(popup.value).toBeNull();
  });

  it('should unbind when set popup null', () => {
    const { popup } = useLeafletLayerPopup(layer);
    expect(popup.value).toBeInstanceOf(Popup);
    expect(layer.getPopup()).toBeInstanceOf(Popup);

    popup.value = null;

    expect(popup.value).toBeNull();
    expect(layer.getPopup()).toBeNull();
  });

  it('should work when change source', async () => {
    const newLayer = new Layer();
    layerRef.value = null;
    const { popup } = useLeafletLayerPopup(layerRef);
    expect(popup.value).toBeNull();
    expect(layer.getPopup()).toBeUndefined();

    layerRef.value = layer;
    await nextTick();

    expect(popup.value).toBeInstanceOf(Popup);
    expect(layer.getPopup()).toBeInstanceOf(Popup);

    layerRef.value = newLayer;
    await nextTick();

    expect(layer.getPopup()).toBeNull();
    expect(newLayer.getPopup()).toBeInstanceOf(Popup);
    expect(popup.value).toBeInstanceOf(Popup);
    expect(Util.stamp(popup.value)).toBe(Util.stamp(newLayer.getPopup()));

    layerRef.value = null;
    await nextTick();

    expect(newLayer.getPopup()).toBeNull();
    expect(popup.value).toBeNull();
  });

  it('should work with visible', async () => {
    const visible = ref(false);
    const openSpy = vi.spyOn(layer, 'openPopup');
    const closeSpy = vi.spyOn(layer, 'closePopup');
    const { visible: _visible, popup } = useLeafletLayerPopup(layer, contentA, {
      visible
    });
    expect(popup.value).toBeInstanceOf(Popup);
    expect(_visible.value).toBe(visible.value);
    expect(openSpy).not.toBeCalled();
    expect(closeSpy).not.toBeCalled();

    visible.value = true;
    await nextTick();

    visible.value = false;
    await nextTick();

    expect(openSpy).toBeCalledTimes(1);
    expect(closeSpy).toBeCalledTimes(1);
  });

  it('should work control functions', () => {
    const openSpy = vi.spyOn(layer, 'openPopup');
    const closeSpy = vi.spyOn(layer, 'closePopup');
    const isOpenedSpy = vi.spyOn(layer, 'isPopupOpen');
    const { open, close, isOpened } = useLeafletLayerPopup(layer, contentA);

    expect(openSpy).not.toBeCalled();
    expect(closeSpy).not.toBeCalled();
    expect(isOpenedSpy).not.toBeCalled();

    open();
    close();
    isOpened();

    expect(openSpy).toBeCalledTimes(1);
    expect(closeSpy).toBeCalledTimes(1);
    expect(isOpenedSpy).toBeCalledTimes(1);
  });

  it('should work with content', async () => {
    const defOptions = Popup.prototype.options;
    const contentRef = ref<string | null>(null);
    const { popup } = useLeafletLayerPopup(layer, contentRef);

    expect(popup.value).toBeInstanceOf(Popup);
    expect(popup.value?.options.content).toBe(defOptions.content);
    expect(popup.value?.getContent()).toBe(defOptions.content);
    const spy = vi.spyOn(layer, 'setPopupContent');

    contentRef.value = contentA;
    await nextTick();

    expect(popup.value?.getContent()).toBe(contentA);

    contentRef.value = contentB;
    await nextTick();

    expect(popup.value?.getContent()).toBe(contentB);

    contentRef.value = null;
    await nextTick();

    expect(popup.value?.getContent()).toBe(defOptions.content);

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBe(contentA);
    expect(spy.mock.calls[1][0]).toBe(contentB);
    expect(spy.mock.calls[2][0]).toBe(defOptions.content);
  });

  it.each([
    ['offset', [1, 2]],
    ['maxWidth', 255],
    ['minWidth', 20],
    ['maxHeight', 150]
  ] as [LayerPopupReactiveProperty, any][])(
    'should work with %s',
    async (propName, propValue) => {
      const defOptions = Popup.prototype.options;
      const property = ref<PointExpression | null>(null);
      const { popup } = useLeafletLayerPopup(layer, undefined, {
        [propName]: property
      });

      expect(popup.value).toBeInstanceOf(Popup);
      expect(popup.value?.options[propName]).toBe(defOptions[propName]);
      const spy = vi.spyOn(popup.value!, 'update');

      property.value = propValue;
      await nextTick();

      expect(popup.value?.options[propName]).toEqual(propValue);

      property.value = null;
      await nextTick();

      expect(popup.value?.options[propName]).toBe(defOptions[propName]);
      expect(spy).toBeCalledTimes(2);
    }
  );

  it.each([
    ['autoPan', true],
    ['autoPanPaddingTopLeft', [1, 2]],
    ['autoPanPaddingBottomRight', [3, 4]],
    ['autoPanPadding', [5, 6]]
  ] as [LayerPopupReactiveProperty, any][])(
    'should work with %s',
    async (propName, propValue) => {
      const defOptions = Popup.prototype.options;
      const property = ref<PointExpression | null>(null);
      const { popup } = useLeafletLayerPopup(layer, undefined, {
        [propName]: property
      });

      expect(popup.value).toBeInstanceOf(Popup);
      expect(popup.value?.options[propName]).toBe(defOptions[propName]);

      property.value = propValue;
      await nextTick();

      expect(popup.value?.options[propName]).toEqual(propValue);

      property.value = null;
      await nextTick();

      expect(popup.value?.options[propName]).toBe(defOptions[propName]);
    }
  );

  it('should work with keep in view', async () => {
    const defOptions = Popup.prototype.options;
    const keepInView = ref<boolean | null>(null);
    const { popup } = useLeafletLayerPopup(layer, undefined, {
      keepInView
    });

    expect(popup.value).toBeInstanceOf(Popup);
    expect(popup.value?.options.keepInView).toBe(defOptions.keepInView);

    const map = { off: vi.fn(), on: vi.fn() };

    keepInView.value = true;
    (layer as any)._map = map;
    await nextTick();

    expect(popup.value?.options.keepInView).toEqual(true);

    keepInView.value = null;
    await nextTick();

    expect(popup.value?.options.keepInView).toBe(defOptions.keepInView);
    expect(map.off).toBeCalledTimes(2);
    expect(map.on).toBeCalledTimes(1);
    expect(map.off).toBeCalledWith('moveend', (layer as any)._adjustPan);
    expect(map.on).toBeCalledWith('moveend', (layer as any)._adjustPan);
  });

  it('should work with class name', async () => {
    const defOptions = Popup.prototype.options;
    const className = ref<string | null>(null);
    const { popup } = useLeafletLayerPopup(layer, undefined, { className });

    expect(popup.value).toBeInstanceOf(Popup);
    expect(popup.value?.options.className).toBe(defOptions.className);

    (popup.value as any)._initLayout();
    const classList = popup.value!.getElement()!.classList;

    className.value = 'classA classB';
    await nextTick();

    expect(popup.value?.options.className).toBe('classA classB');
    expect(classList.contains('classA')).toBeTruthy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = 'classB';
    await nextTick();

    expect(popup.value?.options.className).toBe('classB');
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = null;
    await nextTick();

    expect(popup.value?.options.className).toBe(defOptions.className);
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it('should unbind when component is unmounted', () => {
    expect.assertions(4);

    const vm = mount(
      defineComponent({
        setup() {
          const { popup } = useLeafletLayerPopup(layer);
          expect(popup.value).toBeInstanceOf(Popup);
          expect(layer.getPopup()).toBeInstanceOf(Popup);

          onUnmounted(() => {
            expect(popup.value).toBeNull();
            expect(layer.getPopup()).toBeNull();
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
