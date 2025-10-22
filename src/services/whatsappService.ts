import { Submission } from "../types";

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "";

/**
 * Send complete submission to admin WhatsApp via our API endpoint
 */
export const sendSubmissionToWhatsApp = async (
	submission: Submission,
	photoFiles?: File[]
): Promise<boolean> => {
	try {
		// Wait for all photos to be converted to data URLs
		const photoUrls = photoFiles
			? await Promise.all(
					photoFiles.map(
						(file) =>
							new Promise<string>((resolve) => {
								const reader = new FileReader();
								reader.onload = () =>
									resolve(reader.result as string);
								reader.readAsDataURL(file);
							})
					)
			  )
			: [];

		// Send to our API endpoint
		console.log("Sending submission to /send endpoint...");
		const response = await fetch(`${API_BASE_URL}/send`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...submission,
				photos: photoUrls,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.error || `HTTP error! status: ${response.status}`
			);
		}

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || "Failed to send submission");
		}

		console.log("Submission sent successfully via API endpoint");
		return true;
	} catch (error) {
		console.error("Error in sendSubmissionToWhatsApp:", error);
		throw error;
	}
};

/**
 * Check if WhatsApp service is configured (now always true since we use server-side API)
 */
export const isWhatsAppConfigured = (): boolean => {
	return true; // API endpoint handles configuration server-side
};

/**
 * Get admin WhatsApp number for display (not available client-side anymore)
 */
export const getAdminWhatsApp = (): string => {
	return "Configured server-side"; // Admin number is now server-side only
};
