import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import logoImage from "../assets/logo.png";

interface NavbarProps {
	onJualClick: () => void;
}

export function Navbar({ onJualClick }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
			setIsOpen(false);
		}
	};

	return (
		<nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center gap-3">
						<img
							src={logoImage}
							alt="Jualputus Logo"
							className="w-10 h-10"
							width="40"
							height="40"
							loading="eager"
						/>
						<span className="text-xl font-bold text-slate-900 font-roboto">
							JualPutus
						</span>
					</div>

					<div className="hidden md:flex items-center gap-8">
						<button
							onClick={() => scrollToSection("cara-kerja")}
							className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-150"
						>
							Cara Kerja
						</button>
						<button
							onClick={() => scrollToSection("kategori")}
							className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-150"
						>
							Kategori
						</button>
						<button
							onClick={() => scrollToSection("keamanan")}
							className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-150"
						>
							Keamanan
						</button>
						<button
							onClick={() => scrollToSection("faq")}
							className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-150"
						>
							FAQ
						</button>
						<Button onClick={onJualClick} size="sm">
							Jual Sekarang
						</Button>
					</div>

					<button
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden p-3 rounded-lg hover:bg-slate-100 transition-colors duration-150 active:scale-95 touch-manipulation"
						aria-label="Toggle menu"
						style={{ minWidth: "44px", minHeight: "44px" }}
					>
						{isOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden border-t border-slate-200 bg-white shadow-lg">
					<div className="px-4 py-4 space-y-2">
						<button
							onClick={() => scrollToSection("cara-kerja")}
							className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors duration-150 font-medium active:scale-98 touch-manipulation"
							style={{ minHeight: "48px" }}
						>
							Cara Kerja
						</button>
						<button
							onClick={() => scrollToSection("kategori")}
							className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors duration-150 font-medium active:scale-98 touch-manipulation"
							style={{ minHeight: "48px" }}
						>
							Kategori
						</button>
						<button
							onClick={() => scrollToSection("keamanan")}
							className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors duration-150 font-medium active:scale-98 touch-manipulation"
							style={{ minHeight: "48px" }}
						>
							Keamanan
						</button>
						<button
							onClick={() => scrollToSection("faq")}
							className="block w-full text-left px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors duration-150 font-medium active:scale-98 touch-manipulation"
							style={{ minHeight: "48px" }}
						>
							FAQ
						</button>
						<div className="pt-2">
							<Button
								onClick={onJualClick}
								className="w-full"
								size="lg"
							>
								Jual Sekarang
							</Button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
