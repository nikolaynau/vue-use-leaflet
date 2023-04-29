import { watch, type Ref, type WatchSource } from 'vue-demi';
import { toRef, type MaybeRefOrGetter, isDefined } from '@vueuse/shared';
import { DivIcon, type DivIconOptions, type PointExpression } from 'leaflet';
import { useLeafletCreate } from '../useLeafletCreate';

export interface UseLeafletDivIconOptions
  extends Omit<
    DivIconOptions,
    'html' | 'bgPos' | 'iconSize' | 'iconAnchor' | 'className'
  > {
  bgPos?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconSize?: MaybeRefOrGetter<PointExpression | null | undefined>;
  iconAnchor?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  watch?: WatchSource<any>;
  factory?: (...args: unknown[]) => DivIcon;
}

export type UseLeafletDivIconReturn = Ref<DivIcon | null>;

export function useLeafletDivIcon(
  html?: MaybeRefOrGetter<string | HTMLElement | false | null | undefined>,
  options: UseLeafletDivIconOptions = {}
): UseLeafletDivIconReturn {
  const {
    bgPos,
    iconAnchor,
    iconSize,
    className,
    watch: _watch,
    factory,
    ...iconOptions
  } = options;

  const _html = toRef(html);
  const _bgPos = toRef(bgPos);
  const _iconAnchor = toRef(iconAnchor);
  const _iconSize = toRef(iconSize);
  const _className = toRef(className);

  const _instance = useLeafletCreate(create, {
    watch: _watch
  });

  function create(): DivIcon {
    const icon =
      typeof factory === 'function'
        ? factory(makeOptions())
        : new DivIcon(makeOptions());
    return wrap(icon);
  }

  function makeOptions(): DivIconOptions {
    const opt = { ...iconOptions } as DivIconOptions;

    if (isDefined(_html)) {
      opt.html = _html.value;
    }
    if (isDefined(_bgPos)) {
      opt.bgPos = _bgPos.value;
    }
    if (isDefined(_iconAnchor)) {
      opt.iconAnchor = _iconAnchor.value;
    }
    if (isDefined(_iconSize)) {
      opt.iconSize = _iconSize.value;
    }
    if (isDefined(_className)) {
      opt.className = _className.value;
    }

    return opt;
  }

  function wrap(instance: DivIcon): DivIcon {
    const superCreateIcon = instance.createIcon;
    instance.createIcon = function (oldIcon?: HTMLElement): HTMLElement {
      (this as any)._iconElement = superCreateIcon.call(this, oldIcon);
      return (this as any)._iconElement;
    };
    return instance;
  }

  function update(instance: DivIcon) {
    const el = (instance as any)._iconElement;
    if (el) {
      instance.createIcon(el);
    }
  }

  if (isDefined(html)) {
    watch(_html, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.html = val as string;
      update(_instance.value);
    });
  }

  if (isDefined(bgPos)) {
    watch(_bgPos, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.bgPos = val as PointExpression;
      update(_instance.value);
    });
  }

  if (isDefined(iconSize)) {
    watch(_iconSize, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconSize = val as PointExpression;
      update(_instance.value);
    });
  }

  if (isDefined(iconAnchor)) {
    watch(_iconAnchor, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.iconAnchor = val as PointExpression;
      update(_instance.value);
    });
  }

  if (isDefined(className)) {
    watch(_className, val => {
      if (!isDefined(_instance)) {
        return;
      }
      _instance.value.options.className = val as string;
      update(_instance.value);
    });
  }

  return _instance;
}
