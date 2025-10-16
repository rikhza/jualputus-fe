import { Submission } from "../types";

/**
 * Generate a unique memorable ticket number
 * Format: JP-DDMMHHMMSS (Date + Time based)
 * Example: JP-1701143045 = 17 Jan, 14:30:45
 *
 * This ensures uniqueness across all users (centralized time-based)
 * Format: DD = day, MM = month, HHMMSS = hour, minute, second
 * Readable, sortable, and collision-resistant
 */
const generateTicketNumber = (): string => {
	const now = new Date();

	// Get date components
	const day = now.getDate().toString().padStart(2, "0");
	const month = (now.getMonth() + 1).toString().padStart(2, "0");
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const seconds = now.getSeconds().toString().padStart(2, "0");

	// Format: JP-DDMMHHMMSS
	// Example: JP-1701143045 = January 17, 14:30:45
	const ticket = `JP-${day}${month}${hours}${minutes}${seconds}`;

	// Add random 2-digit suffix for extra collision resistance
	const random = Math.floor(Math.random() * 100)
		.toString()
		.padStart(2, "0");

	return `${ticket}${random}`;
};

/**
 * Create a new submission
 * Returns ticket number and ID
 * Data is sent to WhatsApp admin only (not stored locally)
 */
export const createSubmission = async (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_data: Omit<
		Submission,
		"id" | "ticket_number" | "status" | "created_at" | "updated_at"
	>
): Promise<{ id: string; ticket_number: string }> => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	const ticket_number = generateTicketNumber();

	// Note: Data is sent to WhatsApp via whatsappService, not stored locally
	// Future backend integration:
	// const response = await fetch('/api/submissions', {
	//   method: 'POST',
	//   body: JSON.stringify(_data)
	// });

	return { id, ticket_number };
};

// Future: Add backend API integration here
// Example:
// export const getSubmissionById = async (id: string) => {
//   const response = await fetch(`/api/submissions/${id}`);
//   return await response.json();
// };
