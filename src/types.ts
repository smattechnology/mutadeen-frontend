export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";
export type DevicePlatform =
  | "windows"
  | "macos"
  | "linux"
  | "ios"
  | "android"
  | "unknown";

export interface DeviceCreate {
  device_type: DeviceType;
  platform: DevicePlatform;
  browser?: string;
  user_agent?: string;
  screen_resolution?: string;
  timezone?: string;
  language?: string;
  fingerprint?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  device_info: DeviceCreate;
}

export type AuthSection = "login" | "register" | "forgot-password";
