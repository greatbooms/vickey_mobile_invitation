type KakaoSDK = {
  init(key: string): void;
  isInitialized(): boolean;
  Share: { sendDefault(options: unknown): void };
};
type AMapSDK = {
  Map: new (
    element: HTMLElement,
    options: unknown,
  ) => { add(marker: unknown): void; destroy(): void };
  Marker: new (options: unknown) => unknown;
};
declare global {
  interface Window {
    Kakao?: KakaoSDK;
    AMap?: AMapSDK;
    _AMapSecurityConfig?: { securityJsCode?: string; serviceHost?: string };
  }
}
const pending = new Map<string, Promise<void>>();
function loadScript(src: string): Promise<void> {
  if (pending.has(src)) return pending.get(src)!;
  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    const timer = window.setTimeout(() => {
      script.remove();
      pending.delete(src);
      reject(new Error("SDK timeout"));
    }, 12000);
    script.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      pending.delete(src);
      reject(new Error("SDK unavailable"));
    };
    document.head.appendChild(script);
  });
  pending.set(src, promise);
  return promise;
}
export async function shareKakao(
  title: string,
  description: string,
  url: string,
  imagePath: string,
) {
  const key = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!key) throw new Error("Kakao not configured");
  await loadScript("https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js");
  const sdk = window.Kakao;
  if (!sdk) throw new Error("Kakao unavailable");
  if (!sdk.isInitialized()) sdk.init(key);
  sdk.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl: new URL(imagePath, location.origin).href,
      link: { mobileWebUrl: url, webUrl: url },
    },
    buttons: [{ title, link: { mobileWebUrl: url, webUrl: url } }],
  });
}
export async function loadMap(
  container: HTMLElement,
  coordinates: [number, number],
  name: string,
) {
  const key = import.meta.env.VITE_AMAP_KEY;
  const serviceHost = import.meta.env.VITE_AMAP_SERVICE_HOST;
  const securityJsCode = import.meta.env.VITE_AMAP_SECURITY_CODE;
  if (!key || (!serviceHost && !securityJsCode))
    throw new Error("AMap not configured");
  // For production prefer a same-origin server proxy serviceHost; never place server secrets in VITE_*.
  window._AMapSecurityConfig = serviceHost
    ? { serviceHost }
    : { securityJsCode };
  await loadScript(
    `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`,
  );
  const sdk = window.AMap;
  if (!sdk) throw new Error("AMap unavailable");
  const map = new sdk.Map(container, {
    zoom: 15,
    center: coordinates,
    resizeEnable: true,
  });
  map.add(new sdk.Marker({ position: coordinates, title: name }));
  return map;
}
