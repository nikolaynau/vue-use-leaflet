import type {
  Control,
  Layer,
  Map,
  MarkerOptions,
  PathOptions,
  LocateOptions as LeafletLocateOptions
} from 'leaflet';

export interface LocateConstructor {
  new (locateOptions?: LocateOptions): Locate;
}

export declare class Locate extends Control {
  constructor(locateOptions?: LocateOptions);
  onAdd(map: Map): HTMLElement;
  start(): void;
  stop(): void;
  stopFollowing(): void;
  setView(): void;
}

export interface LocateOptions {
  position?: string | undefined;
  layer?: Layer | undefined;
  setView?: boolean | string | undefined;
  keepCurrentZoomLevel?: boolean | undefined;
  initialZoomLevel?: number | boolean | undefined;
  flyTo?: boolean | undefined;
  clickBehavior?: any;
  returnToPrevBounds?: boolean | undefined;
  cacheLocation?: boolean | undefined;
  drawCircle?: boolean | undefined;
  drawMarker?: boolean | undefined;
  showCompass?: boolean | undefined;
  markerClass?: any;
  compassClass?: any;
  circleStyle?: PathOptions | undefined;
  markerStyle?: PathOptions | MarkerOptions | undefined;
  compassStyle?: PathOptions | undefined;
  followCircleStyle?: PathOptions | undefined;
  followMarkerStyle?: PathOptions | undefined;
  icon?: string | undefined;
  iconLoading?: string | undefined;
  iconElementTag?: string | undefined;
  textElementTag?: string | undefined;
  circlePadding?: number[] | undefined;
  metric?: boolean | undefined;
  createButtonCallback?:
    | ((container: HTMLDivElement, options: LocateOptions) => void)
    | undefined;
  onLocationError?: ((event: ErrorEvent, control: Locate) => void) | undefined;
  onLocationOutsideMapBounds?: ((control: Locate) => void) | undefined;
  showPopup?: boolean | undefined;
  strings?: StringsOptions | undefined;
  locateOptions?: LeafletLocateOptions | undefined;
}

export interface StringsOptions {
  title?: string | undefined;
  metersUnit?: string | undefined;
  feetUnit?: string | undefined;
  popup?: string | undefined;
  outsideMapBoundsMsg?: string | undefined;
}
