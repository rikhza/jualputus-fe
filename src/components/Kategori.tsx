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
			title: "HP Flagship",
			description:
				"iPhone, Samsung Galaxy S/Note, Xiaomi flagship series",
			requirement: "Minimal rilis tahun 2020",
		},
		{
			id: "laptop",
			icon: Laptop,
			title: "Laptop",
			description: "ASUS, Lenovo, MSI, Dell, HP gaming & profesional",
			requirement: "Minimal rilis tahun 2020",
		},
		{
			id: "komputer",
			icon: Monitor,
			title: "Komputer",
			description: "PC desktop gaming & workstation lengkap",
			requirement: "Minimal rilis tahun 2020",
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
						Kami menerima perangkat berkualitas tinggi keluaran 2020
						ke atas
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
									className="p-6 h-full"
								>
									<div className="flex flex-col h-full">
										<div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
											<Icon className="w-7 h-7 text-emerald-600" />
										</div>
										<h3 className="text-xl font-semibold text-slate-900 mb-2">
											{category.title}
										</h3>
										<p className="text-slate-600 mb-4 flex-grow">
											{category.description}
										</p>
										<div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
											<Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
											<span className="text-sm text-blue-700">
												{category.requirement}
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
