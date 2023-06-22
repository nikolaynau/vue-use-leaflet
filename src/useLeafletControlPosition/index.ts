import { ref, readonly, type Ref, computed } from 'vue-demi';
import {
  isDefined,
  toRef,
  toValue,
  whenever,
  notNullish,
  tryOnUnmounted,
  type Arrayable,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import { DomUtil, type Map } from 'leaflet';
import { useLeafletDiff } from '../useLeafletDiff';

export interface UseLeafletControlPositionOptions {
  flushSync?: boolean;
  dispose?: boolean;
}

export interface UseLeafletControlPositionReturn {
  positionElements: LeafletControlPositionElements;
}

export type LeafletControlPositionElements = Readonly<
  Ref<Record<string, HTMLElement>>
>;

export function useLeafletControlPosition(
  source: MaybeRefOrGetter<Map | null | undefined>,
  positions: MaybeRefOrGetter<Arrayable<[string, string]> | null | undefined>,
  options: UseLeafletControlPositionOptions = {}
): UseLeafletControlPositionReturn {
  const { flushSync, dispose } = options;

  const _source = toRef(source);
  const _positionElements = ref<Record<string, HTMLElement>>({});
  const _flush = flushSync ? 'sync' : undefined;

  const _positions = computed<Array<[string, string]>>(() => {
    const val = toValue(positions);
    return notNullish(val) ? toArray(val) : [];
  });

  function init() {
    if (isDefined(_source) && isDefined(_positions)) {
      add(_source.value, _positions.value);
      update();
    }
  }

  function add(source: Map, positions: Arrayable<[string, string]>) {
    toArray(positions).forEach(position => {
      if (!hasCorner(source, position)) {
        createCorner(source, position);
      }
    });
  }

  function remove(source: Map, positions: Arrayable<[string, string]>) {
    const corners = getCorners(source);
    toArray(positions).forEach(position => {
      const [vSide, hSide] = position;
      const key = vSide + hSide;
      if (corners[key]) {
        corners[key].remove();
        delete corners[key];
      }
    });
  }

  function update() {
    if (isDefined(_source)) {
      _positionElements.value = { ...getCorners(_source.value) };
    }
  }

  function hasCorner(source: Map, position: [string, string]) {
    const [vSide, hSide] = position;
    const controlCorners = (source as any)._controlCorners as Record<
      string,
      HTMLElement
    >;
    return controlCorners ? !!controlCorners[vSide + hSide] : false;
  }

  function createCorner(source: Map, position: [string, string]) {
    const [vSide, hSide] = position;
    const controlCorners = (source as any)._controlCorners as Record<
      string,
      HTMLElement
    >;
    const controlContainer = (source as any)._controlContainer as HTMLElement;
    if (!controlContainer || !controlCorners) {
      return;
    }
    const className = `leaflet-${vSide} leaflet-${hSide}`;
    controlCorners[vSide + hSide] = DomUtil.create(
      'div',
      className,
      controlContainer
    );
  }

  function getCorners(source: Map): Record<string, HTMLElement> {
    return (source as any)._controlCorners ?? {};
  }

  function toArray<T>(value: Arrayable<T>): T[] {
    return Array.isArray(value) ? value : [value];
  }

  function compare(a: [string, string], b: [string, string]) {
    return a[0] + a[1] === b[0] + b[1];
  }

  const stop = useLeafletDiff(_positions, compare, {
    add: val => isDefined(_source) && add(_source.value, val),
    remove: val => isDefined(_source) && remove(_source.value, val),
    watchOptions: { flush: _flush }
  });

  whenever(
    logicAnd(_source, _positions),
    () => {
      init();
    },
    {
      flush: _flush
    }
  );

  function clean() {
    if (isDefined(_source) && isDefined(_positions)) {
      remove(_source.value, _positions.value);
      update();
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
      stop();
    });
  }

  init();

  return {
    positionElements: readonly(
      _positionElements
    ) as LeafletControlPositionElements
  };
}
