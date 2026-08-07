import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Crear la carpeta de evidencias si no existe
test.beforeAll(async () => {
  if (!fs.existsSync('evidencias')) {
    fs.mkdirSync('evidencias', { recursive: true });
  }
});

test.describe('Laboratorio 03 - Locator por texto', () => {

  test('Locator por texto: verificar elementos del menú', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/', {
      waitUntil: 'domcontentloaded'
    });

    // Localizar el navbar
    const nav = page.locator('#navbarExample');

    // Verificar elementos usando getByText
    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
    await expect(nav.getByText('About us')).toBeVisible();

    // Verificar texto exacto
    await expect(
      nav.getByText('Cart', { exact: true })
    ).toBeVisible();

    // Evidencia
    await page.screenshot({
      path: 'evidencias/laboratorio03-navbar.png',
      fullPage: true
    });

  });

});