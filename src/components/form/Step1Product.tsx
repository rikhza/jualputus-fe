import {
	Smartphone,
	Laptop,
	Monitor,
	Sparkles,
	TrendingUp,
	Clock,
} from "lucide-react";
import { RadioCard } from "../ui/RadioCard";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
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
		<div className="space-y-8">
			{/* Header Section */}
			<div className="text-center">
				<div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-4">
					<Sparkles className="w-4 h-4 text-blue-600" />
					<span className="text-sm font-medium text-blue-700">
						Step 1 of 4
					</span>
				</div>
				<h3 className="text-2xl font-bold text-slate-900 mb-2">
					Pilih Kategori Perangkat
				</h3>
				<p className="text-slate-600">
					Pilih jenis perangkat yang ingin Anda jual
				</p>
			</div>

			{/* Category Selection */}
			<div>
				<div className="grid sm:grid-cols-3 gap-4">
					<RadioCard
						name="category"
						value="hp_flagship"
						checked={formData.category === "hp_flagship"}
						onChange={() => handleCategoryChange("hp_flagship")}
						label="HP Android & iPhone"
						icon={<Smartphone className="w-6 h-6" />}
						className="group hover:scale-105 transition-transform duration-200"
					/>
					<RadioCard
						name="category"
						value="laptop"
						checked={formData.category === "laptop"}
						onChange={() => handleCategoryChange("laptop")}
						label="Laptop"
						icon={<Laptop className="w-6 h-6" />}
						className="group hover:scale-105 transition-transform duration-200"
					/>
					<RadioCard
						name="category"
						value="komputer"
						checked={formData.category === "komputer"}
						onChange={() => handleCategoryChange("komputer")}
						label="Komputer"
						icon={<Monitor className="w-6 h-6" />}
						className="group hover:scale-105 transition-transform duration-200"
					/>
				</div>
				{errors.category && (
					<div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-sm text-red-600">
							{errors.category}
						</p>
					</div>
				)}
			</div>

			{formData.category && (
				<Card className="p-6 bg-gradient-to-br from-slate-50 to-white border-slate-200">
					<div className="space-y-6">
						{/* Section Header */}
						<div className="flex items-center gap-3 pb-4 border-b border-slate-200">
							<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
								<TrendingUp className="w-4 h-4 text-emerald-600" />
							</div>
							<div>
								<h4 className="font-semibold text-slate-900">
									Detail Perangkat
								</h4>
								<p className="text-sm text-slate-600">
									Lengkapi informasi perangkat Anda
								</p>
							</div>
						</div>

						{/* Form Fields */}
						<div className="grid sm:grid-cols-2 gap-6">
							<div className="sm:col-span-2">
								<Input
									label="Merek"
									required
									type="text"
									placeholder={getBrandPlaceholder()}
									value={formData.brand}
									onChange={(e) =>
										onChange("brand", e.target.value)
									}
									error={errors.brand}
									helpText="Masukkan merek perangkat Anda"
									className="text-lg"
								/>
							</div>

							<div className="sm:col-span-2">
								<Input
									label="Model / Tipe"
									required
									type="text"
									placeholder={getModelPlaceholder()}
									value={formData.model}
									onChange={(e) =>
										onChange("model", e.target.value)
									}
									error={errors.model}
									helpText="Masukkan model atau tipe perangkat Anda"
									className="text-lg"
								/>
							</div>

							<div className="sm:col-span-2">
								<Select
									label="Tahun Rilis"
									required
									value={formData.year_released.toString()}
									onChange={(e) =>
										onChange(
											"year_released",
											e.target.value
												? Number(e.target.value)
												: ""
										)
									}
									options={yearOptions}
									error={errors.year_released}
									helpText="Pilih tahun rilis perangkat Anda"
									className="text-lg"
								/>
							</div>
						</div>

						{/* Year Warning */}
						{showYearWarning && (
							<div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
								<div className="flex items-start gap-3">
									<Clock className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
									<div>
										<p className="text-red-800 font-semibold mb-1">
											Perangkat Tidak Memenuhi Syarat
										</p>
										<p className="text-red-700 text-sm">
											Maaf, saat ini kami hanya menerima
											perangkat dengan tahun rilis 2020
											atau lebih baru. Silakan lihat FAQ
											untuk informasi lebih lanjut.
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Category Info */}
						<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
							<div className="flex items-start gap-3">
								<div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
									{formData.category === "hp_flagship" && (
										<Smartphone className="w-3 h-3 text-blue-600" />
									)}
									{formData.category === "laptop" && (
										<Laptop className="w-3 h-3 text-blue-600" />
									)}
									{formData.category === "komputer" && (
										<Monitor className="w-3 h-3 text-blue-600" />
									)}
								</div>
								<div>
									<p className="text-blue-900 font-medium text-sm mb-1">
										Tips untuk{" "}
										{formData.category === "hp_flagship"
											? "Smartphone"
											: formData.category === "laptop"
											? "Laptop"
											: "Komputer"}
									</p>
									<p className="text-blue-800 text-xs">
										{formData.category === "hp_flagship" &&
											"Pastikan kondisi fisik dan fungsi layar, kamera, dan baterai dalam keadaan baik."}
										{formData.category === "laptop" &&
											"Periksa kondisi keyboard, trackpad, dan port USB. Laptop gaming biasanya memiliki nilai jual lebih tinggi."}
										{formData.category === "komputer" &&
											"Sertakan spesifikasi lengkap (CPU, RAM, GPU, storage) untuk mendapatkan penawaran terbaik."}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Card>
			)}
		</div>
	);
});
