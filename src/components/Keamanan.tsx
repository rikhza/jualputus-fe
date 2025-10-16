import { ShieldCheck, Eraser, Clock, CreditCard } from "lucide-react";
import { useInView } from "../hooks/useInView";

export function Keamanan() {
	const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

	const features = [
		{
			icon: ShieldCheck,
			title: "Amanah",
			description:
				"Kami memberikan penawaran harga tinggi yang sesuai dengan kondisi perangkat",
		},
		{
			icon: Eraser,
			title: "Penghapusan Data",
			description:
				"Kami menjamin data pada perangkat yang telah dijual terhapus dengan aman",
		},
		{
			icon: Clock,
			title: "Proses 30 Menit",
			description:
				"Tim kami akan menghubungi Anda secepatnya setelah isi form",
		},
		{
			icon: CreditCard,
			title: "Transfer Instan",
			description:
				"Pembayaran ditransfer langsung setelah verifikasi perangkat selesai",
		},
	];

	return (
		<section
			id="keamanan"
			ref={ref}
			className="py-16 sm:py-20 bg-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					className={`text-center mb-12 transition-all duration-700 ${
						inView
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
						Keamanan & Kecepatan
					</h2>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Transaksi aman dengan proses yang cepat dan transparan
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className={`text-center transition-all duration-700 ${
									inView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
								style={{ transitionDelay: `${index * 150}ms` }}
							>
								<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 mb-4 transition-all duration-300 hover:bg-emerald-200 hover:scale-110 hover:shadow-lg">
									<Icon className="w-8 h-8 text-emerald-600" />
								</div>
								<h3 className="text-lg font-semibold text-slate-900 mb-2">
									{feature.title}
								</h3>
								<p className="text-slate-600">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>

				<div
					className={`mt-12 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-100 transition-all duration-700 ${
						inView
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-10"
					}`}
					style={{ transitionDelay: "600ms" }}
				>
					<div className="flex items-start gap-4">
						<ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
						<div>
							<h3 className="text-xl font-semibold text-slate-900 mb-2">
								Jaminan Privasi Data
							</h3>
							<p className="text-slate-700 leading-relaxed">
								Kami sangat menghargai privasi Anda. Semua data
								pribadi yang Anda berikan hanya digunakan untuk
								proses transaksi dan tidak akan dibagikan kepada
								pihak ketiga tanpa izin Anda.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
