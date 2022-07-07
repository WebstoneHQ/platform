import { dev } from "$app/env";

export const throwInProdIfNotSet = (devValue: string) => {
  if (dev) {
    return devValue;
  }
  throw new Error(`Environment variable not set. Dev value: ${devValue}`);
};
