/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    user: User;
  }

  interface Session {
    user: User;
  }
}
