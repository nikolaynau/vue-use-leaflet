import {
  type MaybeComputedRef,
  type MaybeRef,
  tryOnUnmounted,
  isDefined,
  resolveUnref
} from '@vueuse/shared';
import {
  type UnwrapNestedRefs,
  type ShallowRef,
  type Ref,
  shallowRef,
  ref,
  toRaw,
  markRaw,
  watch
} from 'vue-demi';
import { Control, type Layer, type Map } from 'leaflet';

export interface UseLeafletLayersControlOptions extends Control.LayersOptions {
  currentBaseLayer?: MaybeRef<string | Layer | null | undefined>;
  currentOverlays?: MaybeRef<string[] | Layer[] | null | undefined>;
  factory?: (...args: unknown[]) => Control.Layers;
  dispose?: boolean;
}

export type UseLeafletLayersControlReturn = Ref<Control.Layers | null>;

export interface NullableLayersObject {
  [name: string]: MaybeComputedRef<Layer | null | undefined>;
}

export type MaybeReactiveLayersObject =
  | UnwrapNestedRefs<NullableLayersObject>
  | MaybeComputedRef<NullableLayersObject | null | undefined>;

export function useLeafletLayersControl(
  baseLayers?: MaybeReactiveLayersObject | null | undefined,
  overlays?: MaybeReactiveLayersObject | null | undefined,
  options: UseLeafletLayersControlOptions = {}
): UseLeafletLayersControlReturn {
  const {
    currentBaseLayer,
    currentOverlays,
    factory,
    dispose = true,
    ...controlOptions
  } = options;

  const instance = shallowRef<Control.Layers | null>(null);
  const currentBaseLayerRef = ref(currentBaseLayer);
  const currentOverlaysRef = ref(currentOverlays);

  function create() {
    const _baseLayers = toRawObject<Control.LayersObject>(baseLayers);
    const _overlays = toRawObject<Control.LayersObject>(overlays);
    let _instance: Control.Layers | null = null;

    if (factory) {
      _instance = factory(_baseLayers, _overlays, controlOptions);
    } else {
      _instance = new Control.Layers(_baseLayers, _overlays, controlOptions);
    }

    if (isDefined(_instance)) {
      instance.value = markRaw(addHook(_instance));
    }
  }

  function toRawObject<T = any>(obj: any): T {
    return filter(resolveUnref(obj) ?? {}) as T;
  }

  function filter(obj: Record<string, unknown>) {
    const res: Record<string, unknown> = {};
    Object.keys(obj).forEach(key => {
      if (isDefined(obj[key])) {
        res[key] = toRaw(resolveUnref(obj[key]));
      }
    });
    return res;
  }

  function find(
    predicate: (item: {
      name: string;
      layer: Layer;
      overlay: boolean;
    }) => boolean
  ) {
    const _layers =
      ((instance.value as any)?._layers as Array<{
        name: string;
        layer: Layer;
        overlay: boolean;
      }>) ?? [];
    return _layers.find(predicate);
  }

  function sync(layers: Control.LayersObject, overlay: boolean) {
    //
  }

  function update(overlay?: boolean) {
    //
  }

  function addHook(instance: Control.Layers): Control.Layers {
    const superOnAdd = instance.addTo;
    instance.addTo = (map: Map) => {
      superOnAdd.call(instance, map);
      update();
      return instance;
    };
    return instance;
  }

  function clean() {
    if (isDefined(instance)) {
      instance.value.remove();
      (instance as ShallowRef<Control.Layers | null>).value = null;
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  watch(
    () => resolveUnref(baseLayers),
    () => {
      sync(toRawObject(baseLayers), false);
    },
    { deep: true }
  );

  watch(
    () => resolveUnref(overlays),
    () => {
      sync(toRawObject(overlays), true);
    },
    { deep: true }
  );

  watch(currentBaseLayerRef, () => {
    update(false);
  });

  watch(
    currentOverlaysRef,
    () => {
      update(true);
    },
    { deep: true }
  );

  create();

  return instance;
}
