import { test, expect } from '@playwright/test';

test.describe('Practice Software Testing', () => {
  test('Abrir homepage', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await expect(page).toHaveTitle(/Practice Software Testing/);
  });

  test('Buscar produto', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.getByPlaceholder('Search').fill('Hammer');

    await page.keyboard.press('Enter');

    await expect(page.locator('body')).toContainText('Hammer');
  });

  test('Abrir categoria Hand Tools', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/category/hand-tools');

    await expect(page).toHaveURL(/hand-tools/);

    await expect(page.locator('body')).toContainText('Hammer');
  });

  test('Login inválido', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.getByPlaceholder('Your email').fill('teste@teste.com');

    await page.getByPlaceholder('Your password').fill('123456');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('body')).toContainText(
      'Invalid email or password'
    );
  });

  test('Verificar produtos na homepage', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await expect(page.locator('.card')).toHaveCount(9);
  });

  test('Abrir detalhes de produto', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.getByText('Bolt Cutters').click();

    await expect(page.locator('body')).toContainText('Add to cart');
  });

  test('Adicionar produto ao carrinho', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.locator('[data-test="product-name"]').first().click();

    await page.getByRole('button', { name: /add to cart/i }).click();

    await expect(page.locator('[data-test="cart-quantity"]')).toContainText(
      '1'
    );
  });

  test('Abrir página de contato', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact');

    await expect(page.locator('body')).toContainText('Contact');
  });

  test('Ordenar produtos por preço', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.selectOption('select', 'price,desc');

    const prices = await page
      .locator('[data-test="product-price"]')
      .allTextContents();

    const numericPrices = prices.map(price => Number(price.replace('$', '')));

    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);
  });

  test('Pesquisar produto', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    await page.getByPlaceholder('Search').fill('Pliers');

    await page.keyboard.press('Enter');

    await expect(page.locator('body')).toContainText('Pliers');
  });
});
