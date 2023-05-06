import { toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  isDefined,
  notNullish,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import {
  Util,
  SVGOverlay,
  type ImageOverlayOptions,
  type LatLngBoundsExpression
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletSvgOverlayOptions
  extends Omit<ImageOverlayOptions, 'opacity' | 'zIndex' | 'className'> {
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  updateSources?: UpdateWatchSource<SVGOverlay>[];
  factory?: (...args: any[]) => SVGOverlay;
  dispose?: boolean;
}

export type UseLeafletSvgOverlayReturn = Ref<SVGOverlay | null>;

export function useLeafletSvgOverlay(
  svgElement: MaybeRefOrGetter<SVGElement | null | undefined>,
  bounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options: UseLeafletSvgOverlayOptions = {}
): UseLeafletSvgOverlayReturn {
  const {
    opacity,
    zIndex,
    className,
    updateSources = [],
    factory,
    dispose,
    ...overlayOptions
  } = options;

  const _svgElement = toRef(svgElement);
  const _bounds = toRef(bounds);
  const _opacity = toRef(opacity);
  const _zIndex = toRef(zIndex);
  const _className = toRef(className);
  const _defOptions = SVGOverlay.prototype.options;

  updateSources.push({
    watch: _svgElement,
    handler: (instance, val) => {
      if (val instanceof SVGElement) {
        const obj = instance as any;
        obj._url = val;
        obj._initImage();
        obj._updateOpacity();
        obj._updateZIndex();
        if (obj._map) {
          obj._reset();
        }
      }
    }
  });

  updateSources.push({
    watch: _bounds,
    handler: (instance, val) => {
      if (val) {
        instance.setBounds(toRaw(val));
      }
    }
  });

  if (notNullish(opacity)) {
    updateSources.push({
      watch: _opacity,
      handler: (instance, val) => {
        instance.setOpacity(val ?? _defOptions.opacity);
      }
    });
  }

  if (notNullish(zIndex)) {
    updateSources.push({
      watch: _zIndex,
      handler: (instance, val) => {
        instance.setZIndex(val ?? _defOptions.zIndex);
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
    watch: logicAnd(_svgElement, _bounds),
    updateSources,
    dispose
  });

  function create(): SVGOverlay {
    return factory
      ? factory(toRaw(_svgElement.value), toRaw(_bounds.value), makeOptions())
      : new SVGOverlay(
          toRaw(_svgElement.value!),
          toRaw(_bounds.value!),
          makeOptions()
        );
  }

  function makeOptions(): ImageOverlayOptions {
    const opt = {
      ...overlayOptions
    } as ImageOverlayOptions;

    if (isDefined(_opacity)) {
      opt.opacity = _opacity.value;
    }
    if (isDefined(_zIndex)) {
      opt.zIndex = _zIndex.value;
    }
    if (isDefined(_className)) {
      opt.className = _className.value;
    }

    return opt;
  }

  return _instance;
}
