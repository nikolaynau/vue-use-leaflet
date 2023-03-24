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
  markRaw
} from 'vue-demi';
import { Control, Layer, Map } from 'leaflet';
import { mount } from '../../.test';
import { LayersItemConfig, useLeafletLayersControl } from '.';
import { useBaseLayers } from './baseLayers';
import { useOverlayLayers } from './overlays';

describe('useLeafletLayersControl', () => {
  let rawLayers: LayersItemConfig[];
  let reactiveLayers: UnwrapNestedRefs<LayersItemConfig[]>;
  let layersRef: Ref<LayersItemConfig[]>;
  let domElement: HTMLElement;
  let map: Map;

  beforeEach(() => {
    rawLayers = [
      { name: 'a', layer: createLayer() },
      { name: 'b', layer: createLayer() },
      { name: 'c', layer: createLayer(), overlay: true },
      { name: 'd', layer: createLayer(), overlay: true }
    ];
    reactiveLayers = reactive(rawLayers);
    layersRef = ref(rawLayers as any);

    domElement = document.createElement('div');
    map = new Map(domElement);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return not empty instance', () => {
    expect(unref(useLeafletLayersControl(null))).toBeInstanceOf(Control.Layers);
    expect(unref(useLeafletLayersControl(undefined))).toBeInstanceOf(
      Control.Layers
    );
  });

  it('should be initialize with raw layers', () => {
    const instance = useLeafletLayersControl(rawLayers);
    expectLayers(unref(instance), rawLayers);
  });

  it('should be initialize with reactive layers', () => {
    const instance = useLeafletLayersControl(reactiveLayers as any);
    expectLayers(unref(instance), rawLayers);
  });

  it('should be initialize with ref layers', () => {
    const instance = useLeafletLayersControl(layersRef);
    expectLayers(unref(instance), rawLayers);
  });

  it('should be initialize with ref is null', () => {
    const instance = useLeafletLayersControl(ref(null));
    expectEmptyLayers(unref(instance));
  });

  it('should work with factory', () => {
    const factory = vi
      .fn()
      .mockImplementation(
        options => new Control.Layers(undefined, undefined, options)
      );
    const instance = useLeafletLayersControl(rawLayers, {
      factory
    });

    expectLayers(unref(instance), rawLayers);
    expect(factory).toBeCalledTimes(1);
  });

  it('should be filter nullable reference', () => {
    expectEmptyLayers(
      unref(
        useLeafletLayersControl([
          { name: 'a', layer: null },
          { name: 'b', layer: null }
        ])
      )
    );
    expectEmptyLayers(
      unref(
        useLeafletLayersControl(
          reactive([
            { name: 'a', layer: null },
            { name: 'b', layer: null }
          ])
        )
      )
    );
    expectEmptyLayers(
      unref(
        useLeafletLayersControl(
          reactive([
            { name: 'a', layer: ref(null) },
            { name: 'b', layer: ref(null) }
          ])
        )
      )
    );
    expectEmptyLayers(
      unref(useLeafletLayersControl(ref([{ name: 'a', layer: ref(null) }])))
    );
    expectEmptyLayers(
      unref(useLeafletLayersControl(ref([{ name: 'a', layer: null }])))
    );
  });

  it('should be sync layers when change ref', async () => {
    const instance = useLeafletLayersControl(layersRef);
    expectLayers(unref(instance), rawLayers);

    layersRef.value.push({ name: 'c', layer: createLayer() });
    layersRef.value.push({ name: 'e', layer: createLayer(), overlay: true });
    await nextTick();

    expectLayers(unref(instance), unref(layersRef));
  });

  it('should be sync layers when change reactive', async () => {
    const instance = useLeafletLayersControl(reactiveLayers as any);
    expectLayers(unref(instance), rawLayers);

    reactiveLayers.push({ name: 'd', layer: createLayer() });
    reactiveLayers.push({
      name: 'e',
      layer: createLayer(),
      overlay: true
    });
    reactiveLayers.splice(0, 1);
    await nextTick();

    expectLayers(unref(instance), reactiveLayers as any);
  });

  it('should be layer add to map when set current base layer', () => {
    const currentBaseLayer = ref('a');
    const currentOverlays = ref(['c', 'd']);

    const instance = useLeafletLayersControl(rawLayers, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawLayers[0].layer as Layer)).toBeTruthy();
    expect(map.hasLayer(rawLayers[1].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[2].layer as Layer)).toBeTruthy();
    expect(map.hasLayer(rawLayers[3].layer as Layer)).toBeTruthy();
  });

  it('should be layers remove from map when current is empty', async () => {
    const currentBaseLayer = ref<string | null>('b');
    const currentOverlays = ref(['c', 'd']);

    const instance = useLeafletLayersControl(rawLayers, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawLayers[0].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[1].layer as Layer)).toBeTruthy();
    expect(map.hasLayer(rawLayers[2].layer as Layer)).toBeTruthy();
    expect(map.hasLayer(rawLayers[3].layer as Layer)).toBeTruthy();

    currentBaseLayer.value = null;
    currentOverlays.value = [];
    await nextTick();

    expect(map.hasLayer(rawLayers[0].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[1].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[2].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[3].layer as Layer)).toBeFalsy();
  });

  it('should be current work', async () => {
    const currentBaseLayer = ref<string | null>(null);
    const currentOverlays = ref<string[]>([]);

    const instance = useLeafletLayersControl(rawLayers, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    expect(map.hasLayer(rawLayers[0].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[1].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[2].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[3].layer as Layer)).toBeFalsy();

    currentBaseLayer.value = 'a';
    currentOverlays.value.push('d');
    await nextTick();

    expect(map.hasLayer(rawLayers[0].layer as Layer)).toBeTruthy();
    expect(map.hasLayer(rawLayers[1].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[2].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[3].layer as Layer)).toBeTruthy();
  });

  it('should be current work after add layers', async () => {
    const currentBaseLayer = ref<string | null>(null);
    const currentOverlays = ref<string[]>([]);
    const layers = ref<LayersItemConfig[] | null>(null);

    const instance = useLeafletLayersControl(layers as any, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    currentBaseLayer.value = 'a';
    currentOverlays.value.push('d');
    await nextTick();

    layers.value = rawLayers as any;
    await nextTick();

    expect(map.hasLayer(rawLayers[0].layer as Layer)).toBeTruthy();
    expect(map.hasLayer(rawLayers[1].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[2].layer as Layer)).toBeFalsy();
    expect(map.hasLayer(rawLayers[3].layer as Layer)).toBeTruthy();
  });

  it('should be update current when check base layers', async () => {
    const currentBaseLayer = ref<string | null>(null);

    const instance = useLeafletLayersControl(rawLayers, {
      currentBaseLayer
    });
    map.addControl(unref(instance)!);
    expect(unref(currentBaseLayer)).toBeNull();

    (rawLayers[1].layer as Layer).fire('add');
    await nextTick();

    expect(unref(currentBaseLayer)).toBe('b');
  });

  it('should be update current as number when check layers', async () => {
    const currentBaseLayer = ref<number | null>(0);
    const currentOverlays = ref<number[] | null>([0]);

    const instance = useLeafletLayersControl(rawLayers, {
      currentBaseLayer,
      currentOverlays
    });
    map.addControl(unref(instance)!);

    (rawLayers[1].layer as Layer).fire('add');
    (rawLayers[3].layer as Layer).fire('add');
    await nextTick();

    expect(unref(currentBaseLayer)).toBe(1);
    expect(unref(currentOverlays)).toEqual([0, 1]);
  });

  it('should be update current when check overlays', async () => {
    const currentOverlays = ref<string[] | null>(null);

    const instance = useLeafletLayersControl(rawLayers, {
      currentOverlays
    });
    map.addControl(unref(instance)!);
    expect(unref(currentOverlays)).toBeNull();

    (rawLayers[2].layer as Layer).fire('add');
    (rawLayers[3].layer as Layer).fire('add');
    await nextTick();

    expect(unref(currentOverlays)).not.toBeNull();
    expect(unref(currentOverlays)).toHaveLength(2);
    expect(unref(currentOverlays)).toEqual(['c', 'd']);

    (rawLayers[3].layer as Layer).fire('remove');
    await nextTick();

    expect(unref(currentOverlays)).toEqual(['c']);

    (rawLayers[2].layer as Layer).fire('remove');
    await nextTick();

    expect(unref(currentOverlays)).toHaveLength(0);
  });

  it('should work with indexes', async () => {
    const currentBaseLayer = ref<number | null>(null);
    const currentOverlays = ref<number[] | null>(null);

    const instance = useLeafletLayersControl(rawLayers, {
      currentBaseLayer,
      currentOverlays,
      indexes: true
    });
    map.addControl(unref(instance)!);

    (rawLayers[1].layer as Layer).fire('add');
    (rawLayers[2].layer as Layer).fire('add');
    (rawLayers[3].layer as Layer).fire('add');
    await nextTick();

    expect(unref(currentBaseLayer)).toBe(1);
    expect(unref(currentOverlays)).toEqual([0, 1]);

    (rawLayers[1].layer as Layer).fire('remove');
    (rawLayers[3].layer as Layer).fire('remove');
    await nextTick();

    expect(unref(currentBaseLayer)).toBe(1);
    expect(unref(currentOverlays)).toEqual([0]);
  });

  it('should destroy instance when component is unmounted', async () => {
    expect.assertions(4);

    const vm = mount(
      defineComponent({
        setup() {
          const layersControl = useLeafletLayersControl([]);
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
    layers: LayersItemConfig[]
  ) {
    expect(instance).toBeInstanceOf(Control.Layers);
    for (const { name, layer, overlay } of layers) {
      if (layer) {
        expect(
          hasLayer(instance!, name, layer as Layer, !!overlay)
        ).toBeTruthy();
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

  function createLayer(): Layer {
    return markRaw(new Layer());
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
    name?: string,
    layer?: Layer,
    overlay?: boolean
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

describe('useBaseLayers', () => {
  let rawLayers: LayersItemConfig[];
  let reactiveLayers: UnwrapNestedRefs<LayersItemConfig[]>;
  let layersRef: Ref<LayersItemConfig[]>;

  beforeEach(() => {
    rawLayers = [
      { name: 'a', layer: markRaw(new Layer()) },
      { name: 'b', layer: markRaw(new Layer()) }
    ];
    reactiveLayers = reactive(rawLayers);
    layersRef = ref(rawLayers as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([[null], [undefined], [[]]])(
    'should init with empty values',
    values => {
      const { layers, currentLayer } = useBaseLayers(values);
      expect(layers.value).toEqual([]);
      expect(currentLayer.value).toBeNull();
    }
  );

  it('should init with layers', () => {
    const { layers, currentLayer } = useBaseLayers(rawLayers);
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();
  });

  it('should init with reactive layers', () => {
    const { layers, currentLayer } = useBaseLayers(reactiveLayers as any);
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();
  });

  it('should init with ref layers', () => {
    const { layers, currentLayer } = useBaseLayers(layersRef);
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();
  });

  it('should init with empty layer', () => {
    const { layers, currentLayer } = useBaseLayers([
      { name: 'a', layer: null }
    ]);
    expect(layers.value).toEqual([]);
    expect(currentLayer.value).toBeNull();
  });

  it('should init with empty name', () => {
    const values = [{ layer: markRaw(new Layer()) }];
    const { layers, currentLayer } = useBaseLayers(values);
    expect(layers.value).toEqual([
      { name: '1', layer: values[0].layer, overlay: false }
    ]);
    expect(currentLayer.value).toBeNull();
  });

  it('should work with name template', () => {
    const nameTemplate = vi.fn().mockImplementation(i => `Untitled ${i}`);
    const values = [{ layer: markRaw(new Layer()) }];
    const { layers, currentLayer } = useBaseLayers(values, { nameTemplate });
    expect(layers.value).toEqual([
      { name: 'Untitled 1', layer: values[0].layer, overlay: false }
    ]);
    expect(currentLayer.value).toBeNull();
    expect(nameTemplate).toBeCalledWith(1, values[0].layer);
  });

  it('should work with layer as ref', () => {
    const layer = markRaw(new Layer());
    const values = [{ name: 'a', layer: ref(markRaw(layer)) }];
    const { layers, currentLayer } = useBaseLayers(values);
    expect(layers.value).toEqual([{ name: 'a', layer, overlay: false }]);
    expect(currentLayer.value).toBeNull();
  });

  it.each([[null], [undefined]])('should init with empty current', current => {
    const { layers, currentLayer } = useBaseLayers(layersRef, { current });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();
  });

  it('should work with current as string', () => {
    const { layers, currentLayer } = useBaseLayers(layersRef, { current: 'a' });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toEqual({
      ...rawLayers[0],
      overlay: false
    });
  });

  it('should work with current as number', () => {
    const { layers, currentLayer } = useBaseLayers(layersRef, { current: 0 });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toEqual({
      ...rawLayers[0],
      overlay: false
    });
  });

  it.each([
    ['c', () => null],
    [
      'b',
      () => ({
        ...rawLayers[1],
        overlay: false
      })
    ],
    [
      0,
      () => ({
        ...rawLayers[0],
        overlay: false
      })
    ],
    [
      1,
      () => ({
        ...rawLayers[1],
        overlay: false
      })
    ],
    [undefined, () => null]
  ])('should work when change current', async (currentValue, expectedFn) => {
    const current = ref<string | number | null | undefined>(null);
    const { layers, currentLayer } = useBaseLayers(layersRef, { current });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();

    current.value = currentValue;
    await nextTick();
    expect(currentLayer.value).toEqual(expectedFn());
  });

  it('should called callbacks when change current', async () => {
    const addSpy = vi.fn();
    const removeSpy = vi.fn();
    const current = ref<string | number | null | undefined>(null);
    const { layers, currentLayer } = useBaseLayers(layersRef, {
      current,
      add: addSpy,
      remove: removeSpy
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();

    current.value = 'a';
    await nextTick();

    current.value = 1;
    await nextTick();

    current.value = 'c';
    await nextTick();

    current.value = null;
    await nextTick();

    expect(addSpy).toBeCalledTimes(2);
    expect(addSpy.mock.calls[0][0]).toEqual({
      ...rawLayers[0],
      overlay: false
    });
    expect(addSpy.mock.calls[1][0]).toEqual({
      ...rawLayers[1],
      overlay: false
    });

    expect(removeSpy).toBeCalledTimes(2);
    expect(removeSpy.mock.calls[0][0]).toEqual({
      ...rawLayers[0],
      overlay: false
    });
    expect(removeSpy.mock.calls[1][0]).toEqual({
      ...rawLayers[1],
      overlay: false
    });
  });

  it('should call change callback when change layers', async () => {
    const changeSpy = vi.fn();
    const { layers, currentLayer } = useBaseLayers(layersRef, {
      changed: changeSpy
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: false }))
    );
    expect(currentLayer.value).toBeNull();

    layersRef.value.push({ name: 'c', layer: markRaw(new Layer()) });
    await nextTick();

    const expected = layersRef.value.map(item => ({ ...item, overlay: false }));
    expect(layers.value).toEqual(expected);
    expect(changeSpy).toBeCalledTimes(1);
    expect(changeSpy).toBeCalledWith(expected);
  });
});

describe('useOverlayLayers', () => {
  let rawLayers: LayersItemConfig[];
  let reactiveLayers: UnwrapNestedRefs<LayersItemConfig[]>;
  let layersRef: Ref<LayersItemConfig[]>;

  beforeEach(() => {
    rawLayers = [
      { name: 'a', layer: markRaw(new Layer()) },
      { name: 'b', layer: markRaw(new Layer()) }
    ];
    reactiveLayers = reactive(rawLayers);
    layersRef = ref(rawLayers as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([[null], [undefined], [[]]])(
    'should init with empty values',
    values => {
      const { layers, currentLayers } = useOverlayLayers(values);
      expect(layers.value).toEqual([]);
      expect(currentLayers.value).toEqual([]);
    }
  );

  it('should init with layers', () => {
    const { layers, currentLayers } = useOverlayLayers(rawLayers);
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);
  });

  it('should init with reactive layers', () => {
    const { layers, currentLayers } = useOverlayLayers(reactiveLayers as any);
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);
  });

  it('should init with ref layers', () => {
    const { layers, currentLayers } = useOverlayLayers(layersRef);
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);
  });

  it('should init with empty layer', () => {
    const { layers, currentLayers } = useOverlayLayers([
      { name: 'a', layer: null }
    ]);
    expect(layers.value).toEqual([]);
    expect(currentLayers.value).toEqual([]);
  });

  it('should init with empty name', () => {
    const values = [{ layer: markRaw(new Layer()) }];
    const { layers, currentLayers } = useOverlayLayers(values);
    expect(layers.value).toEqual([
      { name: '1', layer: values[0].layer, overlay: true }
    ]);
    expect(currentLayers.value).toEqual([]);
  });

  it('should work with name template', () => {
    const nameTemplate = vi.fn().mockImplementation(i => `Untitled ${i}`);
    const values = [{ layer: markRaw(new Layer()) }];
    const { layers, currentLayers } = useOverlayLayers(values, {
      nameTemplate
    });
    expect(layers.value).toEqual([
      { name: 'Untitled 1', layer: values[0].layer, overlay: true }
    ]);
    expect(currentLayers.value).toEqual([]);
    expect(nameTemplate).toBeCalledWith(1, values[0].layer);
  });

  it('should work with layer as ref', () => {
    const layer = markRaw(new Layer());
    const values = [{ name: 'a', layer: ref(markRaw(layer)) }];
    const { layers, currentLayers } = useOverlayLayers(values);
    expect(layers.value).toEqual([{ name: 'a', layer, overlay: true }]);
    expect(currentLayers.value).toEqual([]);
  });

  it.each([[null], [undefined]])('should init with empty current', current => {
    const { layers, currentLayers } = useOverlayLayers(layersRef, { current });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);
  });

  it('should work with current as string array', () => {
    const { layers, currentLayers } = useOverlayLayers(layersRef, {
      current: ['a']
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([
      {
        ...rawLayers[0],
        overlay: true
      }
    ]);
  });

  it('should work with current as number array', () => {
    const { layers, currentLayers } = useOverlayLayers(layersRef, {
      current: [0]
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([
      {
        ...rawLayers[0],
        overlay: true
      }
    ]);
  });

  it('should work with current', () => {
    const { layers, currentLayers } = useOverlayLayers(layersRef, {
      current: [0, 1]
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
  });

  it.each([
    [['c'], () => []],
    [
      ['b'],
      () => [
        {
          ...rawLayers[1],
          overlay: true
        }
      ]
    ],
    [
      [0],
      () => [
        {
          ...rawLayers[0],
          overlay: true
        }
      ]
    ],
    [
      [1],
      () => [
        {
          ...rawLayers[1],
          overlay: true
        }
      ]
    ],
    [undefined, () => []]
  ])('should work when change current', async (currentValue, expectedFn) => {
    const current = ref<string[] | number[] | null | undefined>(null);
    const { layers, currentLayers } = useOverlayLayers(layersRef, { current });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);

    current.value = currentValue;
    await nextTick();
    expect(currentLayers.value).toEqual(expectedFn());
  });

  it('should call callbacks when change current', async () => {
    const addSpy = vi.fn();
    const removeSpy = vi.fn();
    const current = ref<string[] | number[] | null | undefined>(null);
    const { layers, currentLayers } = useOverlayLayers(layersRef, {
      current,
      add: addSpy,
      remove: removeSpy
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);

    current.value = ['a'];
    await nextTick();

    current.value.push('b');
    await nextTick();

    current.value.push('c');
    await nextTick();

    current.value = null;
    await nextTick();

    current.value = [0];
    await nextTick();

    current.value.push(1);
    await nextTick();

    expect(addSpy).toBeCalledTimes(8);
    expect(removeSpy).toBeCalledTimes(6);
  });

  it('should call change callback when change layers', async () => {
    const changeSpy = vi.fn();
    const { layers, currentLayers } = useOverlayLayers(layersRef, {
      changed: changeSpy
    });
    expect(layers.value).toEqual(
      rawLayers.map(item => ({ ...item, overlay: true }))
    );
    expect(currentLayers.value).toEqual([]);

    layersRef.value.push({ name: 'c', layer: markRaw(new Layer()) });
    await nextTick();

    const expected = layersRef.value.map(item => ({ ...item, overlay: true }));
    expect(layers.value).toEqual(expected);
    expect(changeSpy).toBeCalledTimes(1);
    expect(changeSpy).toBeCalledWith(expected);
  });
});
