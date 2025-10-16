import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const faqs = [
		{
			question: "Apa syarat perangkat yang diterima?",
			answer: "Kami menerima HP flagship (iPhone, Samsung Galaxy S/Note series, Xiaomi flagship), laptop gaming/profesional (ASUS, Lenovo, MSI, Dell, HP), dan PC desktop dengan tahun rilis minimal 2020. Perangkat harus dalam kondisi fungsional dengan kelengkapan yang jelas.",
		},
		{
			question: "Bagaimana cara mengecek tahun rilis perangkat saya?",
			answer: "Untuk HP: cek di Pengaturan > Tentang Ponsel > Nomor Model, lalu cari di Google. Untuk laptop/PC: cek label pada perangkat atau di System Information (Windows) / About This Mac (macOS). Anda juga bisa mencari serial number perangkat untuk informasi detail.",
		},
		{
			question: "Bagaimana cara upload foto yang baik?",
			answer: "Ambil foto di tempat yang terang dengan pencahayaan alami. Fokuskan kamera pada detail perangkat. Foto wajib: tampak depan, belakang, samping, dan layar menyala. Jika ada lecet atau cacat, foto close-up bagian tersebut. Pastikan IMEI/serial number terlihat jelas pada salah satu foto.",
		},
		{
			question: "Berapa lama proses estimasi harga?",
			answer: "Setelah Anda submit formulir, tim kami akan menghubungi dalam waktu maksimal 24-48 jam kerja untuk memberikan estimasi harga. Harga final akan ditentukan setelah verifikasi fisik perangkat.",
		},
		{
			question: "Bagaimana metode pembayarannya?",
			answer: "Pembayaran dilakukan via transfer bank instan setelah proses verifikasi perangkat selesai. Kami mendukung transfer ke semua bank mayor di Indonesia. Dana akan masuk ke rekening Anda pada hari yang sama setelah kesepakatan.",
		},
		{
			question: "Di wilayah mana saja layanan pickup tersedia?",
			answer: "Saat ini layanan pickup tersedia untuk wilayah Jabodetabek. Untuk wilayah di luar area tersebut, Anda dapat mengirimkan perangkat ke alamat kami dengan biaya pengiriman yang akan kami ganti setelah transaksi selesai.",
		},
	];

	const toggleFaq = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section id="faq" className="py-16 sm:py-20 bg-slate-50">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
						Pertanyaan Umum
					</h2>
					<p className="text-lg text-slate-600">
						Jawaban untuk pertanyaan yang sering diajukan
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-150"
						>
							<button
								onClick={() => toggleFaq(index)}
								className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors duration-150"
							>
								<span className="font-semibold text-slate-900 pr-4">
									{faq.question}
								</span>
								<ChevronDown
									className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-150 ${
										openIndex === index ? "rotate-180" : ""
									}`}
								/>
							</button>
							{openIndex === index && (
								<div className="px-6 pb-4 pt-0">
									<p className="text-slate-600 leading-relaxed">
										{faq.answer}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
