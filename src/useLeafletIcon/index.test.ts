import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick, ref } from 'vue-demi';
import { Icon } from 'leaflet';
import { useLeafletIcon } from '.';

describe('useLeafletIcon', () => {
  let imgUrl;

  beforeEach(() => {
    imgUrl = 'http://localhost/1/2/3.png';
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
    const newImgUrl = 'http://localhost/3/2/1.png';
    const iconUrl = ref(imgUrl);
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
});
