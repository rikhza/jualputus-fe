import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, XCircle, ArrowLeft } from "lucide-react";
import { Submission } from "../types";
import { Button } from "./ui/Button";

/**
 * SendPage - Frontend-only submission to Fonnte API
 * Receives form data via navigation state and calls https://api.fonnte.com/send
 * Route: /send/payloadwa
 * On success: navigates to /sukses
 */
export function SendPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [status, setStatus] = useState<"loading" | "error">("loading");
	const [message, setMessage] = useState("Mengirim data Anda...");

	useEffect(() => {
		const sendSubmission = async () => {
			try {
				// Get submission data from navigation state
				const { submission } = location.state || {};

				if (!submission || !submission.ticket_number) {
					throw new Error("No submission data provided");
				}

				// Send to Fonnte API directly (frontend-only)
				setMessage("Mengirim ke WhatsApp admin...");

				const token = import.meta.env.VITE_FONNTE_TOKEN;
				const adminWa = import.meta.env.VITE_ADMIN_WA;
				if (!token || !adminWa) {
					throw new Error(
						"Fonnte token atau admin WA belum dikonfigurasi (.env)"
					);
				}

				// 1) Send message
				const msgRes = await fetch("https://api.fonnte.com/send", {
					method: "POST",
					headers: {
						Authorization: token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						target: adminWa,
						message: buildMessage(submission),
						countryCode: "62",
					}),
				});
				if (!msgRes.ok)
					throw new Error(`Fonnte message failed: ${msgRes.status}`);

				// 2) Send photos using multipart/form-data (Fonnte requirement)
				if (submission.photos?.length) {
					for (let i = 0; i < submission.photos.length; i++) {
						const base64Data = submission.photos[i];

						// Convert base64 to Blob
						const base64Response = await fetch(base64Data);
						const blob = await base64Response.blob();

						// Create FormData for multipart upload
						const formData = new FormData();
						formData.append("target", adminWa);
						formData.append("file", blob, `foto-${i + 1}.jpg`);
						formData.append(
							"caption",
							`Foto ${i + 1} - ${submission.ticket_number}`
						);
						formData.append("countryCode", "62");

						const photoRes = await fetch(
							"https://api.fonnte.com/send",
							{
								method: "POST",
								headers: {
									Authorization: token,
								},
								body: formData, // multipart/form-data
							}
						);

						if (!photoRes.ok) {
							console.warn("Failed to send photo", i + 1);
							const errText = await photoRes.text();
							console.error("Photo error:", errText);
						} else {
							console.log(`✅ Photo ${i + 1} sent successfully`);
						}
					}
				}

				// Success! Navigate to success page
				navigate("/sukses", {
					state: { ticketNumber: submission.ticket_number },
					replace: true,
				});
			} catch (error) {
				console.error("Send error:", error);
				setStatus("error");
				setMessage(
					error instanceof Error
						? error.message
						: "Terjadi kesalahan saat mengirim data"
				);
			}
		};

		sendSubmission();
	}, [location.state, navigate]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
				{status === "loading" && (
					<div className="text-center">
						<Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-slate-900 mb-2">
							Mengirim Data
						</h2>
						<p className="text-slate-600">{message}</p>
					</div>
				)}

				{status === "error" && (
					<div className="text-center">
						<XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-slate-900 mb-2">
							Gagal Mengirim
						</h2>
						<p className="text-slate-600 mb-6">{message}</p>

						<div className="space-y-3">
							<Button
								onClick={() => window.location.reload()}
								className="w-full"
							>
								Coba Lagi
							</Button>
							<Button
								variant="outline"
								onClick={() => navigate("/")}
								className="w-full"
							>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Kembali ke Beranda
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function buildMessage(submission: Submission): string {
	const categoryNames: Record<string, string> = {
		hp_flagship: "HP Flagship",
		laptop: "Laptop",
		komputer: "Komputer",
	};

	const conditionNames: Record<string, string> = {
		mulus: "Mulus (Seperti Baru)",
		normal: "Normal (Ada Bekas Pakai)",
		ada_dent: "Ada Dent/Penyok",
		pecah: "Pecah/Retak",
	};

	let message = `🎫 *PENGAJUAN BARU - ${submission.ticket_number}*\n\n`;
	message += `📱 *INFORMASI PERANGKAT*\n`;
	message += `Kategori: ${
		categoryNames[submission.category] || submission.category
	}\n`;
	message += `Merek: ${submission.brand}\n`;
	message += `Model: ${submission.model}\n`;
	message += `Tahun Rilis: ${submission.year_released}\n`;
	message += `Kondisi Fisik: ${
		conditionNames[submission.physical_condition] ||
		submission.physical_condition
	}\n\n`;

	if (submission.functional_features?.length) {
		message += `✅ *FITUR BERFUNGSI*\n`;
		submission.functional_features.forEach((f) => (message += `• ${f}\n`));
		message += `\n`;
	}

	if (submission.accessories?.length) {
		message += `📦 *KELENGKAPAN*\n`;
		submission.accessories.forEach((a) => (message += `• ${a}\n`));
		message += `\n`;
	}

	message += `👤 *INFORMASI PENJUAL*\n`;
	message += `Nama: ${submission.full_name}\n`;
	message += `WhatsApp: ${submission.whatsapp}\n`;
	if (submission.email) message += `Email: ${submission.email}\n`;
	message += `Alamat: ${submission.full_address}\n`;
	if (submission.location_lat && submission.location_lng)
		message += `Lokasi: https://maps.google.com/?q=${submission.location_lat},${submission.location_lng}\n`;

	message += `\n📅 Waktu Pengajuan: ${new Date(
		submission.created_at || new Date().toISOString()
	).toLocaleString("id-ID")}\n`;
	message += `\n💬 Silakan hubungi penjual untuk negosiasi harga.`;

	return message;
}

export default SendPage;
