import { toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  isDefined,
  notNullish,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import {
  ImageOverlay,
  Util,
  type ImageOverlayOptions,
  type LatLngBoundsExpression
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletImageOverlayOptions
  extends Omit<
    ImageOverlayOptions,
    'opacity' | 'alt' | 'zIndex' | 'className'
  > {
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  alt?: MaybeRefOrGetter<string | null | undefined>;
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: ImageOverlayOptions;
  updateSources?: UpdateWatchSource<ImageOverlay>[];
  factory?: (...args: any[]) => ImageOverlay;
  dispose?: boolean;
}

export type UseLeafletImageOverlayReturn = Ref<ImageOverlay | null>;

export function useLeafletImageOverlay(
  imageUrl: MaybeRefOrGetter<string | null | undefined>,
  bounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options: UseLeafletImageOverlayOptions = {}
): UseLeafletImageOverlayReturn {
  const {
    opacity,
    alt,
    zIndex,
    className,
    factory,
    dispose,
    defOptions,
    updateSources = [],
    ...overlayOptions
  } = options;

  const _imageUrl = toRef(imageUrl);
  const _bounds = toRef(bounds);
  const _opacity = toRef(opacity);
  const _alt = toRef(alt);
  const _zIndex = toRef(zIndex);
  const _className = toRef(className);
  const _defOptions = defOptions ?? ImageOverlay.prototype.options;

  updateSources.push({
    watch: _imageUrl,
    handler: (instance, val) => {
      if (val) {
        instance.setUrl(val);
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

  if (notNullish(alt)) {
    updateSources.push({
      watch: _alt,
      handler: (instance, val) => {
        instance.options.alt = val ?? _defOptions.alt;
        const el = instance.getElement();
        if (el) {
          el.alt = instance.options.alt!;
        }
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
    watch: logicAnd(_imageUrl, _bounds),
    updateSources,
    dispose
  });

  function create(): ImageOverlay {
    return factory
      ? factory(_imageUrl.value, toRaw(_bounds.value), makeOptions())
      : new ImageOverlay(
          _imageUrl.value!,
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
    if (isDefined(_alt)) {
      opt.alt = _alt.value;
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
