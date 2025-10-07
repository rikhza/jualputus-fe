import { Brand, Model, Submission, Category } from "../types";
import { mockBrands, mockModels } from "../data/mockData";

// In-memory storage for submissions (simulating JSON storage)
let submissions: Submission[] = [];

// Local storage key for persistence
const STORAGE_KEY = "jualputus_submissions";

// Load submissions from localStorage on initialization
const loadSubmissions = (): void => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			submissions = JSON.parse(stored);
		}
	} catch (error) {
		console.error("Error loading submissions:", error);
	}
};

// Save submissions to localStorage
const saveSubmissions = (): void => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
	} catch (error) {
		console.error("Error saving submissions:", error);
	}
};

// Initialize on module load
loadSubmissions();

/**
 * Get all brands
 */
export const getBrands = (category?: Category): Brand[] => {
	if (category) {
		return mockBrands.filter((brand) => brand.category === category);
	}
	return mockBrands;
};

/**
 * Get brand by ID
 */
export const getBrandById = (id: string): Brand | undefined => {
	return mockBrands.find((brand) => brand.id === id);
};

/**
 * Get all models
 */
export const getModels = (brandId?: string): Model[] => {
	if (brandId) {
		return mockModels.filter((model) => model.brand_id === brandId);
	}
	return mockModels;
};

/**
 * Get model by ID
 */
export const getModelById = (id: string): Model | undefined => {
	return mockModels.find((model) => model.id === id);
};

/**
 * Generate a unique ticket number
 */
const generateTicketNumber = (): string => {
	const date = new Date();
	const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
	const random = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	return `JP${dateStr}-${random}`;
};

/**
 * Create a new submission
 */
export const createSubmission = async (
	data: Omit<
		Submission,
		"id" | "ticket_number" | "status" | "created_at" | "updated_at"
	>
): Promise<{ id: string; ticket_number: string }> => {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	const now = new Date().toISOString();
	const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	const ticket_number = generateTicketNumber();

	const submission: Submission = {
		...data,
		id,
		ticket_number,
		status: "pending",
		created_at: now,
		updated_at: now,
	};

	submissions.push(submission);
	saveSubmissions();

	return { id, ticket_number };
};

/**
 * Get submission by ID
 */
export const getSubmissionById = (id: string): Submission | undefined => {
	return submissions.find((sub) => sub.id === id);
};

/**
 * Get submission by ticket number
 */
export const getSubmissionByTicket = (
	ticketNumber: string
): Submission | undefined => {
	return submissions.find((sub) => sub.ticket_number === ticketNumber);
};

/**
 * Get all submissions
 */
export const getAllSubmissions = (): Submission[] => {
	return [...submissions].sort((a, b) => {
		const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
		const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
		return dateB - dateA;
	});
};

/**
 * Update submission status
 */
export const updateSubmissionStatus = (
	id: string,
	status: Submission["status"]
): Submission | null => {
	const index = submissions.findIndex((sub) => sub.id === id);
	if (index === -1) return null;

	submissions[index] = {
		...submissions[index],
		status,
		updated_at: new Date().toISOString(),
	};

	saveSubmissions();
	return submissions[index];
};

/**
 * Delete submission
 */
export const deleteSubmission = (id: string): boolean => {
	const initialLength = submissions.length;
	submissions = submissions.filter((sub) => sub.id !== id);

	if (submissions.length < initialLength) {
		saveSubmissions();
		return true;
	}

	return false;
};

/**
 * Clear all submissions (for testing/development)
 */
export const clearAllSubmissions = (): void => {
	submissions = [];
	localStorage.removeItem(STORAGE_KEY);
};

/**
 * Export submissions to JSON
 */
export const exportSubmissionsToJSON = (): string => {
	return JSON.stringify(submissions, null, 2);
};

/**
 * Import submissions from JSON
 */
export const importSubmissionsFromJSON = (jsonString: string): boolean => {
	try {
		const imported = JSON.parse(jsonString);
		if (Array.isArray(imported)) {
			submissions = imported;
			saveSubmissions();
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error importing submissions:", error);
		return false;
	}
};
