import { v4 as uuidv4 } from "uuid";

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";
export type DevicePlatform =
  | "windows"
  | "macos"
  | "linux"
  | "ios"
  | "android"
  | "unknown";

export type BrowserType = "chrome" | "firefox" | "safari" | "edge" | "unknown";

export interface DeviceInfo {
  device_id: string;
  device_type: DeviceType;
  platform: DevicePlatform;
  browser: string;
  user_agent: string;
  screen_resolution: string;
  timezone: string;
  language: string;
  fingerprint: string;
  app_version?: string;
  os_version?: string;
}

export function getDeviceType(): DeviceType {
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|iphone|ipod|android/.test(ua)) return "mobile";
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (/windows|mac|linux/.test(ua)) return "desktop";
  return "unknown";
}

export function getDevicePlatform(): DevicePlatform {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (ua.includes("android")) return "android";
  return "unknown";
}

export function getBrowserName(): BrowserType {
  const ua = navigator.userAgent;

  if (ua.includes("Edg")) return "edge"; // Chromium Edge
  if (ua.includes("OPR") || ua.includes("Opera")) return "chrome"; // or add "opera" if you extend BrowserType
  if (ua.includes("Chrome") && !ua.includes("Edg") && !ua.includes("OPR"))
    return "chrome";
  if (ua.includes("Firefox")) return "firefox";
  if (
    ua.includes("Safari") &&
    !ua.includes("Chrome") &&
    !ua.includes("Edg") &&
    !ua.includes("OPR")
  )
    return "safari";

  return "unknown";
}

export async function getFingerprint(): Promise<string> {
  const data = [
    navigator.userAgent,
    screen.width,
    screen.height,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data)
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const getDeviceID = (): string => {
  let uuid = localStorage.getItem("device_id");
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("device_id", uuid);
  }
  return uuid;
};

/**
 * Generate full device info object
 */
export default async function getDeviceInfo(): Promise<DeviceInfo> {
  const fingerprint = await getFingerprint();

  return {
    device_id: getDeviceID(),
    device_type: getDeviceType(),
    platform: getDevicePlatform(),
    browser: getBrowserName(),
    user_agent: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    fingerprint,
    app_version: "1.0.0",
    os_version: navigator.userAgent.match(/\(([^)]+)\)/)?.[1],
  };
}

// ----- Function to generate headers -----
export async function getDeviceHeaders(): Promise<Record<string, string>> {
  const device = await getDeviceInfo();
  return {
    "X-Device-ID": device.device_id,
    "X-Device-Type": device.device_type,
    "X-Device-Platform": device.platform,
    "X-Browser": device.browser,
    "X-User-Agent": device.user_agent,
    "X-Screen-Resolution": device.screen_resolution,
    "X-Timezone": device.timezone,
    "X-Language": device.language,
    "X-Fingerprint": device.fingerprint,
    "X-App-Version": device.app_version ?? "",
    "X-OS-Version": device.os_version ?? "",
  };
}
