import { Submission } from "../types";

const FONNTE_API_URL = "https://api.fonnte.com/send";
const FONNTE_TOKEN = import.meta.env.VITE_FONNTE_TOKEN;
const ADMIN_WA = import.meta.env.VITE_ADMIN_WA;

interface FontteResponse {
	status: boolean;
	message: string;
	detail?: string;
}

/**
 * Format submission data into WhatsApp message
 */
const formatSubmissionMessage = (
	submission: Submission,
	photoCount?: number
): string => {
	const categoryLabels: { [key: string]: string } = {
		hp_flagship: "HP Android & iPhone",
		laptop: "Laptop",
		komputer: "Komputer",
	};

	const conditionLabels: { [key: string]: string } = {
		mulus: "Mulus",
		normal: "Normal",
		ada_dent: "Ada Dent",
		pecah: "Pecah",
	};

	const features = submission.functional_features.join(", ") || "Tidak ada";
	const accessories = submission.accessories.join(", ") || "Tidak ada";

	return `
🎉 *${submission.ticket_number}*

📅 *Tanggal:* ${new Date(submission.created_at || "").toLocaleString("id-ID")}

━━━━━━━━━━━━━━━━━━━

📱 *INFORMASI PERANGKAT*
• Kategori: ${categoryLabels[submission.category]}
• Merek: ${submission.brand}
• Model: ${submission.model}
• Tahun Rilis: ${submission.year_released}
• Kondisi Fisik: ${conditionLabels[submission.physical_condition]}

🔧 *FUNGSI & KELENGKAPAN*
• Fungsi Normal: ${features}
• Aksesoris: ${accessories}
• Jumlah Foto: ${photoCount || 0} foto

━━━━━━━━━━━━━━━━━━━

👤 *INFORMASI KONTAK*
• Nama: ${submission.full_name}
• WhatsApp: ${submission.whatsapp}
${submission.email ? `• Email: ${submission.email}` : ""}
• Alamat: ${submission.full_address}
${
	submission.location_lat && submission.location_lng
		? `• Koordinat: ${submission.location_lat}, ${submission.location_lng}`
		: ""
}

━━━━━━━━━━━━━━━━━━━

📍 *Google Maps:*
${
	submission.location_lat && submission.location_lng
		? `https://www.google.com/maps?q=${submission.location_lat},${submission.location_lng}`
		: "Tidak tersedia"
}

⚡ Segera hubungi customer untuk proses selanjutnya!
`.trim();
};

/**
 * Send text message to WhatsApp
 */
const sendMessage = async (
	target: string,
	message: string
): Promise<FontteResponse> => {
	const formData = new FormData();
	formData.append("target", target);
	formData.append("message", message);
	formData.append("countryCode", "62");

	try {
		const response = await fetch(FONNTE_API_URL, {
			method: "POST",
			headers: {
				Authorization: FONNTE_TOKEN,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error sending WhatsApp message:", error);
		throw error;
	}
};

/**
 * Send image file to WhatsApp using File object
 */
const sendImageFile = async (
	target: string,
	file: File,
	caption: string,
	index: number
): Promise<FontteResponse> => {
	const formData = new FormData();
	formData.append("target", target);
	formData.append("message", caption);
	formData.append("file", file, file.name);
	formData.append("countryCode", "62");

	// Add delay to prevent rate limiting (start from 2nd photo)
	if (index > 0) {
		formData.append("delay", "3");
	}

	try {
		const response = await fetch(FONNTE_API_URL, {
			method: "POST",
			headers: {
				Authorization: FONNTE_TOKEN,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error sending WhatsApp image file:", error);
		throw error;
	}
};

/**
 * Send complete submission to admin WhatsApp
 */
export const sendSubmissionToWhatsApp = async (
	submission: Submission,
	photoFiles?: File[]
): Promise<boolean> => {
	try {
		// Validate configuration
		if (!FONNTE_TOKEN || FONNTE_TOKEN === "your_fonnte_token_here") {
			console.error("Fonnte token not configured");
			throw new Error(
				"WhatsApp service not configured. Please set VITE_FONNTE_TOKEN in .env file"
			);
		}

		if (!ADMIN_WA) {
			console.error("Admin WhatsApp number not configured");
			throw new Error(
				"Admin WhatsApp not configured. Please set VITE_ADMIN_WA in .env file"
			);
		}

		// Send main message with submission details
		console.log("Sending main message to admin...");
		const mainMessageResponse = await sendMessage(
			ADMIN_WA,
			formatSubmissionMessage(submission, photoFiles?.length)
		);

		if (!mainMessageResponse.status) {
			throw new Error(
				mainMessageResponse.message || "Failed to send main message"
			);
		}

		console.log("Main message sent successfully");

		// Send all photos with captions using File objects
		if (photoFiles && photoFiles.length > 0) {
			console.log(`Sending ${photoFiles.length} photos to admin...`);

			for (let i = 0; i < photoFiles.length; i++) {
				const file = photoFiles[i];
				const caption = `📸 *Foto Perangkat ${i + 1}/${
					photoFiles.length
				}*\n\n🎫 Tiket: ${submission.ticket_number}\n📱 ${
					submission.brand
				} ${submission.model}`;

				try {
					// Send File object directly
					await sendImageFile(ADMIN_WA, file, caption, i);
					console.log(`Photo ${i + 1} sent successfully`);
				} catch (photoError) {
					console.error(`Error sending photo ${i + 1}:`, photoError);
					// Continue with other photos even if one fails
				}

				// Add extra delay between images to prevent rate limiting
				if (i < photoFiles.length - 1) {
					await new Promise((resolve) => setTimeout(resolve, 2000));
				}
			}

			console.log("All photos sent successfully");
		}

		return true;
	} catch (error) {
		console.error("Error in sendSubmissionToWhatsApp:", error);
		throw error;
	}
};

/**
 * Check if WhatsApp service is configured
 */
export const isWhatsAppConfigured = (): boolean => {
	return (
		!!FONNTE_TOKEN &&
		FONNTE_TOKEN !== "your_fonnte_token_here" &&
		!!ADMIN_WA
	);
};

/**
 * Get admin WhatsApp number for display
 */
export const getAdminWhatsApp = (): string => {
	return ADMIN_WA || "Not configured";
};
