import { test, expect } from '@playwright/test';

async function acessarSite(page) {
  await page.goto('https://practicesoftwaretesting.com', {
    waitUntil: 'networkidle'
  });

  await page.waitForTimeout(5000);

  const bodyText = await page.locator('body').textContent();

  if (
    bodyText?.includes('Executando verificação de segurança') ||
    bodyText?.includes('Um momento')
  ) {
    test.skip();
  }
}

test.describe('Practice Software Testing', () => {
  test('Abrir homepage', async ({ page }) => {
    await acessarSite(page);

    await expect(page.locator('body')).toContainText('Categories');
  });

  test('Buscar produto', async ({ page }) => {
    await acessarSite(page);

    const searchInput = page.getByPlaceholder('Search');

    await expect(searchInput).toBeVisible();

    await searchInput.fill('Hammer');

    await page.keyboard.press('Enter');

    await expect(page.locator('body')).toContainText('Hammer');
  });

  test('Abrir categoria Hand Tools', async ({ page }) => {
    await page.goto(
      'https://practicesoftwaretesting.com/category/hand-tools',
      {
        waitUntil: 'networkidle'
      }
    );

    await page.waitForTimeout(5000);

    const bodyText = await page.locator('body').textContent();

    if (
      bodyText?.includes('Executando verificação de segurança') ||
      bodyText?.includes('Um momento')
    ) {
      test.skip();
    }

    await expect(page).toHaveURL(/hand-tools/);

    await expect(page.locator('body')).toContainText('Hammer');
  });

  test('Login inválido', async ({ page }) => {
    await page.goto(
      'https://practicesoftwaretesting.com/auth/login',
      {
        waitUntil: 'networkidle'
      }
    );

    await page.waitForTimeout(5000);

    const bodyText = await page.locator('body').textContent();

    if (
      bodyText?.includes('Executando verificação de segurança') ||
      bodyText?.includes('Um momento')
    ) {
      test.skip();
    }

    const emailInput = page.getByPlaceholder('Your email');

    const passwordInput = page.getByPlaceholder('Your password');

    await expect(emailInput).toBeVisible();

    await expect(passwordInput).toBeVisible();

    await emailInput.fill('teste@teste.com');

    await passwordInput.fill('123456');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('body')).toContainText(
      'Invalid email or password'
    );
  });

  test('Verificar produtos na homepage', async ({ page }) => {
    await acessarSite(page);

    await expect(page.locator('.card')).toHaveCount(9);
  });

  test('Abrir detalhes de produto', async ({ page }) => {
    await acessarSite(page);

    const boltCutters = page.getByText('Bolt Cutters');

    await expect(boltCutters).toBeVisible();

    await boltCutters.click();

    await expect(
      page.getByRole('button', { name: /add to cart/i })
    ).toBeVisible();
  });

  test('Adicionar produto ao carrinho', async ({ page }) => {
    await acessarSite(page);

    const product = page.locator('[data-test="product-name"]').first();

    await expect(product).toBeVisible();

    await product.click();

    const addToCartButton = page.getByRole('button', {
      name: /add to cart/i
    });

    await expect(addToCartButton).toBeVisible();

    await addToCartButton.click();

    await expect(page.locator('[data-test="cart-quantity"]')).toContainText(
      '1'
    );
  });

  test('Abrir página de contato', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/contact', {
      waitUntil: 'networkidle'
    });

    await page.waitForTimeout(5000);

    const bodyText = await page.locator('body').textContent();

    if (
      bodyText?.includes('Executando verificação de segurança') ||
      bodyText?.includes('Um momento')
    ) {
      test.skip();
    }

    await expect(page.locator('body')).toContainText('Contact');
  });

  test('Ordenar produtos por preço', async ({ page }) => {
    await acessarSite(page);

    const sortSelect = page.locator('select');

    await expect(sortSelect).toBeVisible();

    await sortSelect.selectOption('price,desc');

    await page.waitForTimeout(3000);

    const prices = await page
      .locator('[data-test="product-price"]')
      .allTextContents();

    const numericPrices = prices.map(price =>
      Number(price.replace('$', '').trim())
    );

    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);
  });

  
