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
import { Direction, Layer, PointExpression, Tooltip, Util } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletLayerTooltip } from '.';

describe('useLeafletLayerTooltip', () => {
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
    expect(useLeafletLayerTooltip(null, null).tooltip.value).toBeNull();
    expect(
      useLeafletLayerTooltip(undefined, undefined).tooltip.value
    ).toBeNull();
  });

  it('should work init', () => {
    const { tooltip } = useLeafletLayerTooltip(layer, contentA);
    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(layer.getTooltip()).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.getContent()).toBe(contentA);
  });

  it.each([[null], [undefined], [ref(null)], [ref(undefined)]])(
    'should work with empty content',
    val => {
      const defOptions = Tooltip.prototype.options;
      expect(
        useLeafletLayerTooltip(layer, val).tooltip.value?.getContent()
      ).toBe(defOptions.content);
    }
  );

  it('should work manual bind and unbind', () => {
    const { unbind, bind, tooltip } = useLeafletLayerTooltip(layer, contentA, {
      autoBind: false
    });
    expect(tooltip.value).toBeNull();

    bind();

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.getContent()).toBe(contentA);

    unbind();

    expect(tooltip.value).toBeNull();
  });

  it('should unbind when set tooltip null', () => {
    const { tooltip } = useLeafletLayerTooltip(layer);
    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(layer.getTooltip()).toBeInstanceOf(Tooltip);

    tooltip.value = null;

    expect(tooltip.value).toBeNull();
    expect(layer.getTooltip()).toBeNull();
  });

  it('should work when change source', async () => {
    const newLayer = new Layer();
    layerRef.value = null;
    const { tooltip } = useLeafletLayerTooltip(layerRef);
    expect(tooltip.value).toBeNull();
    expect(layer.getTooltip()).toBeUndefined();

    layerRef.value = layer;
    await nextTick();

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(layer.getTooltip()).toBeInstanceOf(Tooltip);

    layerRef.value = newLayer;
    await nextTick();

    expect(layer.getTooltip()).toBeNull();
    expect(newLayer.getTooltip()).toBeInstanceOf(Tooltip);
    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(Util.stamp(tooltip.value)).toBe(Util.stamp(newLayer.getTooltip()));

    layerRef.value = null;
    await nextTick();

    expect(newLayer.getTooltip()).toBeNull();
    expect(tooltip.value).toBeNull();
  });

  it('should work with visible', async () => {
    const visible = ref(false);
    const openSpy = vi.spyOn(layer, 'openTooltip');
    const closeSpy = vi.spyOn(layer, 'closeTooltip');
    const { visible: _visible, tooltip } = useLeafletLayerTooltip(
      layer,
      contentA,
      {
        visible
      }
    );
    expect(tooltip.value).toBeInstanceOf(Tooltip);
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
    const openSpy = vi.spyOn(layer, 'openTooltip');
    const closeSpy = vi.spyOn(layer, 'closeTooltip');
    const isOpenedSpy = vi.spyOn(layer, 'isTooltipOpen');
    const { open, close, isOpened } = useLeafletLayerTooltip(layer, contentA);

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
    const defOptions = Tooltip.prototype.options;
    const contentRef = ref<string | null>(null);
    const { tooltip } = useLeafletLayerTooltip(layer, contentRef);

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.options.content).toBe(defOptions.content);
    expect(tooltip.value?.getContent()).toBe(defOptions.content);
    const spy = vi.spyOn(layer, 'setTooltipContent');

    contentRef.value = contentA;
    await nextTick();

    expect(tooltip.value?.getContent()).toBe(contentA);

    contentRef.value = contentB;
    await nextTick();

    expect(tooltip.value?.getContent()).toBe(contentB);

    contentRef.value = null;
    await nextTick();

    expect(tooltip.value?.getContent()).toBe(defOptions.content);

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls[0][0]).toBe(contentA);
    expect(spy.mock.calls[1][0]).toBe(contentB);
    expect(spy.mock.calls[2][0]).toBe(defOptions.content);
  });

  it('should work with offset', async () => {
    const defOptions = Tooltip.prototype.options;
    const offset = ref<PointExpression | null>(null);
    const { tooltip } = useLeafletLayerTooltip(layer, undefined, { offset });

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.options.offset).toBe(defOptions.offset);
    const spy = vi.spyOn(tooltip.value!, 'update');

    offset.value = [1, 2];
    await nextTick();

    expect(tooltip.value?.options.offset).toEqual([1, 2]);

    offset.value = null;
    await nextTick();

    expect(tooltip.value?.options.offset).toBe(defOptions.offset);

    expect(spy).toBeCalledTimes(2);
  });

  it('should work with direction', async () => {
    const defOptions = Tooltip.prototype.options;
    const direction = ref<Direction | null>(null);
    const { tooltip } = useLeafletLayerTooltip(layer, undefined, { direction });

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.options.direction).toBe(defOptions.direction);
    const spy = vi.spyOn(tooltip.value!, 'update');

    direction.value = 'center';
    await nextTick();

    expect(tooltip.value?.options.direction).toBe('center');

    direction.value = null;
    await nextTick();

    expect(tooltip.value?.options.direction).toBe(defOptions.direction);

    expect(spy).toBeCalledTimes(2);
  });

  it('should work with opacity', async () => {
    const defOptions = Tooltip.prototype.options;
    const opacity = ref<number | null>(null);
    const { tooltip } = useLeafletLayerTooltip(layer, undefined, { opacity });

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.options.opacity).toBe(defOptions.opacity);
    const spy = vi.spyOn(tooltip.value!, 'setOpacity');

    opacity.value = 0.5;
    await nextTick();

    expect(tooltip.value?.options.opacity).toBe(0.5);

    opacity.value = null;
    await nextTick();

    expect(tooltip.value?.options.opacity).toBe(defOptions.opacity);
    expect(spy).toBeCalledTimes(2);
  });

  it('should work with class name', async () => {
    const defOptions = Tooltip.prototype.options;
    const className = ref<string | null>(null);
    const { tooltip } = useLeafletLayerTooltip(layer, undefined, { className });

    expect(tooltip.value).toBeInstanceOf(Tooltip);
    expect(tooltip.value?.options.className).toBe(defOptions.className);

    (tooltip.value as any)._initLayout();
    const classList = tooltip.value!.getElement()!.classList;

    className.value = 'classA classB';
    await nextTick();

    expect(tooltip.value?.options.className).toBe('classA classB');
    expect(classList.contains('classA')).toBeTruthy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = 'classB';
    await nextTick();

    expect(tooltip.value?.options.className).toBe('classB');
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeTruthy();

    className.value = null;
    await nextTick();

    expect(tooltip.value?.options.className).toBe(defOptions.className);
    expect(classList.contains('classA')).toBeFalsy();
    expect(classList.contains('classB')).toBeFalsy();
  });

  it('should unbind when component is unmounted', () => {
    expect.assertions(4);

    const vm = mount(
      defineComponent({
        setup() {
          const { tooltip } = useLeafletLayerTooltip(layer);
          expect(tooltip.value).toBeInstanceOf(Tooltip);
          expect(layer.getTooltip()).toBeInstanceOf(Tooltip);

          onUnmounted(() => {
            expect(tooltip.value).toBeNull();
            expect(layer.getTooltip()).toBeNull();
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
