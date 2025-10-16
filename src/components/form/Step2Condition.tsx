import { useState, useCallback } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { Select } from "../ui/Select";
import { Checkbox } from "../ui/Checkbox";
import { FormData, FormErrors, PhysicalCondition } from "../../types";
import { functionalFeatures, accessoriesList } from "../../data/mockData";

interface Step2ConditionProps {
	formData: FormData;
	errors: FormErrors;
	onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function Step2Condition({
	formData,
	errors,
	onChange,
}: Step2ConditionProps) {
	const [dragActive, setDragActive] = useState(false);
	const [uploadProgress, setUploadProgress] = useState<{
		[key: string]: number;
	}>({});

	const compressImage = async (file: File): Promise<File> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (event) => {
				const img = new Image();
				img.src = event.target?.result as string;
				img.onload = () => {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d")!;

					let width = img.width;
					let height = img.height;
					const maxSize = 1920;

					if (width > height && width > maxSize) {
						height = (height * maxSize) / width;
						width = maxSize;
					} else if (height > maxSize) {
						width = (width * maxSize) / height;
						height = maxSize;
					}

					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					canvas.toBlob(
						(blob) => {
							const compressedFile = new File(
								[blob!],
								file.name,
								{
									type: "image/jpeg",
									lastModified: Date.now(),
								}
							);
							resolve(compressedFile);
						},
						"image/jpeg",
						0.85
					);
				};
			};
		});
	};

	const handleFiles = useCallback(
		async (files: FileList | null) => {
			if (!files) return;

			const fileArray = Array.from(files);
			const imageFiles = fileArray.filter((f) =>
				f.type.startsWith("image/")
			);

			if (imageFiles.length === 0) return;

			const currentPhotos = formData.photos;
			const currentUrls = formData.photoUrls;

			if (currentPhotos.length + imageFiles.length > 8) {
				alert("Maksimal 8 foto");
				return;
			}

			const compressedFiles: File[] = [];
			const newUrls: string[] = [];

			for (const file of imageFiles) {
				setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

				const compressed = await compressImage(file);
				compressedFiles.push(compressed);
				newUrls.push(URL.createObjectURL(compressed));

				setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
			}

			onChange("photos", [...currentPhotos, ...compressedFiles]);
			onChange("photoUrls", [...currentUrls, ...newUrls]);

			setTimeout(() => {
				setUploadProgress({});
			}, 500);
		},
		[formData.photos, formData.photoUrls, onChange]
	);

	const handleDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setDragActive(false);

			if (e.dataTransfer.files) {
				handleFiles(e.dataTransfer.files);
			}
		},
		[handleFiles]
	);

	const removePhoto = (index: number) => {
		const newPhotos = formData.photos.filter((_, i) => i !== index);
		const newUrls = formData.photoUrls.filter((_, i) => i !== index);
		onChange("photos", newPhotos);
		onChange("photoUrls", newUrls);
	};

	const conditionOptions = [
		{ value: "", label: "Pilih kondisi fisik" },
		{ value: "mulus", label: "Mulus - Tidak ada lecet atau cacat" },
		{ value: "normal", label: "Normal - Bekas pakai wajar" },
		{ value: "ada_dent", label: "Ada Dent - Ada penyok atau lecet" },
		{ value: "pecah", label: "Pecah - Ada retak atau pecah" },
	];

	return (
		<div className="space-y-6">
			<Select
				label="Kondisi Fisik"
				required
				value={formData.physical_condition}
				onChange={(e) =>
					onChange(
						"physical_condition",
						e.target.value as PhysicalCondition
					)
				}
				options={conditionOptions}
				error={errors.physical_condition}
			/>

			<div>
				<label className="block text-sm font-medium text-slate-700 mb-2">
					Fungsi yang Bekerja
				</label>
				<div className="space-y-3">
					{functionalFeatures.map((feature) => (
						<Checkbox
							key={feature.value}
							label={feature.label}
							checked={formData.functional_features.includes(
								feature.value
							)}
							onChange={(e) => {
								const newFeatures = e.target.checked
									? [
											...formData.functional_features,
											feature.value,
									  ]
									: formData.functional_features.filter(
											(f) => f !== feature.value
									  );
								onChange("functional_features", newFeatures);
							}}
						/>
					))}
				</div>
				{errors.functional_features && (
					<p className="mt-2 text-sm text-red-600">
						{errors.functional_features}
					</p>
				)}
			</div>

			<div>
				<label className="block text-sm font-medium text-slate-700 mb-2">
					Aksesoris yang Disertakan
				</label>
				<div className="space-y-3">
					{accessoriesList.map((accessory) => (
						<Checkbox
							key={accessory.value}
							label={accessory.label}
							checked={formData.accessories.includes(
								accessory.value
							)}
							onChange={(e) => {
								const newAccessories = e.target.checked
									? [...formData.accessories, accessory.value]
									: formData.accessories.filter(
											(a) => a !== accessory.value
									  );
								onChange("accessories", newAccessories);
							}}
						/>
					))}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-slate-900 mb-2">
					Foto Perangkat <span className="text-red-500">*</span>
				</label>
				<p className="text-sm text-slate-600 mb-4">
					Upload minimal 4 foto (depan, belakang, samping, layar
					menyala). Maksimal 8 foto.
				</p>

				<div
					className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-150 ${
						dragActive
							? "border-emerald-500 bg-emerald-50"
							: "border-slate-300 hover:border-emerald-400"
					}`}
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				>
					<input
						type="file"
						id="photo-upload"
						className="hidden"
						accept="image/*"
						multiple
						onChange={(e) => handleFiles(e.target.files)}
					/>
					<label htmlFor="photo-upload" className="cursor-pointer">
						<Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
						<p className="text-slate-700 font-medium mb-1">
							Klik untuk upload atau drag & drop
						</p>
						<p className="text-sm text-slate-500">
							PNG, JPG hingga 10MB per file
						</p>
					</label>
				</div>

				{Object.keys(uploadProgress).length > 0 && (
					<div className="mt-4 space-y-2">
						{Object.entries(uploadProgress).map(
							([name, progress]) => (
								<div
									key={name}
									className="flex items-center gap-3"
								>
									<div className="flex-1 bg-slate-200 rounded-full h-2">
										<div
											className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
											style={{ width: `${progress}%` }}
										/>
									</div>
									<span className="text-xs text-slate-600">
										{progress}%
									</span>
								</div>
							)
						)}
					</div>
				)}

				{formData.photoUrls.length > 0 && (
					<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
						{formData.photoUrls.map((url, index) => (
							<div key={index} className="relative group">
								<img
									src={url}
									alt={`Preview ${index + 1}`}
									className="w-full h-32 object-cover rounded-lg border-2 border-slate-200"
								/>
								<button
									type="button"
									onClick={() => removePhoto(index)}
									className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-red-600"
									aria-label={`Remove photo ${index + 1}`}
								>
									<X className="w-4 h-4" />
								</button>
							</div>
						))}
					</div>
				)}

				{errors.photos && (
					<p className="mt-2 text-sm text-red-600">{errors.photos}</p>
				)}

				<div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
					<AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
					<p className="text-sm text-blue-700">
						<strong>Tips Foto:</strong> Ambil foto di tempat terang,
						fokuskan pada bagian yang lecet (jika ada), dan pastikan
						IMEI/serial number terlihat jelas.
					</p>
				</div>
			</div>
		</div>
	);
}
