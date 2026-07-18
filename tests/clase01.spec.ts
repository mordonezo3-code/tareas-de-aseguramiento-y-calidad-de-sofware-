import { test, expect } from '@playwright/test';

test('La página carga correctamente', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/STORE/);
  await expect(page.locator('#navbarExample')).toBeVisible();
});

test('El menú de categorías es visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#cat')).toBeVisible();
});

test('La barra de navegación contiene los enlaces principales', async ({
  page,
}) => {
  await page.goto('/');

  const nav = page.locator('#navbarExample');

  await expect(
    nav.getByRole('link', { name: /^Home/ }),
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'Contact', exact: true }),
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'About us', exact: true }),
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'Cart', exact: true }),
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'Log in', exact: true }),
  ).toBeVisible();

  await expect(
    nav.getByRole('link', { name: 'Sign up', exact: true }),
  ).toBeVisible();
});