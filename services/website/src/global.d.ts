/// <reference types="@sveltejs/kit" />

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
