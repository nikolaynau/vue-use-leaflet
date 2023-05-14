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

export interface UseLeafletPopupOptions
  extends Omit<
    PopupOptions,
    'offset' | 'maxWidth' | 'minWidth' | 'maxHeight' | 'className' | 'content'
  > {
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  maxWidth?: MaybeRefOrGetter<number | null | undefined>;
  minWidth?: MaybeRefOrGetter<number | null | undefined>;
  maxHeight?: MaybeRefOrGetter<number | null | undefined>;
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
  const _maxWidth = toRef(maxWidth);
  const _minWidth = toRef(minWidth);
  const _maxHeight = toRef(maxHeight);
  const _offset = toRef(offset);
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
      opt.maxWidth = toRaw(_maxWidth.value);
    }
    if (isDefined(_minWidth)) {
      opt.minWidth = toRaw(_minWidth.value);
    }
    if (isDefined(_maxHeight)) {
      opt.maxHeight = toRaw(_maxHeight.value);
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
