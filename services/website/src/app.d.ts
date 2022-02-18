/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    user: Partial<User>;
  }

  interface Session {
    user: Partial<User>;
  }
}
