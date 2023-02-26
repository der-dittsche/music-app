import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/users";
import { describe, expect } from "vitest";

describe("stores", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("auth user", async () => {
    const store = useUserStore();

    expect(store.loginUser).not.toBe(true);
    await store.authenticate({});
    expect(store.loginUser).toBe(true);
  });
});
