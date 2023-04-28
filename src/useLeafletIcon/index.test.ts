import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { Icon, type PointExpression } from 'leaflet';
import { useLeafletIcon } from '.';

describe('useLeafletIcon', () => {
  let imgUrl: string;
  let imgRetinaUrl: string;
  let shadowUrl: string;
  let shadowRetinaUrl: string;
  let newImgUrl: string;

  beforeEach(() => {
    imgUrl = 'http://localhost/marker.png';
    imgRetinaUrl = 'http://localhost/marker-retina.png';
    shadowUrl = 'http://localhost/shadow.png';
    shadowRetinaUrl = 'http://localhost/shadow-retina.png';
    newImgUrl = 'http://localhost/new-marker.png';
  });

  it('should be create icon', () => {
    const icon = useLeafletIcon(imgUrl);
    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconUrl).toBe(imgUrl);
  });

  it('should be lazy init while icon url is null', async () => {
    const iconUrl = ref<string | null>(null);
    const icon = useLeafletIcon(iconUrl);
    expect(icon.value).toBeNull();

    iconUrl.value = imgUrl;
    await nextTick();

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconUrl).toBe(imgUrl);
  });

  it('should work with factory', () => {
    const instance = new Icon({ iconUrl: imgUrl });
    const factory = vi.fn().mockImplementation(() => instance);
    const icon = useLeafletIcon(imgUrl, { factory });

    expect(icon.value).toBe(instance);

    expect(factory).toBeCalledTimes(1);
    expect(factory.mock.calls[0][0]).toEqual({ iconUrl: imgUrl });
    expect(icon.value?.options.iconUrl).toBe(imgUrl);
  });

  it('should work when change icon url', async () => {
    const iconUrl = ref<string | null>(imgUrl);
    const icon = useLeafletIcon(iconUrl);

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconUrl).toBe(imgUrl);

    const img = icon.value!.createIcon() as HTMLImageElement;
    expect(img.src).toBe(imgUrl);

    iconUrl.value = newImgUrl;
    await nextTick();

    expect(icon.value?.options.iconUrl).toBe(newImgUrl);
    expect(img.src).toBe(newImgUrl);

    iconUrl.value = null;
    await nextTick();

    expect(icon.value?.options.iconUrl).toBe('');
  });

  it('should work when change icon url', async () => {
    const iconUrl = ref<string | null>(imgUrl);
    const icon = useLeafletIcon(iconUrl);

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconUrl).toBe(imgUrl);

    const img = icon.value!.createIcon() as HTMLImageElement;
    expect(img.src).toBe(imgUrl);

    iconUrl.value = newImgUrl;
    await nextTick();

    expect(icon.value?.options.iconUrl).toBe(newImgUrl);
    expect(img.src).toBe(newImgUrl);

    iconUrl.value = null;
    await nextTick();

    expect(icon.value?.options.iconUrl).toBe('');
  });

  it('should work with icon retina url', async () => {
    const iconRetinaUrl = ref<string | null>(imgRetinaUrl);
    const icon = useLeafletIcon(imgUrl, { iconRetinaUrl });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconRetinaUrl).toBe(imgRetinaUrl);

    iconRetinaUrl.value = newImgUrl;
    await nextTick();

    expect(icon.value?.options.iconRetinaUrl).toBe(newImgUrl);

    iconRetinaUrl.value = null;
    await nextTick();

    expect(icon.value?.options.iconRetinaUrl).toBe('');
  });

  it('should work with icon size', async () => {
    const newIconSize: PointExpression = [3, 4];
    const iconSize = ref<PointExpression | null>([1, 2]);
    const icon = useLeafletIcon(imgUrl, { iconSize });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconSize).toEqual([1, 2]);

    const img = icon.value!.createIcon() as HTMLImageElement;
    expect(img.style.width).toBe('1px');
    expect(img.style.height).toBe('2px');

    iconSize.value = newIconSize;
    await nextTick();

    expect(icon.value?.options.iconSize).toEqual(newIconSize);
    expect(img.style.width).toBe('3px');
    expect(img.style.height).toBe('4px');

    iconSize.value = null;
    await nextTick();

    expect(icon.value?.options.iconSize).toBeNull();
    expect(img.style.width).toBe('3px');
    expect(img.style.height).toBe('4px');
  });

  it('should work with icon anchor', async () => {
    const newIconAnchor: PointExpression = [3, 4];
    const iconAnchor = ref<PointExpression | null>([1, 2]);
    const icon = useLeafletIcon(imgUrl, { iconAnchor });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.iconAnchor).toEqual([1, 2]);

    const img = icon.value!.createIcon() as HTMLImageElement;
    expect(img.style.marginLeft).toBe('-1px');
    expect(img.style.marginTop).toBe('-2px');

    iconAnchor.value = newIconAnchor;
    await nextTick();

    expect(icon.value?.options.iconAnchor).toEqual(newIconAnchor);
    expect(img.style.marginLeft).toBe('-3px');
    expect(img.style.marginTop).toBe('-4px');

    iconAnchor.value = null;
    await nextTick();

    expect(icon.value?.options.iconAnchor).toBeNull();
    expect(img.style.marginLeft).toBe('-3px');
    expect(img.style.marginTop).toBe('-4px');
  });

  it('should work with shadow url', async () => {
    const _shadowUrl = ref<string | null>(shadowUrl);
    const icon = useLeafletIcon(imgUrl, { shadowUrl: _shadowUrl });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.shadowUrl).toBe(shadowUrl);

    const img = icon.value!.createShadow() as HTMLImageElement;
    expect(img.src).toBe(shadowUrl);

    _shadowUrl.value = newImgUrl;
    await nextTick();

    expect(icon.value?.options.shadowUrl).toBe(newImgUrl);
    expect(img.src).toBe(newImgUrl);

    _shadowUrl.value = null;
    await nextTick();

    expect(icon.value?.options.shadowUrl).toBe('');
  });

  it('should work with shadow retina url', async () => {
    const _shadowRetinaUrl = ref<string | null>(shadowRetinaUrl);
    const icon = useLeafletIcon(imgUrl, { shadowRetinaUrl: _shadowRetinaUrl });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.shadowRetinaUrl).toBe(shadowRetinaUrl);

    _shadowRetinaUrl.value = newImgUrl;
    await nextTick();

    expect(icon.value?.options.shadowRetinaUrl).toBe(newImgUrl);

    _shadowRetinaUrl.value = null;
    await nextTick();

    expect(icon.value?.options.shadowRetinaUrl).toBe('');
  });

  it('should work with shadow size', async () => {
    const newShadowSize: PointExpression = [3, 4];
    const shadowSize = ref<PointExpression | null>([1, 2]);
    const icon = useLeafletIcon(imgUrl, { shadowUrl, shadowSize });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.shadowSize).toEqual([1, 2]);

    const img = icon.value!.createShadow() as HTMLImageElement;
    expect(img.style.width).toBe('1px');
    expect(img.style.height).toBe('2px');

    shadowSize.value = newShadowSize;
    await nextTick();

    expect(icon.value?.options.shadowSize).toEqual(newShadowSize);
    expect(img.style.width).toBe('3px');
    expect(img.style.height).toBe('4px');

    shadowSize.value = null;
    await nextTick();

    expect(icon.value?.options.shadowSize).toBeNull();
    expect(img.style.width).toBe('3px');
    expect(img.style.height).toBe('4px');
  });

  it('should work with shadow anchor', async () => {
    const newShadowAnchor: PointExpression = [3, 4];
    const shadowAnchor = ref<PointExpression | null>([1, 2]);
    const icon = useLeafletIcon(imgUrl, { shadowUrl, shadowAnchor });

    expect(icon.value).toBeInstanceOf(Icon);
    expect(icon.value?.options.shadowAnchor).toEqual([1, 2]);

    const img = icon.value!.createShadow() as HTMLImageElement;
    expect(img.style.marginLeft).toBe('-1px');
    expect(img.style.marginTop).toBe('-2px');

    shadowAnchor.value = newShadowAnchor;
    await nextTick();

    expect(icon.value?.options.shadowAnchor).toEqual(newShadowAnchor);
    expect(img.style.marginLeft).toBe('-3px');
    expect(img.style.marginTop).toBe('-4px');

    shadowAnchor.value = null;
    await nextTick();

    expect(icon.value?.options.shadowAnchor).toBeNull();
    expect(img.style.marginLeft).toBe('-3px');
    expect(img.style.marginTop).toBe('-4px');
  });
});
