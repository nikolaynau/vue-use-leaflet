import { ref, watch, type Ref } from 'vue-demi';
import {
  isDefined,
  resolveRef,
  whenever,
  type Arrayable,
  type MaybeComputedRef
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';

export interface UseLeafletPaneOptions {
  zIndex?: number;
}

export interface UseLeafletPaneReturn {
  paneElements: Ref<Record<string, HTMLElement>>;
}

export interface LeafletPaneProvider {
  createPane(name: string, container?: HTMLElement): HTMLElement;
  getPane(name: string | HTMLElement): HTMLElement | undefined;
  getPanes(): Record<string, HTMLElement>;
}

export function useLeafletPane(
  source: MaybeComputedRef<LeafletPaneProvider | null | undefined>,
  pane: MaybeComputedRef<Arrayable<string> | null | undefined>,
  options: UseLeafletPaneOptions = {}
) {
  const { zIndex } = options;

  const _source = resolveRef(source);
  const _panes = resolveRef(pane);
  const _paneElements = ref<Record<string, HTMLElement>>({});

  function init() {
    if (isDefined(_source) && isDefined(_panes)) {
      create(_source.value, _panes.value);
      update();
    }
  }

  function create(source: LeafletPaneProvider, panes: Arrayable<string>) {
    (!Array.isArray(panes) ? [panes] : panes).forEach(pane => {
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
    (!Array.isArray(panes) ? [panes] : panes).forEach(pane => {
      if (mapPanes[pane]) {
        mapPanes[pane].remove();
        delete mapPanes[pane];
      }
    });
  }

  function update() {
    _paneElements.value = _source.value?.getPanes() ?? {};
  }

  function diff<T>(arrA: T[], arrB: T[]): T[] {
    return arrA.filter(x => !arrB.includes(x));
  }

  watch(
    _panes,
    (_new, old) => {
      if (!isDefined(_source)) {
        return;
      }
      if (old && _new) {
        remove(_source.value, diff(old, _new));
        create(_source.value, diff(_new, old));
      } else if (old) {
        remove(old);
      } else if (_new) {
        add(_new);
      }
      _new && create(_source.value, _new);
      old && remove(_source.value, old);
    },
    { deep: true }
  );

  whenever(logicAnd(_source, _panes), () => {
    init();
  });

  init();

  return {
    paneElements: _paneElements
  };
}
