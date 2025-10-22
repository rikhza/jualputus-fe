import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "./ui/Button";

/**
 * SuksesPage - Success page after form submission
 * Route: /sukses
 * Only accessible with navigation state from SendPage
 * Redirects to 404 if accessed directly
 */
export function SuksesPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { ticketNumber } = location.state || {};

	useEffect(() => {
		// Redirect to 404 if no ticket number (direct access)
		if (!ticketNumber) {
			navigate("/404", { replace: true });
		}
	}, [ticketNumber, navigate]);

	if (!ticketNumber) {
		return null; // Will redirect to 404
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
				<div className="text-center">
					{/* Success Icon */}
					<div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
						<CheckCircle2 className="w-12 h-12 text-green-600" />
					</div>

					{/* Title */}
					<h1 className="text-3xl font-bold text-slate-900 mb-3">
						Pengajuan Berhasil!
					</h1>

					{/* Subtitle */}
					<p className="text-slate-600 mb-6">
						Data Anda telah berhasil dikirim ke admin Kembali
					</p>

					{/* Ticket Number Card */}
					<div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
						<p className="text-sm text-slate-600 mb-2">
							Nomor Tiket Anda
						</p>
						<p className="text-3xl font-bold text-blue-600 mb-2">
							{ticketNumber}
						</p>
						<p className="text-xs text-slate-500">
							Simpan nomor ini untuk referensi transaksi
						</p>
					</div>

					{/* Info Box */}
					<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
						<div className="flex items-start gap-3">
							<MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
							<div>
								<p className="font-semibold text-blue-900 mb-1">
									Langkah Selanjutnya
								</p>
								<ul className="text-sm text-blue-800 space-y-1">
									<li>
										• Admin kami akan menghubungi Anda via
										WhatsApp
									</li>
									<li>
										• Penawaran harga akan dikirimkan
										setelah verifikasi
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="space-y-3">
						<Button
							onClick={() => navigate("/")}
							className="w-full"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Kembali ke Beranda
						</Button>

						<button
							onClick={() => navigate("/")}
							className="w-full text-sm text-slate-600 hover:text-slate-900 transition-colors"
						>
							Jual perangkat lain
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SuksesPage;
