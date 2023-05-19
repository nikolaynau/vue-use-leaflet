import { shallowRef, type Ref, ref, markRaw, toRaw, watch } from 'vue-demi';
import {
  toRef,
  type MaybeRef,
  type MaybeRefOrGetter,
  isDefined,
  notNullish,
  tryOnUnmounted
} from '@vueuse/shared';
import {
  type Content,
  type LatLngExpression,
  type Layer,
  type PointExpression,
  type PopupOptions,
  Popup
} from 'leaflet';
import type { UpdateWatchSource } from '../useLeafletLayer';

export type LayerPopupReactiveProperty =
  | 'offset'
  | 'maxWidth'
  | 'minWidth'
  | 'maxHeight'
  | 'className'
  | 'content'
  | 'keepInView'
  | 'autoPan'
  | 'autoPanPaddingTopLeft'
  | 'autoPanPaddingBottomRight'
  | 'autoPanPadding';

export interface UseLeafletLayerPopupOptions
  extends Omit<PopupOptions, LayerPopupReactiveProperty> {
  visible?: MaybeRef<boolean>;
  autoBind?: boolean;
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  maxWidth?: MaybeRefOrGetter<number | null | undefined>;
  minWidth?: MaybeRefOrGetter<number | null | undefined>;
  maxHeight?: MaybeRefOrGetter<number | null | undefined>;
  keepInView?: MaybeRefOrGetter<boolean | null | undefined>;
  autoPan?: MaybeRefOrGetter<boolean | null | undefined>;
  autoPanPaddingTopLeft?: MaybeRefOrGetter<PointExpression | null | undefined>;
  autoPanPaddingBottomRight?: MaybeRefOrGetter<
    PointExpression | null | undefined
  >;
  autoPanPadding?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: PopupOptions;
  updateSources?: UpdateWatchSource<Layer>[];
  dispose?: boolean;
}

export interface UseLeafletLayerPopupReturn {
  visible: Ref<boolean>;
  popup: { value: Popup | null };
  bind: () => void;
  unbind: () => void;
  open: (latlng?: LatLngExpression) => void;
  close: () => void;
  toggle: () => void;
  isOpened: () => boolean;
}

export function useLeafletLayerPopup(
  source: MaybeRefOrGetter<Layer | null | undefined>,
  content?: MaybeRef<
    ((layer: Layer) => Content) | Popup | Content | null | undefined
  >,
  options: UseLeafletLayerPopupOptions = {}
): UseLeafletLayerPopupReturn {
  const {
    offset,
    maxWidth,
    minWidth,
    maxHeight,
    keepInView,
    autoPan,
    autoPanPaddingTopLeft,
    autoPanPaddingBottomRight,
    autoPanPadding,
    className,
    visible = false,
    autoBind = true,
    defOptions,
    updateSources = [],
    dispose = true,
    ...popupOptions
  } = options;

  const _popup = shallowRef<Popup | null>(null);
  const _source = toRef(source);
  const _content = ref(content);
  const _visible = toRef(visible);
  const _offset = toRef(offset);
  const _className = toRef(className);
  const _defOptions = defOptions ?? Popup.prototype.options;

  const _publicPopup = {
    get value() {
      return _popup.value;
    },
    set value(newVal) {
      if (!newVal) {
        unbind();
      }
    }
  };

  function bind() {
    if (!isDefined(_source)) {
      return;
    }

    _source.value
      .bindPopup((_content.value as any) ?? _defOptions.content, makeOptions())
      .on('add', onAdd)
      .on('popupopen', onOpen)
      .on('popupclose', onClose);

    const popup = _source.value.getPopup();
    if (popup) {
      _popup.value = markRaw(popup);
    }
  }

  function unbind() {
    _unbind(_source.value);
  }

  function _unbind(obj: Layer | null | undefined) {
    if (notNullish(obj)) {
      obj
        .unbindPopup()
        .off('add', onAdd)
        .off('popupopen', onOpen)
        .off('popupclose', onClose);
    }
    _popup.value = null;
  }

  function open(latlng?: LatLngExpression) {
    _source.value?.openPopup(latlng);
  }

  function close() {
    _source.value?.closePopup();
  }

  function toggle() {
    if ((_source.value as any)?._map) {
      _source.value!.togglePopup();
    }
  }

  function isOpened(): boolean {
    return _source.value?.isPopupOpen() ?? false;
  }

  function onOpen() {
    _visible.value = true;
  }

  function onClose() {
    _visible.value = false;
  }

  function onAdd() {
    if (_visible.value) {
      open();
    }
  }

  function makeOptions(): PopupOptions {
    const opt = {
      ...popupOptions
    } as PopupOptions;

    if (isDefined(_offset)) {
      opt.offset = toRaw(_offset.value);
    }
    if (isDefined(_className)) {
      opt.className = _className.value;
    }

    return opt;
  }

  function watchUpdate(watchSource: UpdateWatchSource<Layer>) {
    const { handler, options } = watchSource;
    watch(
      watchSource.watch,
      (newVal, oldVal) => {
        if (_source.value) {
          handler(_source.value, newVal, oldVal);
        }
      },
      { ...options }
    );
  }

  if (autoBind) {
    watch(
      _source,
      (newVal, oldVal) => {
        if (oldVal) {
          _unbind(oldVal);
        }
        if (newVal) {
          bind();
        }
      },
      { immediate: true }
    );
  }

  updateSources.forEach(watchUpdate);

  if (dispose) {
    tryOnUnmounted(() => {
      unbind();
    });
  }

  return {
    visible: _visible,
    popup: _publicPopup,
    bind,
    unbind,
    open,
    close,
    toggle,
    isOpened
  };
}
