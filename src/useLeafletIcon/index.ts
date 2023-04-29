import { watch, type Ref } from 'vue-demi';
import { type MaybeRefOrGetter, toRef, isDefined } from '@vueuse/shared';
import { Icon, type IconOptions, type PointExpression } from 'leaflet';
import { useLeafletCreate } from '../useLeafletCreate';

export interface UseLeafletIconOptions
  extends Omit<
    IconOptions,
    | 'iconUrl'
    | 'iconRetinaUrl'
    | 'iconSize'
    | 'iconAnchor'
    | 'shadowUrl'
    | 'shadowRetinaUrl'
    | 'shadowSize'
    | 'shadowAnchor'
  > {
  iconRetinaUrl?: MaybeRefOrGetter<string | null | undefined>;
  iconSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  shadowUrl?: MaybeRefOrGetter<string | null | undefined>;
  shadowRetinaUrl?: MaybeRefOrGetter<string | null | undefined>;
  shadowSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  shadowAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  factory?: (...args: unknown[]) => Icon;
}

export type UseLeafletIconReturn = Ref<Icon | null>;

export function useLeafletIcon(
  iconUrl: MaybeRefOrGetter<string | null | undefined>,
  options: UseLeafletIconOptions = {}
): UseLeafletIconReturn {
  const {
    iconRetinaUrl,
    iconAnchor,
    iconSize,
    shadowUrl,
    shadowRetinaUrl,
    shadowSize,
    shadowAnchor,
    factory,
    ...iconOptions
  } = options;

  const _iconUrl = toRef(iconUrl);
  const _iconRetinaUrl = toRef(iconRetinaUrl);
  const _iconAnchor = toRef(iconAnchor);
  const _iconSize = toRef(iconSize);
  const _shadowUrl = toRef(shadowUrl);
  const _shadowRetinaUrl = toRef(shadowRetinaUrl);
  const _shadowSize = toRef(shadowSize);
  const _shadowAnchor = toRef(shadowAnchor);

  const _instance = useLeafletCreate(create, {
    watch: _iconUrl
  });

  function create(): Icon {
    const icon =
      typeof factory === 'function'
        ? factory(makeOptions())
        : new Icon(makeOptions());
    return wrap(icon);
  }

  function makeOptions(): IconOptions {
    const opt = { ...iconOptions } as IconOptions;
    opt.iconUrl = _iconUrl.value!;

    if (isDefined(_iconRetinaUrl)) {
      opt.iconRetinaUrl = _iconRetinaUrl.value;
    }
    if (isDefined(_iconAnchor)) {
      opt.iconAnchor = _iconAnchor.value;
    }
    if (isDefined(_iconSize)) {
      opt.iconSize = _iconSize.value;
    }
    if (isDefined(_shadowUrl)) {
      opt.shadowUrl = _shadowUrl.value;
    }
    if (isDefined(_shadowRetinaUrl)) {
      opt.shadowRetinaUrl = _shadowRetinaUrl.value;
    }
    if (isDefined(_shadowSize)) {
      opt.shadowSize = _shadowSize.value;
    }
    if (isDefined(_shadowAnchor)) {
      opt.shadowAnchor = _shadowAnchor.value;
    }

    return opt;
  }

  function wrap(instance: Icon): Icon {
    const superCreateIcon = instance.createIcon;
    const superCreateShadow = instance.createShadow;
    instance.createIcon = function (oldIcon?: HTMLElement): HTMLElement {
      (this as any)._iconElement = superCreateIcon.call(this, oldIcon);
      return (this as any)._iconElement;
    };
    instance.createShadow = function (oldIcon?: HTMLElement): HTMLElement {
      (this as any)._shadowElement = superCreateShadow.call(this, oldIcon);
      return (this as any)._shadowElement;
    };
    return instance;
  }

  function updateUrl(instance: Icon, name: 'icon' | 'shadow') {
    const el = (instance as any)[`_${name}Element`];
    if (el instanceof HTMLImageElement) {
      el.src = (instance as any)._getIconUrl(name);
    }
  }

  function updateSize(instance: Icon, name: 'icon' | 'shadow') {
    const el = (instance as any)[`_${name}Element`];
    if (el) {
      (instance as any)._setIconStyles(el, name);
    }
  }

  watch(_iconUrl, val => {
    if (!isDefined(_instance)) {
      return;
    }
    _instance.value.options.iconUrl = val ?? '';
    updateUrl(_instance.value, 'icon');
  });

  if (isDefined(iconRetinaUrl)) {
    watch(_iconRetinaUrl, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconRetinaUrl = val ?? '';
      updateUrl(_instance.value, 'icon');
    });
  }

  if (isDefined(iconSize)) {
    watch(_iconSize, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconSize = val as PointExpression;
      updateSize(_instance.value, 'icon');
    });
  }

  if (isDefined(iconAnchor)) {
    watch(_iconAnchor, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconAnchor = val as PointExpression;
      updateSize(_instance.value, 'icon');
    });
  }

  if (isDefined(shadowUrl)) {
    watch(_shadowUrl, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowUrl = val ?? '';
      updateUrl(_instance.value, 'shadow');
    });
  }

  if (isDefined(shadowRetinaUrl)) {
    watch(_shadowRetinaUrl, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowRetinaUrl = val ?? '';
      updateUrl(_instance.value, 'shadow');
    });
  }

  if (isDefined(shadowSize)) {
    watch(_shadowSize, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowSize = val as PointExpression;
      updateSize(_instance.value, 'shadow');
    });
  }

  if (isDefined(shadowAnchor)) {
    watch(_shadowAnchor, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowAnchor = val as PointExpression;
      updateSize(_instance.value, 'shadow');
    });
  }

  return _instance;
}