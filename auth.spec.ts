import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow a user to register', async ({ page }) => {
    const email = `test-user-${Date.now()}@example.com`;
    
    await page.goto('/register');
    
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    
    await page.getByPlaceholder('Email address').fill(email);
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Register' }).click();
    
    await expect(page.getByText('Registration successful! Please check your email to confirm your account.')).toBeVisible();
  });

  test('should allow a user to log in and be redirected to the dashboard', async ({ page }) => {
    // This test requires a pre-existing user in your Supabase test environment.
    // Replace with your actual test user credentials in a .env file.
    const testUserEmail = process.env.TEST_USER_EMAIL;
    const testUserPassword = process.env.TEST_USER_PASSWORD;

    test.skip(!testUserEmail || !testUserPassword, 'Test user credentials are not set in environment variables.');

    await page.goto('/login');

    await expect(page.getByRole('heading', { name: 'Client Login' })).toBeVisible();

    await page.getByPlaceholder('Email address').fill(testUserEmail!);
    await page.getByPlaceholder('Password').fill(testUserPassword!);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Client Dashboard' })).toBeVisible();
  });
});