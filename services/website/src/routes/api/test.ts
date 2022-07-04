import type { RequestHandler } from "@sveltejs/kit";
import { platform, arch } from "os";

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: `platform: ${platform()}, arch: ${arch()}`,
  };
};
