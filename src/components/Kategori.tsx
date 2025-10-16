import { Smartphone, Laptop, Monitor, Info } from "lucide-react";
import { Card } from "./ui/Card";
import { useInView } from "../hooks/useInView";

interface KategoriProps {
	onSelectCategory: (category: string) => void;
}

export function Kategori({ onSelectCategory }: KategoriProps) {
	const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

	const categories = [
		{
			id: "hp_flagship",
			icon: Smartphone,
			title: "HP Android & iPhone",
			description: "Semua Merek & Tipe",
			subtitle: "Android, iPhone, Samsung, Xiaomi, dll",
			requirement: "Minimal rilis tahun 2020",
			gradient: "from-emerald-500 to-teal-600",
			bgColor: "bg-emerald-50",
			iconColor: "text-emerald-600",
		},
		{
			id: "laptop",
			icon: Laptop,
			title: "Laptop",
			description: "Semua Merek & Tipe",
			subtitle: "ASUS, Lenovo, MacBook, Dell, HP, dll",
			requirement: "Minimal rilis tahun 2020",
			gradient: "from-blue-500 to-indigo-600",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
		},
		{
			id: "komputer",
			icon: Monitor,
			title: "Komputer",
			description: "Semua Merek & Tipe",
			subtitle: "PC Desktop, Gaming, Workstation",
			requirement: "Minimal rilis tahun 2020",
			gradient: "from-purple-500 to-pink-600",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
		},
	];

	return (
		<section
			id="kategori"
			ref={ref}
			className="py-16 sm:py-20 bg-slate-50 overflow-hidden"
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
						Kategori yang Diterima
					</h2>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">
						Kami Menerima Semua Merek dan kondisi dengan Harga
						Penawaran Tinggi
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{categories.map((category, index) => {
						const Icon = category.icon;
						return (
							<div
								key={category.id}
								className={`transition-all duration-700 ${
									inView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
								style={{ transitionDelay: `${index * 150}ms` }}
							>
								<Card
									hover
									onClick={() =>
										onSelectCategory(category.id)
									}
									className="relative p-6 h-full overflow-hidden group cursor-pointer border-2 border-transparent hover:border-emerald-500 transition-all duration-300"
								>
									{/* Gradient overlay on hover */}
									<div
										className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
									/>

									<div className="relative flex flex-col h-full">
										{/* Icon with background */}
										<div
											className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
										>
											<Icon
												className={`w-8 h-8 ${category.iconColor} transition-transform duration-300 group-hover:rotate-12`}
											/>
										</div>

										{/* Title */}
										<h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
											{category.title}
										</h3>

										{/* Description */}
										<p className="text-sm font-semibold text-slate-700 mb-1">
											{category.description}
										</p>
										<p className="text-xs text-slate-500 mb-5 flex-grow">
											{category.subtitle}
										</p>

										{/* Requirement badge */}
										<div className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
											<Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
											<span className="text-xs font-medium text-blue-700 leading-relaxed">
												{category.requirement}
											</span>
										</div>

										{/* Call to action hint */}
										<div className="mt-4 text-center">
											<span className="text-sm font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												Klik untuk jual →
											</span>
										</div>
									</div>
								</Card>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
