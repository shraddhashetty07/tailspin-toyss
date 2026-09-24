import { test, expect } from '@playwright/test';

test.describe('High contrast mode', () => {
  test('persists the preference across page reloads', async ({ page }) => {
    await page.goto('/');

    const contrastToggle = page.getByRole('button', { name: 'Enable high contrast mode' });
    await expect(contrastToggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).not.toHaveClass(/high-contrast/);

    await test.step('Enable high contrast mode', async () => {
      await contrastToggle.click();
      await expect(page.getByRole('button', { name: 'Disable high contrast mode' })).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('html')).toHaveClass(/high-contrast/);
      await expect(page).toHaveTitle('Tailspin Toys - Crowdfunding your new favorite game!');
    });

    await test.step('Verify the preference survives a reload', async () => {
      await page.reload();
      await expect(page.getByRole('button', { name: 'Disable high contrast mode' })).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('html')).toHaveClass(/high-contrast/);
      expect(await page.evaluate(() => window.localStorage.getItem('tailspin-high-contrast'))).toBe('true');
    });

    await test.step('Disable high contrast mode', async () => {
      await page.getByRole('button', { name: 'Disable high contrast mode' }).click();
      await expect(page.getByRole('button', { name: 'Enable high contrast mode' })).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('html')).not.toHaveClass(/high-contrast/);
      expect(await page.evaluate(() => window.localStorage.getItem('tailspin-high-contrast'))).toBe('false');
    });
  });
});
