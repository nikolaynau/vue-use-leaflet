import {
  ref,
  watch,
  readonly,
  computed,
  type Ref,
  type ComputedRef
} from 'vue-demi';
import {
  isDefined,
  toRef,
  whenever,
  type Arrayable,
  type MaybeRefOrGetter,
  tryOnUnmounted
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';

export interface UseLeafletPaneOptions {
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  flushSync?: boolean;
  dispose?: boolean;
}

export interface UseLeafletPaneReturn {
  currentPanes: ComputedRef<HTMLElement[]>;
  paneElements: LeafletPaneElements;
}

export type LeafletPaneElements = Readonly<Ref<Record<string, HTMLElement>>>;

export interface LeafletPaneProvider {
  createPane(name: string, container?: HTMLElement): HTMLElement;
  getPane(name: string | HTMLElement): HTMLElement | undefined;
  getPanes(): Record<string, HTMLElement>;
}

export function useLeafletPane(
  source: MaybeRefOrGetter<LeafletPaneProvider | null | undefined>,
  pane: MaybeRefOrGetter<Arrayable<string> | null | undefined>,
  options: UseLeafletPaneOptions = {}
): UseLeafletPaneReturn {
  const { zIndex, flushSync, dispose } = options;

  const _source = toRef(source);
  const _panes = toRef(pane);
  const _zIndex = toRef(zIndex);
  const _paneElements = ref<Record<string, HTMLElement>>({});
  const _flush = flushSync ? 'sync' : undefined;

  const _currentPanes = computed<HTMLElement[]>(() =>
    toArray(isDefined(_panes) ? _panes.value : []).map(
      pane => _paneElements.value[pane]
    )
  );

  function init() {
    if (isDefined(_source) && isDefined(_panes)) {
      create(_source.value, _panes.value);
      update();
    }
  }

  function create(source: LeafletPaneProvider, panes: Arrayable<string>) {
    toArray(panes).forEach(pane => {
      if (!source.getPane(pane)) {
        const paneElement = source.createPane(pane);
        if (isDefined(_zIndex)) {
          paneElement.style.zIndex = `${_zIndex.value}`;
        }
      }
    });
  }

  function remove(source: LeafletPaneProvider, panes: Arrayable<string>) {
    const mapPanes = source.getPanes();
    toArray(panes).forEach(pane => {
      if (mapPanes[pane]) {
        mapPanes[pane].remove();
        delete mapPanes[pane];
      }
    });
  }

  function toArray<T>(value: Arrayable<T>): T[] {
    return Array.isArray(value) ? value : [value];
  }

  function update() {
    if (isDefined(_source)) {
      _paneElements.value = { ..._source.value.getPanes() };
    }
  }

  function diff<T>(arrA: T[], arrB: T[]): T[] {
    return arrA.filter(x => !arrB.includes(x));
  }

  watch(
    () => {
      if (!isDefined(_panes)) {
        return undefined;
      }
      if (!Array.isArray(_panes.value)) {
        return [_panes.value];
      }
      return [..._panes.value];
    },
    (_new, old) => {
      if (!isDefined(_source)) {
        return;
      }
      if (old && _new) {
        remove(_source.value, diff(old, _new));
        create(_source.value, diff(_new, old));
        update();
      } else if (old) {
        remove(_source.value, old);
        update();
      } else if (_new) {
        create(_source.value, _new);
        update();
      }
    },
    { deep: true, flush: _flush }
  );

  whenever(
    logicAnd(_source, _panes),
    () => {
      init();
    },
    {
      flush: _flush
    }
  );

  if (zIndex != null) {
    watch(_zIndex, val => {
      _currentPanes.value.forEach(el => {
        el.style.zIndex = `${val ?? ''}`;
      });
    });
  }

  function clean() {
    if (isDefined(_source) && isDefined(_panes)) {
      remove(_source.value, _panes.value);
      update();
    }
  }

  if (dispose) {
    tryOnUnmounted(() => {
      clean();
    });
  }

  init();

  return {
    currentPanes: _currentPanes,
    paneElements: readonly(_paneElements) as LeafletPaneElements
  };
}
