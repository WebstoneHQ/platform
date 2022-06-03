/// <reference types="@sveltejs/kit" />

interface Lesson {
  id: string;
  name: string;
}

interface Stack {
  web: string;
  styles: string;
  apitype: string;
  api: string;
  database: string;
}

interface Course {
  description: string;
  id: string;
  lessons: Lesson[];
  name: string;
  stack: Stack;
}

type PaddleCheckoutOpen = {
  allowQuantity: boolean;
  country?: string;
  disableLogout: boolean;
  email?: string;
  frameInitialHeight: number;
  frameStyle: string;
  frameTarget: string;
  passthrough: string;
  postcode?: string;
  product: number;
};

type PaddleSetup = {
  eventCallback: (event: Record<string, unknown>) => void;
  vendor: number;
};

declare interface Window {
  Paddle: {
    Checkout: {
      open: (fn: PaddleCheckoutOpen) => void;
    };
    Environment: {
      set: (value: string) => void;
    };
    Setup: (fn: PaddleSetup) => void;
  };
}

interface User {
  id: string;
  name: string;
  provider: string;
  providerEmail: string;
  providerId: string;
  providerLogin: string;
}

interface PurchaseInfo {
  country?: string;
  email?: string;
  postcode?: string;
  tax: string;
  total: string;
}

interface PurchaseInfoGumroad {
  email?: string;
  githubusername?: string;
  licensekey?: string;
  discordusername?: string;
  preorderid?: string;
}
