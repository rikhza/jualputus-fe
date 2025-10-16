import { Package, Upload, DollarSign, Truck } from "lucide-react";
import { useInView } from "../hooks/useInView";

export function CaraKerja() {
	const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

	const steps = [
		{
			icon: Package,
			title: "Pilih Barang",
			description:
				"Pilih kategori, merek, dan model gadget yang ingin dijual",
		},
		{
			icon: Upload,
			title: "Upload & Isi Detail",
			description:
				"Upload foto perangkat dan isi informasi kondisi lengkap",
		},
		{
			icon: DollarSign,
			title: "Dapat Penawaran",
			description: "Tim kami akan menghubungi dengan penawaran terbaik",
		},
		{
			icon: Truck,
			title: "Jadwalkan Pickup",
			description:
				"Atur jadwal pickup atau antar langsung ke alamat Anda",
		},
	];

	return (
		<section
			id="cara-kerja"
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
						Cara Kerja
					</h2>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Proses Jual Dengan Mudah dalam 4 Langkah
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step, index) => {
						const Icon = step.icon;
						return (
							<div
								key={index}
								className={`relative transition-all duration-700 ${
									inView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
								style={{ transitionDelay: `${index * 150}ms` }}
							>
								<div className="flex flex-col items-center text-center group">
									<div className="relative mb-6 transform transition-transform duration-300 group-hover:scale-110">
										<div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-emerald-200">
											<Icon className="w-10 h-10 text-emerald-600" />
										</div>
										<div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
											{index + 1}
										</div>
									</div>
									<h3 className="text-xl font-semibold text-slate-900 mb-2">
										{step.title}
									</h3>
									<p className="text-slate-600">
										{step.description}
									</p>
								</div>

								{index < steps.length - 1 && (
									<div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-300 to-transparent"></div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
