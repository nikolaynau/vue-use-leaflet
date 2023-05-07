import type { Ref, WatchSource } from 'vue-demi';
import {
  toRef,
  type MaybeRefOrGetter,
  isDefined,
  notNullish
} from '@vueuse/shared';
import {
  Path,
  type FillRule,
  type LineCapShape,
  type LineJoinShape,
  type PathOptions,
  Util
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export type PathReactiveProperty =
  | 'stroke'
  | 'color'
  | 'weight'
  | 'opacity'
  | 'lineCap'
  | 'lineJoin'
  | 'dashArray'
  | 'dashOffset'
  | 'fill'
  | 'fillColor'
  | 'fillOpacity'
  | 'fillRule'
  | 'className';

export interface UseLeafletPathOptions<T extends Path = Path>
  extends Omit<PathOptions, PathReactiveProperty> {
  stroke?: MaybeRefOrGetter<boolean | null | undefined>;
  color?: MaybeRefOrGetter<string | null | undefined>;
  weight?: MaybeRefOrGetter<number | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  lineCap?: MaybeRefOrGetter<LineCapShape | null | undefined>;
  lineJoin?: MaybeRefOrGetter<LineJoinShape | null | undefined>;
  dashArray?: MaybeRefOrGetter<string | null | number[] | null | undefined>;
  dashOffset?: MaybeRefOrGetter<string | null | undefined>;
  fill?: MaybeRefOrGetter<boolean | null | undefined>;
  fillColor?: MaybeRefOrGetter<string | null | undefined>;
  fillOpacity?: MaybeRefOrGetter<number | null | undefined>;
  fillRule?: MaybeRefOrGetter<FillRule | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  updateSources?: UpdateWatchSource<T>[];
  watch?: WatchSource<any>;
  dispose?: boolean;
}

export type UseLeafletPathReturn<T extends Path = Path> = Ref<T | null>;

export function useLeafletPath<T extends Path = Path>(
  factory: (opt: PathOptions) => T,
  options: UseLeafletPathOptions<T> = {}
): UseLeafletPathReturn<T> {
  const {
    stroke,
    color,
    weight,
    opacity,
    lineCap,
    lineJoin,
    dashArray,
    dashOffset,
    fill,
    fillColor,
    fillOpacity,
    fillRule,
    className,
    updateSources = [],
    watch: _watch,
    dispose,
    ...pathOptions
  } = options ?? {};

  const _stroke = toRef(stroke);
  const _color = toRef(color);
  const _weight = toRef(weight);
  const _opacity = toRef(opacity);
  const _lineCap = toRef(lineCap);
  const _lineJoin = toRef(lineJoin);
  const _dashArray = toRef(dashArray);
  const _dashOffset = toRef(dashOffset);
  const _fill = toRef(fill);
  const _fillColor = toRef(fillColor);
  const _fillOpacity = toRef(fillOpacity);
  const _fillRule = toRef(fillRule);
  const _className = toRef(className);
  const _defOptions = Path.prototype.options;

  if (notNullish(stroke)) {
    watchStyle('stroke', _stroke);
  }

  if (notNullish(color)) {
    watchStyle('color', _color);
  }

  if (notNullish(weight)) {
    watchStyle('weight', _weight);
  }

  if (notNullish(opacity)) {
    watchStyle('opacity', _opacity);
  }

  if (notNullish(lineCap)) {
    watchStyle('lineCap', _lineCap);
  }

  if (notNullish(lineJoin)) {
    watchStyle('lineJoin', _lineJoin);
  }

  if (notNullish(dashArray)) {
    watchStyle('dashArray', _dashArray);
  }

  if (notNullish(dashOffset)) {
    watchStyle('dashOffset', _dashOffset);
  }

  if (notNullish(fill)) {
    watchStyle('fill', _fill);
  }

  if (notNullish(fillColor)) {
    watchStyle('fillColor', _fillColor);
  }

  if (notNullish(fillOpacity)) {
    watchStyle('fillOpacity', _fillOpacity);
  }

  if (notNullish(fillRule)) {
    watchStyle('fillRule', _fillRule);
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
    watch: _watch,
    updateSources,
    dispose
  });

  function create(): T {
    return factory(makeOptions());
  }

  function makeOptions(): PathOptions {
    const opt = {
      ...pathOptions
    } as PathOptions;

    if (isDefined(_stroke)) {
      opt.stroke = _stroke.value;
    }
    if (isDefined(_color)) {
      opt.color = _color.value;
    }
    if (isDefined(_weight)) {
      opt.weight = _weight.value;
    }
    if (isDefined(_opacity)) {
      opt.opacity = _opacity.value;
    }
    if (isDefined(_lineCap)) {
      opt.lineCap = _lineCap.value;
    }
    if (isDefined(_lineJoin)) {
      opt.lineJoin = _lineJoin.value;
    }
    if (isDefined(_dashArray)) {
      opt.dashArray = _dashArray.value;
    }
    if (isDefined(_dashOffset)) {
      opt.dashOffset = _dashOffset.value;
    }
    if (isDefined(_fill)) {
      opt.fill = _fill.value;
    }
    if (isDefined(_fillColor)) {
      opt.fillColor = _fillColor.value;
    }
    if (isDefined(_fillOpacity)) {
      opt.fillOpacity = _fillOpacity.value;
    }
    if (isDefined(_fillRule)) {
      opt.fillRule = _fillRule.value;
    }
    if (isDefined(_className)) {
      opt.className = _className.value;
    }

    return opt;
  }

  function watchStyle<T = any>(name: PathReactiveProperty, property: Ref<T>) {
    updateSources.push({
      watch: property,
      handler: (instance, val) => {
        instance.setStyle({ [name]: val ?? _defOptions[name] });
      }
    });
  }

  return _instance;
}
