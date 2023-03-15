import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  type UnwrapNestedRefs,
  type Ref,
  ref,
  unref,
  reactive,
  defineComponent,
  onUnmounted,
  h,
  nextTick,
  toRaw
} from 'vue-demi';
import { Control, Layer, Map } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletLayersControl } from '.';

describe('useLeafletLayersControl', () => {
  let rawBaseLayers: { [name: string]: Layer };
  let reactiveBaseLayers: UnwrapNestedRefs<{ [name: string]: Layer }>;
  let baseLayersRef: Ref<{ [name: string]: Layer }>;

  let rawOverlays: { [name: string]: Layer };
  let reactiveOverlays: UnwrapNestedRefs<{ [name: string]: Layer }>;
  let overlaysRef: Ref<{ [name: string]: Layer }>;

  let domElement: HTMLElement;
  let map: Map;

  beforeEach(() => {
    rawBaseLayers = { a: new Layer(), b: new Layer() };
    reactiveBaseLayers = reactive(rawBaseLayers);
    baseLayersRef = ref(rawBaseLayers);

    rawOverlays = { c: new Layer(), d: new Layer() };
    reactiveOverlays = reactive(rawOverlays);
    overlaysRef = ref(rawOverlays);

    domElement = document.createElement('div');
    map = new Map(domElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return not empty instance', () => {
    expect(unref(useLeafletLayersControl())).toBeInstanceOf(Control.Layers);
    expect(unref(useLeafletLayersControl(null, null))).toBeInstanceOf(
      Control.Layers
    );
    expect(unref(useLeafletLayersControl(undefined, undefined))).toBeInstanceOf(
      Control.Layers
    );
  });

  it('should be initialize with raw base layers and overlays', () => {
    const instance = useLeafletLayersControl(rawBaseLayers, rawOverlays);
    expectLayers(unref(instance), rawBaseLayers, false);
    expectLayers(unref(instance), rawOverlays, true);
  });

  it('should be initialize with reactive base layers and overlays', () => {
    const instance = useLeafletLayersControl(
      reactiveBaseLayers,
      reactiveOverlays
    );
    expectLayers(unref(instance), rawBaseLayers, false);
    expectLayers(unref(instance), rawOverlays, true);
  });

  it('should be initialize with ref base layers and overlays', () => {
    const instance = useLeafletLayersControl(baseLayersRef, overlaysRef);
    expectLayers(unref(instance), rawBaseLayers, false);
    expectLayers(unref(instance), rawOverlays, true);
  });

  it('should be initialize with ref is null', () => {
    const instance = useLeafletLayersControl(ref(null), ref(null));
    expectEmptyLayers(unref(instance));
  });

  it('should work with factory', () => {
    const factory = vi
      .fn()
      .mockImplementation(
        (baseLayers, overlays, options) =>
          new Control.Layers(baseLayers, overlays, options)
      );
    const instance = useLeafletLayersControl(rawBaseLayers, rawOverlays, {
      factory
    });

    expectLayers(unref(instance), rawBaseLayers, false);
    expectLayers(unref(instance), rawOverlays, true);
    expect(factory).toBeCalledTimes(1);
  });

  it('should be filter nullable reference', () => {
    expectEmptyLayers(unref(useLeafletLayersControl({ a: null }, { b: null })));
    expectEmptyLayers(
      unref(
        useLeafletLayersControl(reactive({ a: null }), reactive({ b: null }))
      )
    );
    expectEmptyLayers(
      unref(
        useLeafletLayersControl(
          reactive({ a: ref(null) }),
          reactive({ b: ref(null) })
        )
      )
    );
    expectEmptyLayers(
      unref(
        useLeafletLayersControl(ref({ a: ref(null) }), ref({ b: ref(null) }))
      )
    );
    expectEmptyLayers(
      unref(useLeafletLayersControl(ref({ a: null }), ref({ b: null })))
    );
  });

  it('should be sync base layers when changed ref', async () => {
    const instance = useLeafletLayersControl(baseLayersRef);
    expectLayers(unref(instance), rawBaseLayers, false);

    baseLayersRef.value = { ...unref(baseLayersRef), c: new Layer() };
    await nextTick();

    expectLayers(unref(instance), unref(baseLayersRef), false);

    (baseLayersRef.value as any).a = null;
    (baseLayersRef.value as any).d = new Layer();
    await nextTick();

    expectLayers(unref(instance), unref(baseLayersRef), false);
  });

  it('should be sync base layers when changed reactive', async () => {
    const instance = useLeafletLayersControl(reactiveBaseLayers);
    expectLayers(unref(instance), rawBaseLayers, false);

    delete reactiveBaseLayers.a;
    reactiveBaseLayers.c = new Layer();
    await nextTick();

    expectLayers(unref(instance), reactiveBaseLayers, false);
  });

  it('should be sync overlay layers when changed ref', async () => {
    const instance = useLeafletLayersControl(null, overlaysRef);
    expectLayers(unref(instance), rawOverlays, true);

    delete overlaysRef.value.a;
    overlaysRef.value.c = new Layer();
    await nextTick();

    expectLayers(unref(instance), unref(overlaysRef), true);
  });

  it('should be sync overlay layers when changed reactive', async () => {
    const instance = useLeafletLayersControl(null, reactiveOverlays);
    expectLayers(unref(instance), rawOverlays, true);

    delete reactiveOverlays.a;
    reactiveOverlays.c = new Layer();
    await nextTick();

    expectLayers(unref(instance), reactiveOverlays, true);
  });

  it('should be sync base and overlay layers when changed', async () => {
    const instance = useLeafletLayersControl(
      reactiveBaseLayers,
      reactiveOverlays
    );
    expectLayers(unref(instance), reactiveBaseLayers, false);
    expectLayers(unref(instance), reactiveOverlays, true);

    delete reactiveBaseLayers.a;
    reactiveBaseLayers.c = new Layer();
    delete reactiveOverlays.c;
    reactiveOverlays.e = new Layer();
    await nextTick();

    expectLayers(unref(instance), reactiveBaseLayers, false);
    expectLayers(unref(instance), reactiveOverlays, true);
  });

  it('should be layer add to map when set current base layer', () => {
    const currentBaseLayer = ref('a');
    const currentOverlays = ref(['c', 'd']);

    const instance = useLeafletLayersControl(rawBaseLayers, rawOverlays, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawBaseLayers['a'])).toBeTruthy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['c'])).toBeTruthy();
    expect(map.hasLayer(rawOverlays['d'])).toBeTruthy();
  });

  it('should be layers remove from map when current is empty', async () => {
    const currentBaseLayer = ref<string | null>('b');
    const currentOverlays = ref(['c', 'd']);

    const instance = useLeafletLayersControl(rawBaseLayers, rawOverlays, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawBaseLayers['a'])).toBeFalsy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeTruthy();
    expect(map.hasLayer(rawOverlays['c'])).toBeTruthy();
    expect(map.hasLayer(rawOverlays['d'])).toBeTruthy();

    currentBaseLayer.value = null;
    currentOverlays.value = [];
    await nextTick();

    expect(map.hasLayer(rawBaseLayers['a'])).toBeFalsy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['c'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['d'])).toBeFalsy();
  });

  it('should be current work', async () => {
    const currentBaseLayer = ref<string | null>(null);
    const currentOverlays = reactive<string[]>([]);

    const instance = useLeafletLayersControl(rawBaseLayers, rawOverlays, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawBaseLayers['a'])).toBeFalsy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['c'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['d'])).toBeFalsy();

    currentBaseLayer.value = 'a';
    currentOverlays.push('d');
    await nextTick();

    expect(map.hasLayer(rawBaseLayers['a'])).toBeTruthy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['c'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['d'])).toBeTruthy();
  });

  it('should be current work after add layers', async () => {
    const currentBaseLayer = ref<string | null>(null);
    const currentOverlays = reactive<string[]>([]);
    const baseLayers = ref<{ [name: string]: Layer } | null>(null);
    const overlays = ref<{ [name: string]: Layer } | null>(null);

    const instance = useLeafletLayersControl(baseLayers, overlays, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    currentBaseLayer.value = 'a';
    currentOverlays.push('d');
    await nextTick();

    baseLayers.value = rawBaseLayers;
    overlays.value = rawOverlays;
    await nextTick();

    expect(map.hasLayer(rawBaseLayers['a'])).toBeTruthy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['c'])).toBeFalsy();
    expect(map.hasLayer(rawOverlays['d'])).toBeTruthy();
  });

  it('should be update current when check base layers', async () => {
    const currentBaseLayer = ref<string | null>(null);

    const instance = useLeafletLayersControl(rawBaseLayers, null, {
      currentBaseLayer
    });
    map.addControl(unref(instance)!);
    expect(unref(currentBaseLayer)).toBeNull();

    rawBaseLayers.b.fire('add');
    await nextTick();

    expect(unref(currentBaseLayer)).toBe('b');
  });

  it('should be update current when check overlays', async () => {
    const currentOverlays = ref<string[] | null>(null);

    const instance = useLeafletLayersControl(null, rawOverlays, {
      currentOverlays
    });
    map.addControl(unref(instance)!);
    expect(unref(currentOverlays)).toBeNull();

    rawOverlays.c.fire('add');
    rawOverlays.d.fire('add');
    await nextTick();

    expect(unref(currentOverlays)).not.toBeNull();
    expect(unref(currentOverlays)).toHaveLength(2);
    expect(unref(currentOverlays)).toEqual(['c', 'd']);

    rawOverlays.d.fire('remove');
    await nextTick();

    expect(unref(currentOverlays)).toEqual(['c']);

    rawOverlays.c.fire('remove');
    await nextTick();

    expect(unref(currentOverlays)).toHaveLength(0);
  });

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(4);

    const vm = mount(
      defineComponent({
        setup() {
          const layersControl = useLeafletLayersControl();
          map.addControl(unref(layersControl)!);

          expect(unref(layersControl)).toBeInstanceOf(Control.Layers);
          const removeSpy = vi.spyOn(unref(layersControl)!, 'remove');
          const onRemoveSpy = vi.spyOn(unref(layersControl)!, 'onRemove');

          onUnmounted(() => {
            expect(unref(layersControl)).toBeNull();
            expect(onRemoveSpy).toBeCalledTimes(1);
            expect(removeSpy).toBeCalledTimes(1);
          });
        },
        render() {
          return h('div');
        }
      })
    );

    vm.unmount();
  });

  function expectLayers(
    instance: Control.Layers | null,
    layers: Control.LayersObject,
    overlay: boolean
  ) {
    expect(instance).toBeInstanceOf(Control.Layers);
    for (const [name, layer] of Object.entries(layers)) {
      if (layer) {
        expect(hasLayer(instance!, name, toRaw(layer), overlay)).toBeTruthy();
      }
    }
  }

  function expectEmptyLayers(instance: Control.Layers | null) {
    expectLayersCount(unref(instance), 0, false);
    expectLayersCount(unref(instance), 0, true);
  }

  function expectLayersCount(
    instance: Control.Layers | null,
    count: number,
    overlay: boolean
  ) {
    expect(instance).toBeInstanceOf(Control.Layers);
    expect(getLayers(instance!, overlay)).toHaveLength(count);
  }

  function getLayers(instance: Control.Layers, overlay: boolean) {
    const _layers = (instance as any)._layers as Array<{
      name: string;
      layer: Layer;
      overlay: boolean;
    }>;
    return _layers.filter(item => !!item.overlay === overlay);
  }

  function hasLayer(
    instance: Control.Layers,
    name: string,
    layer: Layer,
    overlay: boolean
  ): boolean {
    const _layers = (instance as any)._layers as Array<{
      name: string;
      layer: Layer;
      overlay: boolean;
    }>;
    return !!_layers.find(
      item =>
        item.name === name && item.layer === layer && !!item.overlay === overlay
    );
  }
});
