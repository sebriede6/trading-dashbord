import { test, expect } from '@playwright/test';

test.describe('Landing Page Smoke Journey', () => {
  test('navigates from Home to Login', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Tradingtagebuch Pro/i })).toBeVisible();

    await expect(page.getByRole('link', { name: /Jetzt starten/i })).toBeVisible();

    await page.getByRole('link', { name: /Login/i }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: /Login/i })).toBeVisible();
  });
});
