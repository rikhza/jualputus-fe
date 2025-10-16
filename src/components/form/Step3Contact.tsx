import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { FormData, FormErrors } from "../../types";

interface Step3ContactProps {
	formData: FormData;
	errors: FormErrors;
	onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}

export function Step3Contact({
	formData,
	errors,
	onChange,
}: Step3ContactProps) {
	const [isGettingLocation, setIsGettingLocation] = useState(false);

	const formatWhatsApp = (value: string) => {
		const numbers = value.replace(/\D/g, "");

		if (numbers.length <= 4) return numbers;
		if (numbers.length <= 8)
			return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
		return `${numbers.slice(0, 4)} ${numbers.slice(4, 8)} ${numbers.slice(
			8,
			12
		)}`;
	};

	const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = formatWhatsApp(e.target.value);
		onChange("whatsapp", formatted);
	};

	const getCurrentLocation = () => {
		if (!navigator.geolocation) {
			alert("Geolocation tidak didukung oleh browser Anda");
			return;
		}

		setIsGettingLocation(true);

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				onChange("location_lat", latitude);
				onChange("location_lng", longitude);

				try {
					const response = await fetch(
						`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
					);
					const data = await response.json();

					if (data.display_name) {
						onChange("full_address", data.display_name);
					}
				} catch (error) {
					console.error("Error fetching address:", error);
				}

				setIsGettingLocation(false);
			},
			(error) => {
				console.error("Error getting location:", error);
				alert(
					"Tidak dapat mengakses lokasi Anda. Pastikan izin lokasi diaktifkan."
				);
				setIsGettingLocation(false);
			}
		);
	};

	return (
		<div className="space-y-6">
			<Input
				label="Nama Lengkap"
				required
				type="text"
				placeholder="Masukkan nama lengkap Anda"
				value={formData.full_name}
				onChange={(e) => onChange("full_name", e.target.value)}
				error={errors.full_name}
				autoComplete="name"
				autoCapitalize="words"
			/>

			<Input
				label="Nomor WhatsApp"
				required
				type="tel"
				inputMode="numeric"
				pattern="[0-9]*"
				placeholder="0812 3456 7890"
				value={formData.whatsapp}
				onChange={handleWhatsAppChange}
				error={errors.whatsapp}
				helpText="Nomor yang aktif untuk dihubungi"
				autoComplete="tel"
			/>

			<Textarea
				label="Alamat Lengkap"
				required
				placeholder="Masukkan alamat lengkap untuk pickup/pengiriman"
				value={formData.full_address}
				onChange={(e) => onChange("full_address", e.target.value)}
				rows={4}
				error={errors.full_address}
			/>

			<div>
				<label className="block text-sm font-medium text-slate-700 mb-2">
					Pin Lokasi <span className="text-red-500">*</span>
				</label>
				<Button
					type="button"
					variant="outline"
					onClick={getCurrentLocation}
					isLoading={isGettingLocation}
					className="w-full sm:w-auto"
				>
					<Navigation className="w-4 h-4 mr-2" />
					Gunakan Lokasi Saya
				</Button>

				{formData.location_lat && formData.location_lng && (
					<div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
						<div className="flex items-start gap-3">
							<MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
							<div className="flex-1">
								<p className="text-sm font-medium text-emerald-900 mb-1">
									Lokasi berhasil dideteksi
								</p>
								<p className="text-xs text-emerald-700">
									Lat: {formData.location_lat.toFixed(6)},
									Lng: {formData.location_lng.toFixed(6)}
								</p>
							</div>
						</div>
					</div>
				)}

				{errors.location && (
					<p className="mt-2 text-sm text-red-600">
						{errors.location}
					</p>
				)}

				<p className="mt-2 text-sm text-slate-500">
					Lokasi akan membantu kami mengatur jadwal pickup yang tepat
				</p>
			</div>

			<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
				<p className="text-sm text-blue-800">
					<strong>Privasi Terjamin:</strong> Data kontak Anda hanya
					digunakan untuk proses transaksi dan tidak akan dibagikan
					kepada pihak ketiga.
				</p>
			</div>
		</div>
	);
}
