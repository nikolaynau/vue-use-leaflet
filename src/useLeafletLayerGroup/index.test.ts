import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  Ref,
  defineComponent,
  h,
  markRaw,
  nextTick,
  onUnmounted,
  ref
} from 'vue-demi';
import { Layer, LayerGroup } from 'leaflet';
import { mount } from '../../.test';
import { useLeafletLayerGroup } from '.';

describe('useLeafletLayerGroup', () => {
  let layerA: Layer;
  let layerB: Layer;
  let layerC: Layer;

  beforeEach(() => {
    layerA = markRaw(new Layer());
    layerB = markRaw(new Layer());
    layerC = markRaw(new Layer());
  });

  it('should work with empty init', () => {
    expect(useLeafletLayerGroup(undefined).value?.getLayers()).toHaveLength(0);
    expect(useLeafletLayerGroup(null).value?.getLayers()).toHaveLength(0);
    expect(useLeafletLayerGroup([]).value?.getLayers()).toHaveLength(0);
    expect(
      useLeafletLayerGroup([null, undefined]).value?.getLayers()
    ).toHaveLength(0);
    expect(
      useLeafletLayerGroup([ref(null), ref(undefined)]).value?.getLayers()
    ).toHaveLength(0);
    expect(
      useLeafletLayerGroup(ref([ref(null), ref(undefined)])).value?.getLayers()
    ).toHaveLength(0);
    expect(
      useLeafletLayerGroup(ref([null, undefined])).value?.getLayers()
    ).toHaveLength(0);
  });

  it('should work with layers', () => {
    const instance = useLeafletLayerGroup([layerA, layerB]);
    expect(instance.value).toBeInstanceOf(LayerGroup);
    expect(instance.value?.getLayers()).toHaveLength(2);
    expect(instance.value?.hasLayer(layerA)).toBeTruthy();
    expect(instance.value?.hasLayer(layerB)).toBeTruthy();
  });

  it('should work with one layer', () => {
    const instance = useLeafletLayerGroup(layerA);
    expect(instance.value).toBeInstanceOf(LayerGroup);
    expect(instance.value?.getLayers()).toHaveLength(1);
    expect(instance.value?.hasLayer(layerA)).toBeTruthy();
  });

  it('should work with reactive layers', async () => {
    const layers = ref<Layer[] | undefined>(undefined) as Ref<
      Layer[] | undefined
    >;
    const instance = useLeafletLayerGroup(layers);
    expect(instance.value).toBeInstanceOf(LayerGroup);
    expect(instance.value?.getLayers()).toHaveLength(0);

    layers.value = [];
    layers.value?.push(layerA);
    layers.value?.push(layerB);
    await nextTick();

    expect(instance.value?.getLayers()).toHaveLength(2);
    expect(instance.value?.hasLayer(layerA)).toBeTruthy();
    expect(instance.value?.hasLayer(layerB)).toBeTruthy();

    layers.value.push(layerC);
    layers.value.splice(0, 1);
    await nextTick();

    expect(instance.value?.getLayers()).toHaveLength(2);
    expect(instance.value?.hasLayer(layerB)).toBeTruthy();
    expect(instance.value?.hasLayer(layerC)).toBeTruthy();

    layers.value = undefined;
    await nextTick();

    expect(instance.value?.getLayers()).toHaveLength(0);
  });

  it('should work with factory', () => {
    const _instance = new LayerGroup([]);
    const factory = vi.fn().mockImplementation(() => _instance);
    const instance = useLeafletLayerGroup(layerA, { factory });

    expect(instance.value).toBe(_instance);

    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toEqual([layerA]);
  });

  it('should work with custom diff', async () => {
    const diff = vi.fn().mockImplementation(() => ({ remove: [], add: [] }));
    const layers = ref<Layer[] | undefined>(undefined) as Ref<
      Layer[] | undefined
    >;
    useLeafletLayerGroup(layers, { diff });

    layers.value = [layerA, layerB];
    await nextTick();

    layers.value.push(layerC);
    await nextTick();

    layers.value.splice(0, 1);
    await nextTick();

    expect(diff).toBeCalledTimes(3);
    expect(diff.mock.calls[0]).toEqual([[layerA, layerB], []]);
    expect(diff.mock.calls[1]).toEqual([
      [layerA, layerB, layerC],
      [layerA, layerB]
    ]);
    expect(diff.mock.calls[2]).toEqual([
      [layerB, layerC],
      [layerA, layerB, layerC]
    ]);
  });

  it('should work with custom compare', async () => {
    const compare = vi.fn();
    const layers = ref<Layer[] | undefined>(undefined) as Ref<
      Layer[] | undefined
    >;
    useLeafletLayerGroup(layers, { compareFn: compare });

    layers.value = [layerA];
    await nextTick();

    layers.value.push(layerB);
    await nextTick();

    expect(compare).toBeCalledTimes(4);
  });

  it('should work when change inner refs', async () => {
    const layerARef = ref<Layer | null>(null) as Ref<Layer | null>;
    const layerBRef = ref<Layer | null>(null) as Ref<Layer | null>;
    const layers = ref<Ref<Layer | null>[] | undefined>(undefined);

    const instance = useLeafletLayerGroup(layers);
    expect(instance.value).toBeInstanceOf(LayerGroup);
    expect(instance.value?.getLayers()).toHaveLength(0);

    layers.value = [layerARef, layerBRef];
    await nextTick();

    expect(instance.value?.getLayers()).toHaveLength(0);

    layerARef.value = layerA;
    await nextTick();

    expect(instance.value?.getLayers()).toHaveLength(1);
    expect(instance.value?.hasLayer(layerA)).toBeTruthy();

    layerBRef.value = layerB;
    await nextTick();

    expect(instance.value?.getLayers()).toHaveLength(2);
    expect(instance.value?.hasLayer(layerA)).toBeTruthy();
    expect(instance.value?.hasLayer(layerB)).toBeTruthy();
  });

  it('should clear all before add layers when diff disabled', async () => {
    const layers = ref<Layer[] | undefined>(undefined) as Ref<
      Layer[] | undefined
    >;
    const instance = useLeafletLayerGroup(layers, { diff: false });
    expect(instance.value).toBeInstanceOf(LayerGroup);
    expect(instance.value?.getLayers()).toHaveLength(0);

    const spy = vi.spyOn(instance.value!, 'clearLayers');

    layers.value = [layerA, layerB];
    await nextTick();
    expect(instance.value?.getLayers()).toHaveLength(2);

    layers.value.push(layerC);
    await nextTick();
    expect(instance.value?.getLayers()).toHaveLength(3);

    layers.value.splice(0, 1);
    await nextTick();
    expect(instance.value?.getLayers()).toHaveLength(2);

    layers.value = undefined;
    await nextTick();
    expect(instance.value?.getLayers()).toHaveLength(0);

    expect(spy).toBeCalledTimes(4);
  });

  it('should destroy when component is unmounted', () => {
    expect.assertions(3);

    const vm = mount(
      defineComponent({
        setup() {
          const instance = useLeafletLayerGroup([layerA]);
          expect(instance.value).toBeInstanceOf(LayerGroup);
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
