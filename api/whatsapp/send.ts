/**
 * Vercel Serverless Function - WhatsApp API Integration
 * This function handles sending form submissions to admin WhatsApp via Fonnte API
 *
 * Environment Variables Required:
 * - VITE_FONNTE_TOKEN: Fonnte API token from fonnte.com
 * - VITE_ADMIN_WA: Admin WhatsApp number (format: 628123456789)
 *
 * Security: API credentials are kept server-side only, never exposed to client
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface Submission {
	id?: string;
	ticket_number?: string;
	category: string;
	brand: string;
	model: string;
	year_released: number;
	physical_condition: string;
	functional_features: string[];
	accessories: string[];
	photos: string[];
	full_name: string;
	whatsapp: string;
	email?: string;
	full_address: string;
	location_lat?: number;
	location_lng?: number;
	status?: string;
	created_at?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Only allow POST requests
	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			error: "Method not allowed. Use POST.",
		});
	}

	try {
		// Get environment variables (server-side only)
		const FONNTE_TOKEN = process.env.VITE_FONNTE_TOKEN;
		const ADMIN_WA = process.env.VITE_ADMIN_WA;

		// Validate configuration
		if (!FONNTE_TOKEN) {
			console.error("VITE_FONNTE_TOKEN not configured");
			return res.status(500).json({
				success: false,
				error: "WhatsApp service not configured",
			});
		}

		if (!ADMIN_WA) {
			console.error("VITE_ADMIN_WA not configured");
			return res.status(500).json({
				success: false,
				error: "Admin WhatsApp not configured",
			});
		}

		// Parse submission data
		const submission: Submission = req.body;

		if (!submission || !submission.ticket_number) {
			return res.status(400).json({
				success: false,
				error: "Invalid submission data",
			});
		}

		// Format message for WhatsApp
		const message = formatWhatsAppMessage(submission);

		// Send text message first
		console.log("Sending message to WhatsApp admin...");
		const messageResponse = await fetch("https://api.fonnte.com/send", {
			method: "POST",
			headers: {
				Authorization: FONNTE_TOKEN,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				target: ADMIN_WA,
				message: message,
				countryCode: "62",
			}),
		});

		if (!messageResponse.ok) {
			const errorText = await messageResponse.text();
			console.error("Fonnte API error:", errorText);
			throw new Error(
				`Failed to send message: ${messageResponse.status}`
			);
		}

		const messageResult = await messageResponse.json();
		console.log("Message sent successfully:", messageResult);

		// Send photos if available
		if (submission.photos && submission.photos.length > 0) {
			console.log(`Sending ${submission.photos.length} photo(s)...`);

			for (let i = 0; i < submission.photos.length; i++) {
				const photoUrl = submission.photos[i];

				try {
					const photoResponse = await fetch(
						"https://api.fonnte.com/send",
						{
							method: "POST",
							headers: {
								Authorization: FONNTE_TOKEN,
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								target: ADMIN_WA,
								file: photoUrl,
								caption: `Foto ${i + 1} - ${
									submission.ticket_number
								}`,
								countryCode: "62",
							}),
						}
					);

					if (!photoResponse.ok) {
						console.error(
							`Failed to send photo ${i + 1}:`,
							await photoResponse.text()
						);
						// Continue with other photos even if one fails
					} else {
						console.log(`Photo ${i + 1} sent successfully`);
					}
				} catch (photoError) {
					console.error(`Error sending photo ${i + 1}:`, photoError);
					// Continue with other photos
				}
			}
		}

		// Return success response
		return res.status(200).json({
			success: true,
			message: "Submission sent successfully to admin WhatsApp",
			ticket_number: submission.ticket_number,
		});
	} catch (error) {
		console.error("Error in WhatsApp API handler:", error);
		return res.status(500).json({
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Internal server error",
		});
	}
}

/**
 * Format submission data into WhatsApp message
 */
function formatWhatsAppMessage(submission: Submission): string {
	const categoryNames: Record<string, string> = {
		hp_flagship: "HP Flagship",
		laptop: "Laptop",
		komputer: "Komputer",
	};

	const conditionNames: Record<string, string> = {
		mulus: "Mulus (Seperti Baru)",
		normal: "Normal (Ada Bekas Pakai)",
		ada_dent: "Ada Dent/Penyok",
		pecah: "Pecah/Retak",
	};

	let message = `🎫 *PENGAJUAN BARU - ${submission.ticket_number}*\n\n`;
	message += `📱 *INFORMASI PERANGKAT*\n`;
	message += `Kategori: ${
		categoryNames[submission.category] || submission.category
	}\n`;
	message += `Merek: ${submission.brand}\n`;
	message += `Model: ${submission.model}\n`;
	message += `Tahun Rilis: ${submission.year_released}\n`;
	message += `Kondisi Fisik: ${
		conditionNames[submission.physical_condition] ||
		submission.physical_condition
	}\n\n`;

	if (
		submission.functional_features &&
		submission.functional_features.length > 0
	) {
		message += `✅ *FITUR BERFUNGSI*\n`;
		submission.functional_features.forEach((feature) => {
			message += `• ${feature}\n`;
		});
		message += `\n`;
	}

	if (submission.accessories && submission.accessories.length > 0) {
		message += `📦 *KELENGKAPAN*\n`;
		submission.accessories.forEach((acc) => {
			message += `• ${acc}\n`;
		});
		message += `\n`;
	}

	message += `👤 *INFORMASI PENJUAL*\n`;
	message += `Nama: ${submission.full_name}\n`;
	message += `WhatsApp: ${submission.whatsapp}\n`;

	if (submission.email) {
		message += `Email: ${submission.email}\n`;
	}

	message += `Alamat: ${submission.full_address}\n`;

	if (submission.location_lat && submission.location_lng) {
		message += `Lokasi: https://maps.google.com/?q=${submission.location_lat},${submission.location_lng}\n`;
	}

	message += `\n📅 Waktu Pengajuan: ${new Date(
		submission.created_at || new Date()
	).toLocaleString("id-ID")}\n`;
	message += `\n💬 Silakan hubungi penjual untuk negosiasi harga.`;

	return message;
}
