import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import { Button } from "./ui/Button";

interface SuccessScreenProps {
	ticketNumber: string;
	onClose: () => void;
}

export function SuccessScreen({ ticketNumber, onClose }: SuccessScreenProps) {
	const whatsappNumber = "6281234567890";
	const message = `Halo, saya ingin menanyakan status pengajuan saya dengan nomor tiket: ${ticketNumber}`;
	const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
		message
	)}`;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
			<div className="min-h-screen px-4 py-8 flex items-center justify-center">
				<div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
						<CheckCircle2 className="w-10 h-10 text-emerald-600" />
					</div>

					<h2 className="text-2xl font-bold text-slate-900 mb-3">
						Data Terkirim!
					</h2>
					<p className="text-slate-600 mb-6 leading-relaxed">
						Admin kami akan menghubungi Anda dalam waktu dekat untuk
						memberikan estimasi harga dan langkah selanjutnya.
					</p>

					<div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
						<p className="text-sm text-slate-600 mb-1">
							Nomor Tiket Anda:
						</p>
						<p className="text-xl font-bold text-emerald-600">
							{ticketNumber}
						</p>
						<p className="text-xs text-slate-500 mt-2">
							Simpan nomor ini untuk tracking
						</p>
					</div>

					<div className="space-y-3">
						<Button
							onClick={() => window.open(whatsappUrl, "_blank")}
							className="w-full"
						>
							<MessageCircle className="w-5 h-5 mr-2" />
							Chat Admin via WhatsApp
						</Button>
						<Button
							onClick={onClose}
							variant="outline"
							className="w-full"
						>
							<Home className="w-5 h-5 mr-2" />
							Kembali ke Beranda
						</Button>
					</div>

					<div className="mt-6 pt-6 border-t border-slate-200">
						<p className="text-sm text-slate-600">
							Kami akan menghubungi Anda melalui{" "}
							<strong>WhatsApp</strong> atau{" "}
							<strong>Email</strong> yang telah Anda daftarkan.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SuccessScreen;
