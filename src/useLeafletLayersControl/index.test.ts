import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  ref,
  unref,
  reactive,
  type UnwrapNestedRefs,
  type Ref,
  defineComponent,
  onUnmounted,
  h,
  nextTick
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

    console.log('dsdfafa', baseLayersRef.value);
    expectLayers(unref(instance), unref(baseLayersRef), false);
  });

  /*it('should be layer add to map when set current base layer', () => {
    const currentBaseLayer = ref('a');
    const instance = useLeafletLayersControl(rawBaseLayers, null, {
      currentBaseLayer
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawBaseLayers['a'])).toBeTruthy();
    expect(map.hasLayer(rawBaseLayers['b'])).toBeFalsy();
  });

  it('should be layer add to map when set current overlays', () => {
    const currentOverlays = ref(['d']);
    const instance = useLeafletLayersControl(null, rawOverlays, {
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawBaseLayers['c'])).toBeFalsy();
    expect(map.hasLayer(rawBaseLayers['d'])).toBeTruthy();
  });*/

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const layersControl = useLeafletLayersControl();

          expect(unref(layersControl)).toBeInstanceOf(Control.Layers);
          const spy = vi.spyOn(unref(layersControl)!, 'remove');

          onUnmounted(() => {
            expect(unref(layersControl)).toBeNull();
            expect(spy).toBeCalledTimes(1);
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
      expect(hasLayer(instance!, name, layer, overlay)).toBeTruthy();
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
