import { describe, it, expect, beforeEach } from 'vitest';
import {
  nextTick,
  ref,
  defineComponent,
  onUnmounted,
  h,
  markRaw,
  Ref
} from 'vue-demi';
import { Layer, Tooltip, Util } from 'leaflet';
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
