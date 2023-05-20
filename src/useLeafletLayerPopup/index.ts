import { shallowRef, type Ref, ref, markRaw, toRaw, watch } from 'vue-demi';
import {
  toRef,
  isDefined,
  notNullish,
  tryOnUnmounted,
  type MaybeRef,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import {
  Popup,
  Util,
  type Content,
  type LatLngExpression,
  type Layer,
  type PointExpression,
  type PopupOptions
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
  const _maxWidth = toRef(maxWidth);
  const _minWidth = toRef(minWidth);
  const _maxHeight = toRef(maxHeight);
  const _keepInView = toRef(keepInView);
  const _autoPan = toRef(autoPan);
  const _autoPanPaddingTopLeft = toRef(autoPanPaddingTopLeft);
  const _autoPanPaddingBottomRight = toRef(autoPanPaddingBottomRight);
  const _autoPanPadding = toRef(autoPanPadding);
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

  updateSources.push({
    watch: _visible,
    handler: (_, val) => {
      val ? open() : close();
    }
  });

  if (notNullish(offset)) {
    updateSources.push({
      watch: _offset,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.offset = toRaw(val) ?? _defOptions.offset;
          popup.update();
        }
      }
    });
  }

  if (notNullish(maxWidth)) {
    updateSources.push({
      watch: _maxWidth,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.maxWidth = val ?? _defOptions.maxWidth;
          popup.update();
        }
      }
    });
  }

  if (notNullish(minWidth)) {
    updateSources.push({
      watch: _minWidth,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.minWidth = val ?? _defOptions.minWidth;
          popup.update();
        }
      }
    });
  }

  if (notNullish(maxHeight)) {
    updateSources.push({
      watch: _maxHeight,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.maxHeight = val ?? _defOptions.maxHeight;
          popup.update();
        }
      }
    });
  }

  if (notNullish(autoPan)) {
    updateSources.push({
      watch: _autoPan,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.autoPan = val ?? _defOptions.autoPan;
        }
      }
    });
  }

  if (notNullish(autoPanPaddingTopLeft)) {
    updateSources.push({
      watch: _autoPanPaddingTopLeft,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.autoPanPaddingTopLeft =
            toRaw(val) ?? _defOptions.autoPanPaddingTopLeft;
        }
      }
    });
  }

  if (notNullish(autoPanPaddingBottomRight)) {
    updateSources.push({
      watch: _autoPanPaddingBottomRight,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.autoPanPaddingBottomRight =
            toRaw(val) ?? _defOptions.autoPanPaddingBottomRight;
        }
      }
    });
  }

  if (notNullish(autoPanPadding)) {
    updateSources.push({
      watch: _autoPanPadding,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (popup) {
          popup.options.autoPanPadding =
            toRaw(val) ?? _defOptions.autoPanPadding;
        }
      }
    });
  }

  if (notNullish(content)) {
    updateSources.push({
      watch: _content,
      handler: (instance, val) => {
        instance.setPopupContent(val ?? _defOptions.content);
      }
    });
  }

  if (notNullish(className)) {
    updateSources.push({
      watch: _className,
      handler: (instance, newVal, oldVal) => {
        const popup = instance.getPopup();
        if (!popup) {
          return;
        }
        popup.options.className = newVal ?? _defOptions.className;
        const el = popup.getElement();
        if (!el) {
          return;
        }

        if (oldVal) {
          el.classList.remove(...Util.splitWords(oldVal));
        }
        if (popup.options.className) {
          el.classList.add(...Util.splitWords(popup.options.className));
        }
      }
    });
  }

  if (notNullish(keepInView)) {
    updateSources.push({
      watch: _keepInView,
      handler: (instance, val) => {
        const popup = instance.getPopup();
        if (!popup) {
          return;
        }

        popup.options.keepInView = val ?? _defOptions.keepInView;
        const map = (instance as any)._map;
        if (!map) {
          return;
        }

        map.off('moveend', (instance as any)._adjustPan);
        if (popup.options.keepInView) {
          map.on('moveend', (instance as any)._adjustPan);
        }
      }
    });
  }

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
    if (isDefined(_maxWidth)) {
      opt.maxWidth = _maxWidth.value;
    }
    if (isDefined(_minWidth)) {
      opt.minWidth = _minWidth.value;
    }
    if (isDefined(_maxHeight)) {
      opt.maxHeight = _maxHeight.value;
    }
    if (isDefined(_keepInView)) {
      opt.keepInView = _keepInView.value;
    }
    if (isDefined(_autoPan)) {
      opt.autoPan = _autoPan.value;
    }
    if (isDefined(_autoPanPaddingTopLeft)) {
      opt.autoPanPaddingTopLeft = _autoPanPaddingTopLeft.value;
    }
    if (isDefined(_autoPanPaddingBottomRight)) {
      opt.autoPanPaddingBottomRight = _autoPanPaddingBottomRight.value;
    }
    if (isDefined(_autoPanPadding)) {
      opt.autoPanPadding = _autoPanPadding.value;
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
