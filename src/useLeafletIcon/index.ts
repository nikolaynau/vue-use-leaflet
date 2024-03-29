import { watch, type Ref } from 'vue-demi';
import {
  type MaybeRefOrGetter,
  toRef,
  isDefined,
  notNullish,
  toValue
} from '@vueuse/shared';
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
    | 'className'
  > {
  iconRetinaUrl?: MaybeRefOrGetter<string | null | undefined>;
  iconSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  shadowUrl?: MaybeRefOrGetter<string | null | undefined>;
  shadowRetinaUrl?: MaybeRefOrGetter<string | null | undefined>;
  shadowSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  shadowAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  knownClasses?: MaybeRefOrGetter<string[] | null | undefined>;
  factory?: (...args: any[]) => Icon;
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
    className,
    knownClasses,
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
  const _className = toRef(className);

  const _knownClasses = toRef(() => [
    ...(toValue(knownClasses) ?? []),
    'leaflet-zoom-animated',
    'leaflet-zoom-hide',
    'leaflet-interactive'
  ]);

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
    if (isDefined(_className)) {
      opt.className = _className.value;
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

  function updateStyles(instance: Icon, name: 'icon' | 'shadow') {
    const el = (instance as any)[`_${name}Element`] as HTMLElement;
    if (el) {
      const kClasses = _knownClasses.value;
      const classes = [...el.classList].filter(c => kClasses.includes(c));
      (instance as any)._setIconStyles(el, name);
      classes.forEach(c => el.classList.add(c));
    }
  }

  watch(_iconUrl, val => {
    if (!isDefined(_instance)) {
      return;
    }
    _instance.value.options.iconUrl = val ?? '';
    updateUrl(_instance.value, 'icon');
  });

  if (notNullish(iconRetinaUrl)) {
    watch(_iconRetinaUrl, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconRetinaUrl = val ?? '';
      updateUrl(_instance.value, 'icon');
    });
  }

  if (notNullish(iconSize)) {
    watch(_iconSize, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconSize = val as PointExpression;
      updateStyles(_instance.value, 'icon');
    });
  }

  if (notNullish(iconAnchor)) {
    watch(_iconAnchor, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconAnchor = val as PointExpression;
      updateStyles(_instance.value, 'icon');
    });
  }

  if (notNullish(shadowUrl)) {
    watch(_shadowUrl, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowUrl = val ?? '';
      updateUrl(_instance.value, 'shadow');
    });
  }

  if (notNullish(shadowRetinaUrl)) {
    watch(_shadowRetinaUrl, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowRetinaUrl = val ?? '';
      updateUrl(_instance.value, 'shadow');
    });
  }

  if (notNullish(shadowSize)) {
    watch(_shadowSize, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowSize = val as PointExpression;
      updateStyles(_instance.value, 'shadow');
    });
  }

  if (notNullish(shadowAnchor)) {
    watch(_shadowAnchor, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.shadowAnchor = val as PointExpression;
      updateStyles(_instance.value, 'shadow');
    });
  }

  if (notNullish(className)) {
    watch(_className, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.className = val as string;
      updateStyles(_instance.value, 'icon');
      updateStyles(_instance.value, 'shadow');
    });
  }

  watch(
    _knownClasses,
    () => {
      if (!isDefined(_instance)) {
        return;
      }
      updateStyles(_instance.value, 'icon');
      updateStyles(_instance.value, 'shadow');
    },
    { deep: true }
  );

  return _instance;
}
