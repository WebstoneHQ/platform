/// <reference types="@sveltejs/kit" />

type PaddleCheckoutOpen = {
  allowQuantity: boolean;
  disableLogout: boolean;
  passthrough: string;
  product: number;
};

type PaddleSetup = {
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
