import type {
  Control,
  Layer,
  Map,
  MarkerOptions,
  PathOptions,
  LocateOptions as LeafletLocateOptions
} from 'leaflet';

export interface LocateControlExtensionConstructor {
  new (locateOptions?: LocateControlExtensionOptions): LocateControlExtension;
}

export declare class LocateControlExtension extends Control {
  constructor(locateOptions?: LocateControlExtensionOptions);
  onAdd(map: Map): HTMLElement;
  start(): void;
  stop(): void;
  stopFollowing(): void;
  setView(): void;
}

export interface LocateControlExtensionOptions {
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
    | ((
        container: HTMLDivElement,
        options: LocateControlExtensionOptions
      ) => void)
    | undefined;
  onLocationError?:
    | ((event: ErrorEvent, control: LocateControlExtension) => void)
    | undefined;
  onLocationOutsideMapBounds?:
    | ((control: LocateControlExtension) => void)
    | undefined;
  showPopup?: boolean | undefined;
  strings?: LocateControlExtensionStringsOptions | undefined;
  locateOptions?: LeafletLocateOptions | undefined;
}

export interface LocateControlExtensionStringsOptions {
  title?: string | undefined;
  metersUnit?: string | undefined;
  feetUnit?: string | undefined;
  popup?: string | undefined;
  outsideMapBoundsMsg?: string | undefined;
}
