import type { MaybeRef, MaybeRefOrGetter } from '@vueuse/shared';
import type { PointExpression, Popup, PopupOptions } from 'leaflet';
import type { UpdateWatchSource } from '../useLeafletLayer';

export type PopupReactiveProperty =
  | 'offset'
  | 'maxWidth'
  | 'minWidth'
  | 'maxHeight'
  | 'className'
  | 'keepInView'
  | 'autoPan'
  | 'autoPanPaddingTopLeft'
  | 'autoPanPaddingBottomRight'
  | 'autoPanPadding';

export interface UseLeafletLayerPopupOptions
  extends Omit<PopupOptions, PopupReactiveProperty> {
  visible?: MaybeRef<boolean>;
  offset?: MaybeRefOrGetter<PointExpression | null | undefined>;
  maxWidth?: MaybeRefOrGetter<number | null | undefined>;
  minWidth?: MaybeRefOrGetter<number | null | undefined>;
  maxHeight?: MaybeRefOrGetter<number | null | undefined>;
  keepInView?: MaybeRefOrGetter<boolean | null | undefined>;
  autoPan?: MaybeRefOrGetter<boolean | null | undefined>;
  autoPanPaddingTopLeft?: MaybeRefOrGetter<PointExpression | null | undefined>;
  autoPanPaddingBottomRight?: MaybeRefOrGetter<
    PointExpression | null | undefined
  >;
  autoPanPadding?: MaybeRefOrGetter<PointExpression | null | undefined>;
  className?: MaybeRefOrGetter<string | null | undefined>;
  autoBind?: boolean;
  defOptions?: PopupOptions;
  updateSources?: UpdateWatchSource<Popup>[];
  dispose?: boolean;
}
