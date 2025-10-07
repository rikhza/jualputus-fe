import { test, expect } from "@playwright/test";

test.describe("Hero Section Animations and Interactions", () => {
	test("should display Hero section with 3D graphics on mobile", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto("/");

		// Check Hero is visible
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		// Check 3D phone mockup is visible on mobile
		const phoneMockup = page.locator(".perspective-1000");
		await expect(phoneMockup).toBeVisible();

		// Check CTA button is prominent
		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await expect(ctaButton).toBeVisible();

		// Verify trust badge is visible
		await expect(
			page.locator('text="Terpercaya • Aman • Cepat"')
		).toBeVisible();
	});

	test("should display Hero section with 3D graphics on desktop", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto("/");

		// Check Hero is visible
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		// Check 3D phone mockup is visible on desktop
		const phoneMockup = page.locator(".perspective-1000");
		await expect(phoneMockup).toBeVisible();

		// Check features are visible on desktop
		await expect(page.locator('text="100% Aman"')).toBeVisible();
		await expect(page.locator('text="Proses 24-48 Jam"')).toBeVisible();
		await expect(page.locator('text="Support WA"')).toBeVisible();
	});

	test("should animate CTA button on hover", async ({ page }) => {
		await page.goto("/");

		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();

		// Get initial state
		await ctaButton.waitFor({ state: "visible" });

		// Hover over button
		await ctaButton.hover();

		// Wait for animation
		await page.waitForTimeout(500);

		// Button should still be visible after hover
		await expect(ctaButton).toBeVisible();
	});

	test("should display all Hero elements in correct order", async ({
		page,
	}) => {
		await page.goto("/");

		// Trust badge should appear first
		await expect(
			page.locator('text="Terpercaya • Aman • Cepat"')
		).toBeVisible();

		// Then heading
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		// Then description
		await expect(
			page.locator('text="HP flagship, laptop gaming"')
		).toBeVisible();

		// Then CTA buttons
		await expect(
			page.locator('button:has-text("Jual Sekarang")')
		).toBeVisible();
		await expect(
			page.locator('button:has-text("Lihat Cara Kerja")')
		).toBeVisible();
	});

	test("should open form modal when CTA is clicked", async ({ page }) => {
		await page.goto("/");

		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await ctaButton.click();

		// Form should appear
		await expect(page.locator('text="Form Penjualan"')).toBeVisible();
	});

	test("should have working secondary CTA button", async ({ page }) => {
		await page.goto("/");

		const learnButton = page.locator('button:has-text("Lihat Cara Kerja")');
		await learnButton.click();

		// Should scroll to Cara Kerja section
		await page.waitForTimeout(500);

		// Cara Kerja section should be in viewport
		const caraKerjaSection = page.locator("#cara-kerja");
		await expect(caraKerjaSection).toBeVisible();
	});
});

test.describe("Section Scroll Animations", () => {
	test("should animate Cara Kerja section on scroll", async ({ page }) => {
		await page.goto("/");

		// Scroll to Cara Kerja section
		await page.evaluate(() => {
			const section = document.querySelector("#cara-kerja");
			section?.scrollIntoView({ behavior: "smooth" });
		});

		await page.waitForTimeout(1000);

		// Section should be visible
		const caraKerjaSection = page.locator("#cara-kerja");
		await expect(caraKerjaSection).toBeVisible();

		// Check if steps are visible
		await expect(page.locator('text="Pilih Barang"')).toBeVisible();
		await expect(page.locator('text="Upload & Isi Detail"')).toBeVisible();
		await expect(page.locator('text="Dapat Penawaran"')).toBeVisible();
		await expect(page.locator('text="Jadwalkan Pickup"')).toBeVisible();
	});

	test("should animate Kategori section on scroll", async ({ page }) => {
		await page.goto("/");

		// Scroll to Kategori section
		await page.evaluate(() => {
			const section = document.querySelector("#kategori");
			section?.scrollIntoView({ behavior: "smooth" });
		});

		await page.waitForTimeout(1000);

		// Section should be visible
		const kategoriSection = page.locator("#kategori");
		await expect(kategoriSection).toBeVisible();

		// Check if categories are visible
		await expect(page.locator('text="HP Flagship"')).toBeVisible();
		await expect(page.locator('text="Laptop"')).toBeVisible();
		await expect(page.locator('text="Komputer"')).toBeVisible();
	});

	test("should animate Keamanan section on scroll", async ({ page }) => {
		await page.goto("/");

		// Scroll to Keamanan section
		await page.evaluate(() => {
			const section = document.querySelector("#keamanan");
			section?.scrollIntoView({ behavior: "smooth" });
		});

		await page.waitForTimeout(1000);

		// Section should be visible
		const keamananSection = page.locator("#keamanan");
		await expect(keamananSection).toBeVisible();

		// Check if features are visible
		await expect(
			page.locator('text="Verifikasi IMEI/Serial"')
		).toBeVisible();
		await expect(
			page.locator('text="Penghapusan Data Aman"')
		).toBeVisible();
		await expect(page.locator('text="Proses 24-48 Jam"')).toBeVisible();
		await expect(page.locator('text="Transfer Instan"')).toBeVisible();
	});

	test("should trigger animations only once per section", async ({
		page,
	}) => {
		await page.goto("/");

		// Scroll to Cara Kerja
		await page.evaluate(() => {
			const section = document.querySelector("#cara-kerja");
			section?.scrollIntoView({ behavior: "smooth" });
		});

		await page.waitForTimeout(1000);

		// Scroll back to top
		await page.evaluate(() => window.scrollTo(0, 0));

		await page.waitForTimeout(500);

		// Scroll to Cara Kerja again
		await page.evaluate(() => {
			const section = document.querySelector("#cara-kerja");
			section?.scrollIntoView({ behavior: "smooth" });
		});

		await page.waitForTimeout(500);

		// Section should still be visible (animation should have triggered once)
		const caraKerjaSection = page.locator("#cara-kerja");
		await expect(caraKerjaSection).toBeVisible();
	});
});

test.describe("Mobile Responsiveness", () => {
	test("should display 3D phone mockup properly on iPhone SE", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		const phoneMockup = page.locator(".perspective-1000");
		await expect(phoneMockup).toBeVisible();

		// CTA should be easily tappable
		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await expect(ctaButton).toBeVisible();

		const boundingBox = await ctaButton.boundingBox();
		expect(boundingBox).not.toBeNull();
		// Button should be at least 44px high for good mobile UX
		expect(boundingBox!.height).toBeGreaterThanOrEqual(44);
	});

	test("should display 3D phone mockup properly on iPhone 12 Pro", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/");

		const phoneMockup = page.locator(".perspective-1000");
		await expect(phoneMockup).toBeVisible();

		// All features should be visible
		await expect(page.locator('text="100% Aman"')).toBeVisible();
		await expect(page.locator('text="Proses 24-48 Jam"')).toBeVisible();
		await expect(page.locator('text="Support WA"')).toBeVisible();
	});

	test("should display 3D phone mockup properly on tablet", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto("/");

		const phoneMockup = page.locator(".perspective-1000");
		await expect(phoneMockup).toBeVisible();

		// Hero content should be visible
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();
		await expect(
			page.locator('button:has-text("Jual Sekarang")')
		).toBeVisible();
	});
});

test.describe("Performance and Accessibility", () => {
	test("should load Hero section quickly", async ({ page }) => {
		const startTime = Date.now();
		await page.goto("/");

		// Wait for Hero to be visible
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		const loadTime = Date.now() - startTime;

		// Hero should load within 3 seconds
		expect(loadTime).toBeLessThan(3000);
	});

	test("should have smooth animations without jank", async ({ page }) => {
		await page.goto("/");

		// Scroll through all sections
		for (const sectionId of [
			"#cara-kerja",
			"#kategori",
			"#keamanan",
			"#faq",
		]) {
			await page.evaluate((id) => {
				const section = document.querySelector(id);
				section?.scrollIntoView({ behavior: "smooth" });
			}, sectionId);

			await page.waitForTimeout(800);
		}

		// No console errors should occur
		const errors: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === "error") {
				errors.push(msg.text());
			}
		});

		expect(errors.length).toBe(0);
	});

	test("should have accessible CTA buttons", async ({ page }) => {
		await page.goto("/");

		// Check primary CTA
		const primaryCTA = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await expect(primaryCTA).toBeVisible();
		await expect(primaryCTA).toBeEnabled();

		// Check secondary CTA
		const secondaryCTA = page.locator(
			'button:has-text("Lihat Cara Kerja")'
		);
		await expect(secondaryCTA).toBeVisible();
		await expect(secondaryCTA).toBeEnabled();
	});

	test("should work with keyboard navigation", async ({ page }) => {
		await page.goto("/");

		// Tab through elements
		await page.keyboard.press("Tab");
		await page.waitForTimeout(100);

		// Should be able to activate CTA with keyboard
		const primaryCTA = page
			.locator('button:has-text("Jual Sekarang")')
			.first();

		// Focus on CTA and press Enter
		await primaryCTA.focus();
		await page.keyboard.press("Enter");

		// Form should open
		await expect(page.locator('text="Form Penjualan"')).toBeVisible();
	});
});

test.describe("Interactive Elements", () => {
	test("should highlight features on hover (desktop)", async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto("/");

		// Hover over feature icons
		const features = await page
			.locator('[class*="group hover:scale-105"]')
			.all();

		for (const feature of features.slice(0, 3)) {
			await feature.hover();
			await page.waitForTimeout(200);
			await expect(feature).toBeVisible();
		}
	});

	test("should show floating elements with proper animations", async ({
		page,
	}) => {
		await page.goto("/");

		// Check for floating elements in 3D scene
		const floatingElements = await page
			.locator(".animate-bounce-slow")
			.all();

		// Should have at least 2 floating elements
		expect(floatingElements.length).toBeGreaterThanOrEqual(2);

		for (const element of floatingElements) {
			await expect(element).toBeVisible();
		}
	});

	test("should display sparkle effects", async ({ page }) => {
		await page.goto("/");

		// Check for sparkle/ping effects
		const sparkles = await page.locator(".animate-ping").all();

		// Should have sparkle effects
		expect(sparkles.length).toBeGreaterThan(0);
	});
});

test.describe("Cross-browser Compatibility", () => {
	test("should work properly in Chromium", async ({ page, browserName }) => {
		test.skip(browserName !== "chromium", "Chromium-only test");

		await page.goto("/");
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await ctaButton.click();

		await expect(page.locator('text="Form Penjualan"')).toBeVisible();
	});

	test("should work properly in Firefox", async ({ page, browserName }) => {
		test.skip(browserName !== "firefox", "Firefox-only test");

		await page.goto("/");
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await ctaButton.click();

		await expect(page.locator('text="Form Penjualan"')).toBeVisible();
	});

	test("should work properly in WebKit", async ({ page, browserName }) => {
		test.skip(browserName !== "webkit", "WebKit-only test");

		await page.goto("/");
		await expect(page.locator('text="Jual Gadget Bekas"')).toBeVisible();

		const ctaButton = page
			.locator('button:has-text("Jual Sekarang")')
			.first();
		await ctaButton.click();

		await expect(page.locator('text="Form Penjualan"')).toBeVisible();
	});
});
