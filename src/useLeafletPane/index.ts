import { ref, watch, type Ref, readonly } from 'vue-demi';
import {
  isDefined,
  resolveRef,
  whenever,
  type Arrayable,
  type MaybeComputedRef,
  tryOnUnmounted
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';

export interface UseLeafletPaneOptions {
  zIndex?: number;
  flushSync?: boolean;
  dispose?: boolean;
}

export interface UseLeafletPaneReturn {
  paneElements: LeafletPaneElements;
}

export type LeafletPaneElements = Readonly<Ref<Record<string, HTMLElement>>>;

export interface LeafletPaneProvider {
  createPane(name: string, container?: HTMLElement): HTMLElement;
  getPane(name: string | HTMLElement): HTMLElement | undefined;
  getPanes(): Record<string, HTMLElement>;
}

export function useLeafletPane(
  source: MaybeComputedRef<LeafletPaneProvider | null | undefined>,
  pane: MaybeComputedRef<Arrayable<string> | null | undefined>,
  options: UseLeafletPaneOptions = {}
): UseLeafletPaneReturn {
  const { zIndex, flushSync, dispose } = options;

  const _source = resolveRef(source);
  const _panes = resolveRef(pane);
  const _paneElements = ref<Record<string, HTMLElement>>({});
  const _flush = flushSync ? 'sync' : undefined;

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
        if (isDefined(zIndex)) {
          paneElement.style.zIndex = `${zIndex}`;
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
    paneElements: readonly(_paneElements) as LeafletPaneElements
  };
}
