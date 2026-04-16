import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly addBackpackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.addBackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
  }

  async assertPageLoaded() {
    await expect(this.title).toHaveText("Products");
  }

  async assertInventoryItemsVisible() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async assertInventoryNotEmpty() {
    const count = await this.inventoryItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async assertCartBadgeCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
