import { test, expect } from '@playwright/test';

test.describe('JualPutus Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the hero section is visible
    await expect(page.locator('text=Jual Putus')).toBeVisible();
    
    // Check if the main CTA button exists
    const ctaButton = page.locator('button:has-text("Jual Sekarang")').first();
    await expect(ctaButton).toBeVisible();
  });

  test('should navigate to form when clicking CTA', async ({ page }) => {
    await page.goto('/');
    
    // Click the "Jual Sekarang" button
    await page.locator('button:has-text("Jual Sekarang")').first().click();
    
    // Check if form modal appears
    await expect(page.locator('text=Form Penjualan')).toBeVisible();
    await expect(page.locator('text=Pilih Kategori Barang')).toBeVisible();
  });

  test('should close form when clicking close button', async ({ page }) => {
    await page.goto('/');
    
    // Open form
    await page.locator('button:has-text("Jual Sekarang")').first().click();
    await expect(page.locator('text=Form Penjualan')).toBeVisible();
    
    // Close form
    await page.locator('button[aria-label="Close"]').click();
    
    // Form should be hidden
    await expect(page.locator('text=Form Penjualan')).not.toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check for main sections
    await expect(page.locator('text=Cara Kerja').first()).toBeVisible();
    await expect(page.locator('text=Kategori Barang').first()).toBeVisible();
    await expect(page.locator('text=FAQ').first()).toBeVisible();
  });
});

test.describe('Sell Form Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open the form
    await page.locator('button:has-text("Jual Sekarang")').first().click();
    await expect(page.locator('text=Form Penjualan')).toBeVisible();
  });

  test('should validate Step 1 - Product Selection', async ({ page }) => {
    // Try to proceed without selecting anything
    await page.locator('button:has-text("Lanjut")').click();
    
    // Should show validation errors
    await expect(page.locator('text=Pilih kategori perangkat')).toBeVisible();
  });

  test('should complete Step 1 successfully', async ({ page }) => {
    // Select HP Flagship category
    await page.locator('label:has-text("HP Flagship")').click();
    
    // Wait for brands to load
    await page.waitForTimeout(500);
    
    // Select brand
    await page.locator('select').first().selectOption({ index: 1 });
    
    // Wait for models to load
    await page.waitForTimeout(500);
    
    // Select model
    const selects = await page.locator('select').all();
    if (selects.length > 1) {
      await selects[1].selectOption({ index: 1 });
    }
    
    // Select year
    await page.locator('select').last().selectOption('2023');
    
    // Click next
    await page.locator('button:has-text("Lanjut")').click();
    
    // Should move to Step 2
    await expect(page.locator('text=Kondisi & Foto')).toBeVisible();
  });

  test('should show floating CTA on scroll', async ({ page }) => {
    await page.locator('button[aria-label="Close"]').click();
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Floating CTA should be visible
    const floatingCta = page.locator('button:has-text("Jual Sekarang")').last();
    await expect(floatingCta).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if main elements are visible
    await expect(page.locator('text=Jual Putus')).toBeVisible();
    
    // Open form
    await page.locator('button:has-text("Jual Sekarang")').first().click();
    await expect(page.locator('text=Form Penjualan')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check if main elements are visible
    await expect(page.locator('text=Jual Putus')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Should have no console errors
    expect(errors.length).toBe(0);
  });
});

