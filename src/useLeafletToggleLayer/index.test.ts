import { describe, it, expect, beforeEach } from 'vitest';
import { defineComponent, nextTick, Ref, ref, unref, markRaw } from 'vue-demi';
import { Layer, Map } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletToggleLayer } from '.';

describe('useLeafletToggleLayer', () => {
  let map: Map;
  let layer: Layer;
  let mapRef: Ref<Map | null | undefined>;
  let layerRef: Ref<Layer | null | undefined>;

  beforeEach(() => {
    const element = document.createElement('div');
    map = markRaw(new Map(element));
    layer = markRaw(new Layer());
    mapRef = ref(map) as Ref<Map | null | undefined>;
    layerRef = ref(layer) as Ref<Layer | null | undefined>;
  });

  function expectTrue() {
    expect(map.hasLayer(layer)).toBe(true);
  }

  function expectFalse() {
    expect(map.hasLayer(layer)).toBe(false);
  }

  it('should add layer to map', () => {
    useLeafletToggleLayer(mapRef, layerRef);
    expectTrue();
  });

  it('should add layer to map when use unref args', () => {
    useLeafletToggleLayer(map, layer);
    expectTrue();
  });

  it('should work when lazy initialize source and target', async () => {
    mapRef.value = null;
    layerRef.value = null;

    useLeafletToggleLayer(mapRef, layerRef);
    expectFalse();

    mapRef.value = map;
    await nextTick();
    expectFalse();

    layerRef.value = layer;
    await nextTick();
    expectTrue();
  });

  it('should work toggle fn', async () => {
    const toggle = useLeafletToggleLayer(mapRef, layerRef);
    expectTrue();

    toggle();
    await nextTick();
    expectFalse();

    toggle();
    await nextTick();
    expectTrue();
  });

  it('should sync toggle', () => {
    const toggle = useLeafletToggleLayer(mapRef, layerRef, { flushSync: true });
    expectTrue();

    toggle();
    expectFalse();

    toggle();
    expectTrue();
  });

  it('should work with initial value as boolean', async () => {
    const toggle = useLeafletToggleLayer(mapRef, layerRef, {
      initialValue: false
    });
    expectFalse();

    toggle();
    await nextTick();
    expectTrue();
  });

  it('should work with initial value as ref', async () => {
    const initialValue = ref(false);
    const toggle = useLeafletToggleLayer(mapRef, layerRef, {
      initialValue
    });
    expectFalse();
    expect(initialValue.value).toBe(false);

    toggle();
    await nextTick();
    expectTrue();
    expect(initialValue.value).toBe(true);
  });

  it('should work when change initial value', async () => {
    const initialValue = ref(false);
    useLeafletToggleLayer(mapRef, layerRef, {
      initialValue
    });
    expectFalse();
    expect(initialValue.value).toBe(false);

    initialValue.value = true;
    await nextTick();
    expectTrue();
    expect(initialValue.value).toBe(true);
  });

  it('should work when manually call add', async () => {
    const { add } = useLeafletToggleLayer(mapRef, layerRef, {
      initialValue: false,
      controls: true
    });
    expectFalse();

    add();
    await nextTick();
    expectTrue();
  });

  it('should work when manually call remove', async () => {
    const { remove } = useLeafletToggleLayer(mapRef, layerRef, {
      controls: true
    });
    expectTrue();

    remove();
    await nextTick();
    expectFalse();
  });

  it('should work has', async () => {
    const { remove, has } = useLeafletToggleLayer(mapRef, layerRef, {
      controls: true
    });
    expectTrue();
    expect(has()).toBeTruthy();

    remove();
    await nextTick();
    expectFalse();
    expect(has()).toBeFalsy();
  });

  it('should work toggle controls', async () => {
    const { toggle } = useLeafletToggleLayer(mapRef, layerRef, {
      controls: true
    });
    expectTrue();

    toggle();
    await nextTick();
    expectFalse();
  });

  it('should work value controls', async () => {
    const { value } = useLeafletToggleLayer(mapRef, layerRef, {
      controls: true
    });
    expectTrue();
    expect(unref(value)).toBeTruthy();

    value.value = false;
    await nextTick();
    expectFalse();
    expect(unref(value)).toBeFalsy();
  });

  it('should work dispose', async () => {
    const vm = mount(
      defineComponent({
        setup() {
          useLeafletToggleLayer(mapRef, layerRef, {
            dispose: true
          });
          expectTrue();
        },
        render() {
          return null;
        }
      })
    );

    vm.unmount();
    expectFalse();
  });
});
