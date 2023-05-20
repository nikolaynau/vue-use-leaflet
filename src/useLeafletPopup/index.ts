import { ref, toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  notNullish,
  isDefined,
  type MaybeRef,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import {
  Popup,
  Util,
  type LatLngExpression,
  type Layer,
  type PointExpression,
  type PopupOptions
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export type PopupReactiveProperty =
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

export interface UseLeafletPopupOptions
  extends Omit<PopupOptions, PopupReactiveProperty> {
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
  content?: MaybeRef<
    | string
    | HTMLElement
    | ((layer: Layer) => string)
    | ((layer: Layer) => HTMLElement)
    | null
    | undefined
  >;
  source?: MaybeRefOrGetter<Layer | null | undefined>;
  defOptions?: PopupOptions;
  updateSources?: UpdateWatchSource<Popup>[];
  factory?: (...args: any[]) => Popup;
  dispose?: boolean;
}

export type UseLeafletPopupReturn = Ref<Popup | null>;

export function useLeafletPopup(
  latlng?: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options: UseLeafletPopupOptions = {}
): UseLeafletPopupReturn {
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
    content,
    className,
    source,
    defOptions,
    updateSources = [],
    factory,
    dispose,
    ...popupOptions
  } = options;

  const _latlng = toRef(latlng);
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
  const _content = ref(content);
  const _source = toRef(source);
  const _defOptions = defOptions ?? Popup.prototype.options;

  if (notNullish(latlng)) {
    updateSources.push({
      watch: _latlng,
      handler: (instance, val) => {
        if (val) {
          instance.setLatLng(toRaw(val));
        }
      }
    });
  }

  if (notNullish(offset)) {
    updateSources.push({
      watch: _offset,
      handler: (instance, val) => {
        instance.options.offset = toRaw(val) ?? _defOptions.offset;
        instance.update();
      }
    });
  }

  if (notNullish(maxWidth)) {
    updateSources.push({
      watch: _maxWidth,
      handler: (instance, val) => {
        instance.options.maxWidth = val ?? _defOptions.maxWidth;
        instance.update();
      }
    });
  }

  if (notNullish(minWidth)) {
    updateSources.push({
      watch: _minWidth,
      handler: (instance, val) => {
        instance.options.minWidth = val ?? _defOptions.minWidth;
        instance.update();
      }
    });
  }

  if (notNullish(maxHeight)) {
    updateSources.push({
      watch: _maxHeight,
      handler: (instance, val) => {
        instance.options.maxHeight = val ?? _defOptions.maxHeight;
        instance.update();
      }
    });
  }

  if (notNullish(autoPan)) {
    updateSources.push({
      watch: _autoPan,
      handler: (instance, val) => {
        instance.options.autoPan = val ?? _defOptions.autoPan;
      }
    });
  }

  if (notNullish(autoPanPaddingTopLeft)) {
    updateSources.push({
      watch: _autoPanPaddingTopLeft,
      handler: (instance, val) => {
        instance.options.autoPanPaddingTopLeft =
          toRaw(val) ?? _defOptions.autoPanPaddingTopLeft;
      }
    });
  }

  if (notNullish(autoPanPaddingBottomRight)) {
    updateSources.push({
      watch: _autoPanPaddingBottomRight,
      handler: (instance, val) => {
        instance.options.autoPanPaddingBottomRight =
          toRaw(val) ?? _defOptions.autoPanPaddingBottomRight;
      }
    });
  }

  if (notNullish(autoPanPadding)) {
    updateSources.push({
      watch: _autoPanPadding,
      handler: (instance, val) => {
        instance.options.autoPanPadding =
          toRaw(val) ?? _defOptions.autoPanPadding;
      }
    });
  }

  if (notNullish(content)) {
    updateSources.push({
      watch: _content,
      handler: (instance, val) => {
        instance.setContent(val ?? _defOptions.content);
      }
    });
  }

  if (notNullish(className)) {
    updateSources.push({
      watch: _className,
      handler: (instance, newVal, oldVal) => {
        instance.options.className = newVal ?? _defOptions.className;
        const el = instance.getElement();
        if (!el) {
          return;
        }

        if (oldVal) {
          el.classList.remove(...Util.splitWords(oldVal));
        }
        if (instance.options.className) {
          el.classList.add(...Util.splitWords(instance.options.className));
        }
      }
    });
  }

  if (notNullish(keepInView)) {
    updateSources.push({
      watch: _keepInView,
      handler: (instance, val) => {
        instance.options.keepInView = val ?? _defOptions.keepInView;
        const map = (instance as any)._map;
        if (!map) {
          return;
        }

        map.off('moveend', (instance as any)._adjustPan);
        if (instance.options.keepInView) {
          map.on('moveend', (instance as any)._adjustPan);
        }
      }
    });
  }

  const _instance = useLeafletLayer(create, {
    watch: notNullish(latlng) ? _latlng : undefined,
    updateSources,
    dispose
  });

  function create(): Popup {
    if (isDefined(_source)) {
      return factory
        ? factory(makeOptions(), toRaw(_source.value))
        : new Popup(makeOptions(), toRaw(_source.value));
    } else {
      return factory
        ? factory(toRaw(_latlng.value), makeOptions())
        : new Popup(toRaw(_latlng.value!), makeOptions());
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
    if (isDefined(_content)) {
      opt.content = _content.value;
    }

    return opt;
  }

  return _instance;
}
