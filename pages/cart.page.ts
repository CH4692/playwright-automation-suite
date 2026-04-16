import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly backpackItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.backpackItem = page.locator(".inventory_item_name", {
      hasText: "Sauce Labs Backpack",
    });
  }

  async assertPageLoaded() {
    await expect(this.title).toHaveText("Your Cart");
  }

  async assertCartNotEmpty() {
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async assertBackpackVisible() {
    await expect(this.backpackItem).toBeVisible();
  }
}
