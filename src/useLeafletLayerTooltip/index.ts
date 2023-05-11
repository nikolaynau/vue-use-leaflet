import { markRaw, ref, shallowRef, watch, toRaw, type Ref } from 'vue-demi';
import {
  toRef,
  isDefined,
  tryOnUnmounted,
  notNullish,
  type MaybeRef,
  type MaybeRefOrGetter
} from '@vueuse/shared';
import {
  Tooltip,
  Util,
  type Content,
  type Direction,
  type Layer,
  type PointExpression,
  type TooltipOptions,
  type LatLngExpression
} from 'leaflet';
import type { UpdateWatchSource } from '../useLeafletLayer';

export interface UseLeafletLayerTooltipOptions
  extends Omit<
    TooltipOptions,
    'offset' | 'direction' | 'opacity' | 'className'
  > {
  visible?: MaybeRef<boolean>;
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  direction?: MaybeRefOrGetter<Direction | null | undefined>;
  opacity?: MaybeRefOrGetter<number | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  defOptions?: TooltipOptions;
  autoBind?: boolean;
  updateSources?: UpdateWatchSource<Layer>[];
  dispose?: boolean;
}

export interface UseLeafletLayerTooltipReturn {
  visible: Ref<boolean>;
  tooltip: { value: Tooltip | null };
  bind: () => void;
  unbind: () => void;
  open: (latlng?: LatLngExpression) => void;
  close: () => void;
  toggle: () => void;
  isOpened: () => boolean;
}

export function useLeafletLayerTooltip(
  source: MaybeRefOrGetter<Layer | null | undefined>,
  content?: MaybeRef<
    ((layer: Layer) => Content) | Tooltip | Content | null | undefined
  >,
  options: UseLeafletLayerTooltipOptions = {}
): UseLeafletLayerTooltipReturn {
  const {
    offset,
    direction,
    opacity,
    className,
    defOptions,
    visible = false,
    updateSources = [],
    autoBind = true,
    dispose = true,
    ...tooltipOptions
  } = options;

  const _tooltip = shallowRef<Tooltip | null>(null);
  const _source = toRef(source);
  const _content = ref(content);
  const _visible = toRef(visible);
  const _offset = toRef(offset);
  const _direction = toRef(direction);
  const _opacity = toRef(opacity);
  const _className = toRef(className);
  const _defOptions = defOptions ?? Tooltip.prototype.options;

  const _publicTooltip = {
    get value() {
      return _tooltip.value;
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
        const tooltip = instance.getTooltip();
        if (tooltip) {
          tooltip.options.offset = toRaw(val) ?? _defOptions.offset;
          tooltip.update();
        }
      }
    });
  }

  if (notNullish(direction)) {
    updateSources.push({
      watch: _direction,
      handler: (instance, val) => {
        const tooltip = instance.getTooltip();
        if (tooltip) {
          tooltip.options.direction = val ?? _defOptions.direction;
          tooltip.update();
        }
      }
    });
  }

  if (notNullish(opacity)) {
    updateSources.push({
      watch: _opacity,
      handler: (instance, val) => {
        const tooltip = instance.getTooltip();
        if (tooltip) {
          tooltip.setOpacity(val ?? _defOptions.opacity);
        }
      }
    });
  }

  if (notNullish(content)) {
    updateSources.push({
      watch: _content,
      handler: (instance, val) => {
        instance.setTooltipContent(val ?? _defOptions.content);
      }
    });
  }

  if (notNullish(className)) {
    updateSources.push({
      watch: _className,
      handler: (instance, newVal, oldVal) => {
        const tooltip = instance.getTooltip();
        if (!tooltip) {
          return;
        }
        tooltip.options.className = newVal ?? _defOptions.className;
        const el = tooltip.getElement();
        if (!el) {
          return;
        }

        if (oldVal) {
          el.classList.remove(...Util.splitWords(oldVal));
        }
        if (tooltip.options.className) {
          el.classList.add(...Util.splitWords(tooltip.options.className));
        }
      }
    });
  }

  function bind() {
    if (isDefined(_source)) {
      _source.value
        .bindTooltip(
          (_content.value as any) ?? _defOptions.content,
          makeOptions()
        )
        .on('add', onAdd)
        .on('tooltipopen', onOpen)
        .on('tooltipclose', onClose);

      const tooltip = _source.value.getTooltip();
      if (tooltip) {
        _tooltip.value = markRaw(tooltip);
      }
    }
  }

  function unbind() {
    _unbind(_source.value);
  }

  function _unbind(obj: Layer | null | undefined) {
    if (notNullish(obj)) {
      obj
        .unbindTooltip()
        .off('add', onAdd)
        .off('tooltipopen', onOpen)
        .off('tooltipclose', onClose);
    }
    _tooltip.value = null;
  }

  function open(latlng?: LatLngExpression) {
    _source.value?.openTooltip(latlng);
  }

  function close() {
    _source.value?.closeTooltip();
  }

  function toggle() {
    if ((_source.value as any)?._map) {
      _source.value!.toggleTooltip();
    }
  }

  function isOpened(): boolean {
    if (_source.value?.getTooltip()) {
      return _source.value.isTooltipOpen();
    }
    return false;
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
    tooltip: _publicTooltip,
    bind,
    unbind,
    open,
    close,
    toggle,
    isOpened
  };
}
