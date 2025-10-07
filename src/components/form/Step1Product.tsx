import { Smartphone, Laptop, Monitor } from "lucide-react";
import { RadioCard } from "../ui/RadioCard";
import { Select } from "../ui/Select";
import { FormData, FormErrors, Category } from "../../types";
import { getBrands, getModels } from "../../services/dataService";
import { useMemo, memo } from "react";

interface Step1ProductProps {
	formData: FormData;
	errors: FormErrors;
	onChange: (field: keyof FormData, value: any) => void;
}

export const Step1Product = memo(function Step1Product({
	formData,
	errors,
	onChange,
}: Step1ProductProps) {
	const filteredBrands = useMemo(() => {
		if (!formData.category) return [];
		return getBrands(formData.category);
	}, [formData.category]);

	const filteredModels = useMemo(() => {
		if (!formData.brand_id) return [];
		return getModels(formData.brand_id);
	}, [formData.brand_id]);

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
		onChange("brand_id", "");
		onChange("model_id", "");
	};

	const handleBrandChange = (brandId: string) => {
		onChange("brand_id", brandId);
		onChange("model_id", "");
	};

	const showYearWarning =
		formData.year_released !== "" && Number(formData.year_released) < 2020;

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
						label="HP Flagship"
						description="iPhone, Samsung, Xiaomi"
						icon={<Smartphone className="w-5 h-5" />}
					/>
					<RadioCard
						name="category"
						value="laptop"
						checked={formData.category === "laptop"}
						onChange={() => handleCategoryChange("laptop")}
						label="Laptop"
						description="ASUS, Lenovo, MSI"
						icon={<Laptop className="w-5 h-5" />}
					/>
					<RadioCard
						name="category"
						value="komputer"
						checked={formData.category === "komputer"}
						onChange={() => handleCategoryChange("komputer")}
						label="Komputer"
						description="PC Desktop"
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
					<Select
						label="Merek"
						required
						value={formData.brand_id}
						onChange={(e) => handleBrandChange(e.target.value)}
						options={[
							{ value: "", label: "Pilih merek" },
							...filteredBrands.map((b) => ({
								value: b.id,
								label: b.name,
							})),
						]}
						error={errors.brand_id}
					/>

					{formData.brand_id && (
						<Select
							label="Model"
							required
							value={formData.model_id}
							onChange={(e) =>
								onChange("model_id", e.target.value)
							}
							options={[
								{ value: "", label: "Pilih model" },
								...filteredModels.map((m) => ({
									value: m.id,
									label: m.name,
								})),
							]}
							error={errors.model_id}
						/>
					)}

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
