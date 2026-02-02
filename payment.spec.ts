import { test, expect } from '@playwright/test';

test.describe('Payment Flow', () => {
  test('should redirect to Stripe checkout when a pricing plan is selected', async ({ page }) => {
    await page.goto('/pricing');

    // Find the "Pro" plan (which is featured) and click its "Get started" button.
    const proPlan = page.locator('.border-titan-accent');
    
    // The redirectToCheckout will navigate the current page.
    await proPlan.getByRole('button', { name: 'Get started' }).click();

    // Wait for the navigation to Stripe's domain.
    await page.waitForURL(/https:\/\/checkout\.stripe\.com/);
    
    // Assert that the URL is now a Stripe checkout URL.
    await expect(page).toHaveURL(/https:\/\/checkout\.stripe\.com/);

    // Verify a key element on the Stripe page to confirm we've landed correctly.
    await expect(page.getByText('Pay with card')).toBeVisible({ timeout: 10000 });
  });
});