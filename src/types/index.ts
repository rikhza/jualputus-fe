export type Category = "hp_flagship" | "laptop" | "komputer";

export type PhysicalCondition = "mulus" | "normal" | "ada_dent" | "pecah";

export type SubmissionStatus =
	| "pending"
	| "contacted"
	| "completed"
	| "cancelled";

export interface Brand {
	id: string;
	name: string;
	category: Category;
	created_at: string;
}

export interface Model {
	id: string;
	brand_id: string;
	name: string;
	year_released: number;
	created_at: string;
}

export interface Submission {
	id?: string;
	ticket_number?: string;
	category: Category;
	brand: string;
	model: string;
	year_released: number;
	physical_condition: PhysicalCondition;
	functional_features: string[];
	accessories: string[];
	photos: string[];
	full_name: string;
	whatsapp: string;
	email?: string;
	full_address: string;
	location_lat?: number;
	location_lng?: number;
	status?: SubmissionStatus;
	created_at?: string;
	updated_at?: string;
}

export interface FormData {
	category: Category | "";
	brand: string;
	model: string;
	year_released: number | "";
	physical_condition: PhysicalCondition | "";
	functional_features: string[];
	accessories: string[];
	photos: File[];
	photoUrls: string[];
	full_name: string;
	whatsapp: string;
	email: string;
	full_address: string;
	location_lat: number | null;
	location_lng: number | null;
}

export interface FormErrors {
	category?: string;
	brand?: string;
	model?: string;
	year_released?: string;
	physical_condition?: string;
	functional_features?: string;
	photos?: string;
	full_name?: string;
	whatsapp?: string;
	full_address?: string;
	location?: string;
}
