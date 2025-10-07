import { Brand, Model } from "../types";

export const mockBrands: Brand[] = [
	// HP Flagship
	{
		id: "1",
		name: "Apple",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		name: "Samsung",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		name: "Xiaomi",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "4",
		name: "Google",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "5",
		name: "OnePlus",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "6",
		name: "OPPO",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "7",
		name: "Vivo",
		category: "hp_flagship",
		created_at: "2024-01-01T00:00:00Z",
	},

	// Laptop
	{
		id: "8",
		name: "ASUS",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "9",
		name: "Lenovo",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "10",
		name: "MSI",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "11",
		name: "Apple",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "12",
		name: "Dell",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "13",
		name: "HP",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "14",
		name: "Acer",
		category: "laptop",
		created_at: "2024-01-01T00:00:00Z",
	},

	// Komputer
	{
		id: "15",
		name: "Dell",
		category: "komputer",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "16",
		name: "HP",
		category: "komputer",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "17",
		name: "ASUS",
		category: "komputer",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "18",
		name: "Lenovo",
		category: "komputer",
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "19",
		name: "Apple",
		category: "komputer",
		created_at: "2024-01-01T00:00:00Z",
	},
];

export const mockModels: Model[] = [
	// Apple iPhone
	{
		id: "1",
		brand_id: "1",
		name: "iPhone 15 Pro Max",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "2",
		brand_id: "1",
		name: "iPhone 15 Pro",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "3",
		brand_id: "1",
		name: "iPhone 14 Pro Max",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "4",
		brand_id: "1",
		name: "iPhone 14 Pro",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "5",
		brand_id: "1",
		name: "iPhone 13 Pro Max",
		year_released: 2021,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "6",
		brand_id: "1",
		name: "iPhone 13 Pro",
		year_released: 2021,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "7",
		brand_id: "1",
		name: "iPhone 12 Pro Max",
		year_released: 2020,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "8",
		brand_id: "1",
		name: "iPhone 12 Pro",
		year_released: 2020,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Samsung Galaxy
	{
		id: "9",
		brand_id: "2",
		name: "Galaxy S24 Ultra",
		year_released: 2024,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "10",
		brand_id: "2",
		name: "Galaxy S23 Ultra",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "11",
		brand_id: "2",
		name: "Galaxy S23+",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "12",
		brand_id: "2",
		name: "Galaxy S22 Ultra",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "13",
		brand_id: "2",
		name: "Galaxy Z Fold 5",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "14",
		brand_id: "2",
		name: "Galaxy Z Flip 5",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Xiaomi
	{
		id: "15",
		brand_id: "3",
		name: "Xiaomi 14 Pro",
		year_released: 2024,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "16",
		brand_id: "3",
		name: "Xiaomi 13 Pro",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "17",
		brand_id: "3",
		name: "Xiaomi 12 Pro",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Google Pixel
	{
		id: "18",
		brand_id: "4",
		name: "Pixel 8 Pro",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "19",
		brand_id: "4",
		name: "Pixel 7 Pro",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// OnePlus
	{
		id: "20",
		brand_id: "5",
		name: "OnePlus 12",
		year_released: 2024,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "21",
		brand_id: "5",
		name: "OnePlus 11",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// OPPO
	{
		id: "22",
		brand_id: "6",
		name: "Find X6 Pro",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "23",
		brand_id: "6",
		name: "Find X5 Pro",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Vivo
	{
		id: "24",
		brand_id: "7",
		name: "X90 Pro",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// ASUS Laptop
	{
		id: "25",
		brand_id: "8",
		name: "ROG Zephyrus G16",
		year_released: 2024,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "26",
		brand_id: "8",
		name: "ROG Zephyrus G14",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "27",
		brand_id: "8",
		name: "ZenBook 14 OLED",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "28",
		brand_id: "8",
		name: "TUF Gaming A15",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Lenovo Laptop
	{
		id: "29",
		brand_id: "9",
		name: "ThinkPad X1 Carbon Gen 11",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "30",
		brand_id: "9",
		name: "Legion Pro 7i",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "31",
		brand_id: "9",
		name: "Yoga 9i",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// MSI Laptop
	{
		id: "32",
		brand_id: "10",
		name: "Titan GT77",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "33",
		brand_id: "10",
		name: "GE76 Raider",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Apple Laptop
	{
		id: "34",
		brand_id: "11",
		name: 'MacBook Pro 16" M3 Max',
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "35",
		brand_id: "11",
		name: 'MacBook Pro 14" M3 Pro',
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "36",
		brand_id: "11",
		name: "MacBook Air M2",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Dell Laptop
	{
		id: "37",
		brand_id: "12",
		name: "XPS 15",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "38",
		brand_id: "12",
		name: "XPS 13",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// HP Laptop
	{
		id: "39",
		brand_id: "13",
		name: "Spectre x360",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "40",
		brand_id: "13",
		name: "Omen 17",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Acer Laptop
	{
		id: "41",
		brand_id: "14",
		name: "Predator Helios 16",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Dell Komputer
	{
		id: "42",
		brand_id: "15",
		name: "OptiPlex 7010",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "43",
		brand_id: "15",
		name: "Precision 3660",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// HP Komputer
	{
		id: "44",
		brand_id: "16",
		name: "EliteDesk 800 G9",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "45",
		brand_id: "16",
		name: "Z2 Tower G9",
		year_released: 2022,
		created_at: "2024-01-01T00:00:00Z",
	},

	// ASUS Komputer
	{
		id: "46",
		brand_id: "17",
		name: "ROG Strix G35",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Lenovo Komputer
	{
		id: "47",
		brand_id: "18",
		name: "ThinkCentre M90a",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},

	// Apple Komputer
	{
		id: "48",
		brand_id: "19",
		name: "Mac Studio M2 Ultra",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "49",
		brand_id: "19",
		name: "Mac mini M2 Pro",
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
	{
		id: "50",
		brand_id: "19",
		name: 'iMac 24" M3',
		year_released: 2023,
		created_at: "2024-01-01T00:00:00Z",
	},
];

export const functionalFeatures = [
	{ value: "layar", label: "Layar" },
	{ value: "speaker", label: "Speaker" },
	{ value: "kamera", label: "Kamera" },
	{ value: "face_touch_id", label: "Face/TouchID" },
	{ value: "baterai", label: "Baterai" },
	{ value: "port", label: "Port" },
];

export const accessoriesList = [
	{ value: "dus", label: "Dus" },
	{ value: "charger", label: "Charger" },
	{ value: "kabel", label: "Kabel" },
	{ value: "nota", label: "Nota" },
];
