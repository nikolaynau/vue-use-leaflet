import { ref, toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  type MaybeRefOrGetter,
  isDefined,
  type MaybeRef,
  notNullish
} from '@vueuse/shared';
import {
  Tooltip,
  type Direction,
  type LatLngExpression,
  type Layer,
  type PointExpression,
  type TooltipOptions,
  Util
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletTooltipOptions
  extends Omit<
    TooltipOptions,
    'offset' | 'direction' | 'opacity' | 'className' | 'content'
  > {
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  direction?: MaybeRefOrGetter<Direction | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
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
  defOptions?: TooltipOptions;
  updateSources?: UpdateWatchSource<Tooltip>[];
  factory?: (...args: any[]) => Tooltip;
  dispose?: boolean;
}

export type UseLeafletTooltipReturn = Ref<Tooltip | null>;

export function useLeafletTooltip(
  latlng?: MaybeRefOrGetter<LatLngExpression | null | undefined>,
  options: UseLeafletTooltipOptions = {}
): UseLeafletTooltipReturn {
  const {
    offset,
    direction,
    opacity,
    content,
    className,
    source,
    defOptions,
    updateSources = [],
    factory,
    dispose,
    ...tooltipOptions
  } = options;

  const _latlng = toRef(latlng);
  const _offset = toRef(offset);
  const _direction = toRef(direction);
  const _opacity = toRef(opacity);
  const _className = toRef(className);
  const _content = ref(content);
  const _source = toRef(source);
  const _defOptions = defOptions ?? Tooltip.prototype.options;

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

  if (notNullish(direction)) {
    updateSources.push({
      watch: _direction,
      handler: (instance, val) => {
        instance.options.direction = val ?? _defOptions.direction;
        instance.update();
      }
    });
  }

  if (notNullish(opacity)) {
    updateSources.push({
      watch: _opacity,
      handler: (instance, val) => {
        instance.setOpacity(val ?? _defOptions.opacity);
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

  function create(): Tooltip {
    if (isDefined(_source)) {
      return factory
        ? factory(makeOptions(), toRaw(_source.value))
        : new Tooltip(makeOptions(), toRaw(_source.value));
    } else {
      return factory
        ? factory(toRaw(_latlng.value), makeOptions())
        : new Tooltip(toRaw(_latlng.value!), makeOptions());
    }
  }

  function makeOptions(): TooltipOptions {
    const opt = {
      ...tooltipOptions
    } as TooltipOptions;

    if (isDefined(_offset)) {
      opt.offset = toRaw(_offset.value);
    }
    if (isDefined(_direction)) {
      opt.direction = _direction.value;
    }
    if (isDefined(_opacity)) {
      opt.opacity = _opacity.value;
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
