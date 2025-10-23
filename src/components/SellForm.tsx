import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "./ui/Button";
import { Progress } from "./ui/Progress";
import { Step1Product } from "./form/Step1Product";
import { Step2Condition } from "./form/Step2Condition";
import { Step3Contact } from "./form/Step3Contact";
import { Step4Review } from "./form/Step4Review";
import { FormData, FormErrors } from "../types";
import { createSubmission } from "../services/dataService";

interface SellFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: (ticketNumber: string) => void;
}

const initialFormData: FormData = {
	category: "",
	brand: "",
	model: "",
	year_released: "",
	physical_condition: "",
	functional_features: [],
	accessories: [],
	photos: [],
	photoUrls: [],
	full_name: "",
	whatsapp: "",
	email: "",
	full_address: "",
	location_lat: null,
	location_lng: null,
};

export function SellForm({ isOpen, onClose }: SellFormProps) {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const steps = ["Pilih Barang", "Kondisi & Foto", "Kontak", "Review"];

	const handleChange = <K extends keyof FormData>(
		field: K,
		value: FormData[K]
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const validateStep1 = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.category) {
			newErrors.category = "Pilih kategori perangkat";
		}
		if (!formData.brand.trim()) {
			newErrors.brand = "Masukkan merek perangkat";
		}
		if (!formData.model.trim()) {
			newErrors.model = "Masukkan model perangkat";
		}
		if (!formData.year_released) {
			newErrors.year_released = "Pilih tahun rilis";
		} else if (Number(formData.year_released) < 2020) {
			newErrors.year_released =
				"Perangkat harus rilis tahun 2020 atau lebih baru";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateStep2 = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.physical_condition) {
			newErrors.physical_condition = "Pilih kondisi fisik perangkat";
		}
		if (formData.photos.length < 1) {
			newErrors.photos = "Upload minimal 1 foto perangkat";
		}
		if (formData.photos.length > 2) {
			newErrors.photos = "Maksimal 2 foto saja";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const validateStep3 = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.full_name.trim()) {
			newErrors.full_name = "Nama lengkap wajib diisi";
		}

		const whatsappNumbers = formData.whatsapp.replace(/\D/g, "");
		if (!whatsappNumbers) {
			newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
		} else if (whatsappNumbers.length < 10) {
			newErrors.whatsapp = "Nomor WhatsApp tidak valid";
		}

		if (!formData.full_address.trim()) {
			newErrors.full_address = "Alamat lengkap wajib diisi";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = () => {
		let isValid = false;

		if (currentStep === 1) isValid = validateStep1();
		else if (currentStep === 2) isValid = validateStep2();
		else if (currentStep === 3) isValid = validateStep3();
		else isValid = true;

		if (isValid) {
			setCurrentStep((prev) => Math.min(prev + 1, 4));
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);

		try {
			// Prepare submission data (WITHOUT photos in submission object)
			const submissionData = {
				category: formData.category as
					| "hp_flagship"
					| "laptop"
					| "komputer",
				brand: formData.brand,
				model: formData.model,
				year_released: Number(formData.year_released),
				physical_condition: formData.physical_condition as
					| "mulus"
					| "normal"
					| "ada_dent"
					| "pecah",
				functional_features: formData.functional_features,
				accessories: formData.accessories,
				photos: [], // Photos will be sent as File objects separately
				full_name: formData.full_name,
				whatsapp: formData.whatsapp.replace(/\D/g, ""),
				email: formData.email || undefined,
				full_address: formData.full_address,
				location_lat: formData.location_lat ?? undefined,
				location_lng: formData.location_lng ?? undefined,
			};

			// Generate ticket number and ID
			const result = await createSubmission(submissionData);

			// Get full submission with ticket number
			const fullSubmission = {
				...submissionData,
				id: result.id,
				ticket_number: result.ticket_number,
				status: "pending" as const,
				created_at: new Date().toISOString(),
			};

			// Close form modal
			onClose();

			// Navigate to send page with submission data AND File objects via state
			// Add timestamp to force new navigation state and prevent cache
			navigate("/send/payloadwa", {
				state: {
					submission: fullSubmission,
					photoFiles: formData.photos, // Pass actual File objects
					timestamp: Date.now(), // Force unique state on each submit
				},
				replace: false, // Create new history entry
			});

			// Revoke all Object URLs to free memory
			formData.photoUrls.forEach((url) => {
				URL.revokeObjectURL(url);
			});

			// Reset form data
			setFormData(initialFormData);
			setCurrentStep(1);
			setErrors({});
		} catch (error) {
			console.error("Submission error:", error);
			alert(
				"Ups, terjadi kesalahan saat memproses data. Silakan coba lagi."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
			<div className="min-h-screen px-4 py-8 flex items-start justify-center">
				<div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative">
					<div className="sticky top-0 bg-white border-b border-slate-200 rounded-t-2xl px-6 py-4 flex items-center justify-between z-10">
						<h2 className="text-xl font-bold text-slate-900">
							Form Penjualan
						</h2>
						<button
							onClick={onClose}
							className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-150"
							aria-label="Close"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="px-6 py-6">
						<Progress
							currentStep={currentStep}
							totalSteps={4}
							steps={steps}
						/>

						<div className="mt-8">
							{currentStep === 1 && (
								<Step1Product
									formData={formData}
									errors={errors}
									onChange={handleChange}
								/>
							)}
							{currentStep === 2 && (
								<Step2Condition
									formData={formData}
									errors={errors}
									onChange={handleChange}
								/>
							)}
							{currentStep === 3 && (
								<Step3Contact
									formData={formData}
									errors={errors}
									onChange={handleChange}
								/>
							)}
							{currentStep === 4 && (
								<Step4Review formData={formData} />
							)}
						</div>

						<div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-200">
							{currentStep > 1 && (
								<Button
									variant="outline"
									onClick={handleBack}
									disabled={isSubmitting}
									className="flex-1 sm:flex-none"
								>
									<ArrowLeft className="w-4 h-4 mr-2" />
									Kembali
								</Button>
							)}
							{currentStep < 4 ? (
								<Button onClick={handleNext} className="flex-1">
									Lanjut
								</Button>
							) : (
								<Button
									onClick={handleSubmit}
									isLoading={isSubmitting}
									className="flex-1"
								>
									Submit
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SellForm;
