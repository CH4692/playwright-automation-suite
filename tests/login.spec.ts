import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { users } from "./test-data";

test.describe("E2E Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
  });

  test("successful login", async () => {
    await loginPage.login(users.valid.username, users.valid.password);

    await expect(loginPage.page).toHaveURL(/inventory/);
    await inventoryPage.assertPageLoaded();
  });

  test("invalid login shows error", async () => {
    await loginPage.login("standard_user", "wrong_password");

    await loginPage.assertErrorMessageContains(
      "Username and password do not match",
    );
  });

  test("empty login shows validation", async () => {
    await loginPage.login("", "");

    await loginPage.assertErrorMessageContains("Username is required");
  });

  test("add product to cart", async () => {
    await loginPage.login("standard_user", "secret_sauce");

    await inventoryPage.addBackpackToCart();
    await inventoryPage.assertCartBadgeCount("1");
    await inventoryPage.goToCart();

    await cartPage.assertPageLoaded();
    await cartPage.assertBackpackVisible();
  });
});
