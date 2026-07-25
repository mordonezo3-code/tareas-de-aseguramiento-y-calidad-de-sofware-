import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Crear la carpeta de evidencias si no existe
test.beforeAll(async () => {
    if (!fs.existsSync('./evidencias')) {
        fs.mkdirSync('./evidencias', { recursive: true });
    }
});

test.describe('Pruebas de la Clase 02 - Navegación y Esperas en Demoblaze', () => {

    test('Navegar al carrito y regresar al inicio', async ({ page }) => {

        await page.goto('https://www.demoblaze.com/');

        await expect(page).toHaveURL(/demoblaze/);

        await page.screenshot({
            path: './evidencias/01-pagina-inicio.png',
            fullPage: true
        });

        // Playwright espera automáticamente a que el enlace esté disponible
        await page.getByText('Cart', { exact: true }).click();

        await page.waitForURL('**/cart.html');

        await expect(page).toHaveURL(/cart\.html/);

        await page.screenshot({
            path: './evidencias/02-carrito-vacio.png',
            fullPage: true
        });

        await page.goBack();

        await expect(page).toHaveURL(/demoblaze\.com\/?$/);
    });

    test('Navegar a la categoría Phones y ver un producto', async ({ page }) => {

        await page.goto('https://www.demoblaze.com/');

        await page.getByText('Phones', { exact: true }).click();

        const productos = page.locator('.card-title a');

        await expect(productos.first()).toBeVisible();

        const cantidadProductos = await productos.count();

        expect(cantidadProductos).toBeGreaterThan(0);

        // Esperar la navegación al detalle del producto
        await Promise.all([
            page.waitForURL(/prod\.html/),
            productos.first().click()
        ]);

        await expect(page.getByText('Add to cart', { exact: true }))
            .toBeVisible();

        await page.screenshot({
            path: './evidencias/03-detalle-producto.png',
            fullPage: true
        });
    });

    test('Capturar el navbar y el footer por separado', async ({ page }) => {

        await page.goto('https://www.demoblaze.com/');

        // Captura del navbar
        const navbar = page.locator('#navbarExample');

        await expect(navbar).toBeVisible();

        await navbar.screenshot({
            path: './evidencias/04-navbar.png'
        });

        // El footer de Demoblaze tiene el identificador fotcont
        const footer = page.locator('#fotcont');

        await footer.scrollIntoViewIfNeeded();

        await expect(footer).toBeVisible();

        await footer.screenshot({
            path: './evidencias/05-footer.png'
        });
    });

    test('Verificar tiempo de carga de la página', async ({ page }) => {

        const startTime = Date.now();

        await page.goto('https://www.demoblaze.com/');

        await page.waitForLoadState('load');

        const loadTime = Date.now() - startTime;

        console.log(`Tiempo de carga: ${loadTime} ms`);

        expect(loadTime).toBeLessThan(10000);
    });

});