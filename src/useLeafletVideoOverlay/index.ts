import { toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  type MaybeRefOrGetter,
  notNullish,
  isDefined
} from '@vueuse/shared';
import { logicAnd } from '@vueuse/math';
import {
  type LatLngBoundsExpression,
  type VideoOverlayOptions,
  VideoOverlay,
  Util,
  DomUtil
} from 'leaflet';
import { useLeafletLayer, type UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletVideoOverlayOptions
  extends Omit<
    VideoOverlayOptions,
    | 'autoplay'
    | 'loop'
    | 'keepAspectRatio'
    | 'muted'
    | 'playsInline'
    | 'opacity'
    | 'zIndex'
    | 'className'
  > {
  autoplay?: MaybeRefOrGetter<boolean | null | undefined>;
  loop?: MaybeRefOrGetter<boolean | null | undefined>;
  keepAspectRatio?: MaybeRefOrGetter<boolean | null | undefined>;
  muted?: MaybeRefOrGetter<boolean | null | undefined>;
  playsInline?: MaybeRefOrGetter<boolean | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  zIndex?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: VideoOverlayOptions;
  updateSources?: UpdateWatchSource<VideoOverlay>[];
  factory?: (...args: any[]) => VideoOverlay;
  dispose?: boolean;
}

export type UseLeafletVideoOverlayReturn = Ref<VideoOverlay | null>;

export function useLeafletVideoOverlay(
  video: MaybeRefOrGetter<
    string | string[] | HTMLVideoElement | null | undefined
  >,
  bounds: MaybeRefOrGetter<LatLngBoundsExpression | null | undefined>,
  options: UseLeafletVideoOverlayOptions = {}
): UseLeafletVideoOverlayReturn {
  const {
    autoplay,
    loop,
    keepAspectRatio,
    muted,
    playsInline,
    opacity,
    zIndex,
    className,
    factory,
    dispose,
    defOptions,
    updateSources = [],
    ...overlayOptions
  } = options;

  const _video = toRef(video);
  const _bounds = toRef(bounds);
  const _autoplay = toRef(autoplay);
  const _loop = toRef(loop);
  const _keepAspectRatio = toRef(keepAspectRatio);
  const _muted = toRef(muted);
  const _playsInline = toRef(playsInline);
  const _opacity = toRef(opacity);
  const _zIndex = toRef(zIndex);
  const _className = toRef(className);
  const _defOptions = defOptions ?? VideoOverlay.prototype.options;

  updateSources.push({
    watch: _video,
    handler: (instance, val) => {
      if (typeof val === 'string') {
        instance.setUrl(val);
      } else if (Array.isArray(val)) {
        setUrl(instance, val);
      } else if (val instanceof HTMLVideoElement) {
        setUrl(instance, getUrls(val));
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

  if (notNullish(autoplay)) {
    updateSources.push({
      watch: _autoplay,
      handler: (instance, val) => {
        instance.options.autoplay = val ?? _defOptions.autoplay;
        const el = instance.getElement();
        if (el) {
          el.autoplay = !!instance.options.autoplay;
        }
      }
    });
  }

  if (notNullish(loop)) {
    updateSources.push({
      watch: _loop,
      handler: (instance, val) => {
        instance.options.loop = val ?? _defOptions.loop;
        const el = instance.getElement();
        if (el) {
          el.loop = !!instance.options.loop;
        }
      }
    });
  }

  if (notNullish(keepAspectRatio)) {
    updateSources.push({
      watch: _keepAspectRatio,
      handler: (instance, val) => {
        instance.options.keepAspectRatio = val ?? _defOptions.keepAspectRatio;
        const el = instance.getElement();
        if (el && el.style.objectFit !== undefined) {
          el.style.objectFit = !instance.options.keepAspectRatio ? 'fill' : '';
        }
      }
    });
  }

  if (notNullish(muted)) {
    updateSources.push({
      watch: _muted,
      handler: (instance, val) => {
        instance.options.muted = val ?? _defOptions.muted;
        const el = instance.getElement();
        if (el) {
          el.muted = !!instance.options.muted;
        }
      }
    });
  }

  if (notNullish(playsInline)) {
    updateSources.push({
      watch: _playsInline,
      handler: (instance, val) => {
        instance.options.playsInline = val ?? _defOptions.playsInline;
        const el = instance.getElement();
        if (el) {
          el.playsInline = !!instance.options.playsInline;
        }
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
    watch: logicAnd(_video, _bounds),
    updateSources,
    dispose
  });

  function create(): VideoOverlay {
    return factory
      ? factory(toRaw(_video.value), toRaw(_bounds.value), makeOptions())
      : new VideoOverlay(
          toRaw(_video.value!),
          toRaw(_bounds.value!),
          makeOptions()
        );
  }

  function makeOptions(): VideoOverlayOptions {
    const opt = {
      ...overlayOptions
    } as VideoOverlayOptions;

    if (isDefined(_autoplay)) {
      opt.autoplay = _autoplay.value;
    }
    if (isDefined(_loop)) {
      opt.loop = _loop.value;
    }
    if (isDefined(_keepAspectRatio)) {
      opt.keepAspectRatio = _keepAspectRatio.value;
    }
    if (isDefined(_muted)) {
      opt.muted = _muted.value;
    }
    if (isDefined(_playsInline)) {
      opt.playsInline = _playsInline.value;
    }
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

  function updateUrls(el: HTMLVideoElement, urls: string[]): void {
    el.replaceChildren();

    for (let j = 0; j < urls.length; j++) {
      const url = urls[j];
      if (url) {
        const source = DomUtil.create('source');
        source.src = url;
        el.appendChild(source);
      }
    }
  }

  function getUrls(el: HTMLVideoElement): string[] {
    const sourceElements = el.getElementsByTagName('source');
    const sources = [];
    for (let i = 0; i < sourceElements.length; i++) {
      sources.push(sourceElements[i].src);
    }
    return sourceElements.length > 0 ? sources : [el.src];
  }

  function setUrl(instance: VideoOverlay, urls: string[]) {
    (instance as any)._url = urls;
    const el = instance.getElement();
    el && updateUrls(el, urls);
  }

  return _instance;
}
