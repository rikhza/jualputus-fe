import { Smartphone, Laptop, Monitor } from "lucide-react";
import { RadioCard } from "../ui/RadioCard";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { FormData, FormErrors, Category } from "../../types";
import { useMemo, memo } from "react";

interface Step1ProductProps {
	formData: FormData;
	errors: FormErrors;
	onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export const Step1Product = memo(function Step1Product({
	formData,
	errors,
	onChange,
}: Step1ProductProps) {
	const yearOptions = useMemo(() => {
		const currentYear = new Date().getFullYear();
		const years = [];
		for (let year = currentYear; year >= 2020; year--) {
			years.push({ value: year.toString(), label: year.toString() });
		}
		return [{ value: "", label: "Pilih tahun rilis" }, ...years];
	}, []);

	const handleCategoryChange = (category: Category) => {
		onChange("category", category);
		onChange("brand", "");
		onChange("model", "");
	};

	const showYearWarning =
		formData.year_released !== "" && Number(formData.year_released) < 2020;

	// Get placeholder examples based on category
	const getBrandPlaceholder = () => {
		switch (formData.category) {
			case "hp_flagship":
				return "Contoh: iPhone, Samsung, Xiaomi, OPPO";
			case "laptop":
				return "Contoh: ASUS, Lenovo, MacBook, MSI";
			case "komputer":
				return "Contoh: Dell, HP, ASUS, Custom Build";
			default:
				return "Masukkan merek perangkat";
		}
	};

	const getModelPlaceholder = () => {
		switch (formData.category) {
			case "hp_flagship":
				return "Contoh: iPhone 15 Pro, Galaxy S24 Ultra";
			case "laptop":
				return "Contoh: ROG Zephyrus G14, ThinkPad X1";
			case "komputer":
				return "Contoh: OptiPlex 7010, Custom Gaming PC";
			default:
				return "Masukkan model/tipe perangkat";
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-slate-900 mb-4">
					Pilih Kategori Barang
				</h3>
				<div className="grid sm:grid-cols-3 gap-4">
					<RadioCard
						name="category"
						value="hp_flagship"
						checked={formData.category === "hp_flagship"}
						onChange={() => handleCategoryChange("hp_flagship")}
						label="HP Android & iPhone"
						icon={<Smartphone className="w-5 h-5" />}
					/>
					<RadioCard
						name="category"
						value="laptop"
						checked={formData.category === "laptop"}
						onChange={() => handleCategoryChange("laptop")}
						label="Laptop"
						icon={<Laptop className="w-5 h-5" />}
					/>
					<RadioCard
						name="category"
						value="komputer"
						checked={formData.category === "komputer"}
						onChange={() => handleCategoryChange("komputer")}
						label="Komputer"
						icon={<Monitor className="w-5 h-5" />}
					/>
				</div>
				{errors.category && (
					<p className="mt-2 text-sm text-red-600">
						{errors.category}
					</p>
				)}
			</div>

			{formData.category && (
				<>
					<Input
						label="Merek"
						required
						type="text"
						placeholder={getBrandPlaceholder()}
						value={formData.brand}
						onChange={(e) => onChange("brand", e.target.value)}
						error={errors.brand}
						helpText="Masukkan merek perangkat Anda"
					/>

					<Input
						label="Model / Tipe"
						required
						type="text"
						placeholder={getModelPlaceholder()}
						value={formData.model}
						onChange={(e) => onChange("model", e.target.value)}
						error={errors.model}
						helpText="Masukkan model atau tipe perangkat Anda"
					/>

					<Select
						label="Tahun Rilis"
						required
						value={formData.year_released.toString()}
						onChange={(e) =>
							onChange(
								"year_released",
								e.target.value ? Number(e.target.value) : ""
							)
						}
						options={yearOptions}
						error={errors.year_released}
						helpText="Pilih tahun rilis perangkat Anda"
					/>

					{showYearWarning && (
						<div className="bg-red-50 border border-red-200 rounded-xl p-4">
							<p className="text-red-800 font-medium mb-2">
								Perangkat Tidak Memenuhi Syarat
							</p>
							<p className="text-red-700 text-sm">
								Maaf, saat ini kami hanya menerima perangkat
								dengan tahun rilis 2020 atau lebih baru. Silakan
								lihat FAQ untuk informasi lebih lanjut.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
});
