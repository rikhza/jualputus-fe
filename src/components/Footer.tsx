import { Mail, MapPin, Phone } from "lucide-react";
import logoImage from "../assets/logo.png";

export function Footer() {
	return (
		<footer className="bg-slate-900 text-slate-300 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					<div>
						<div className="flex items-center gap-3 mb-4">
							<img
								src={logoImage}
								alt="Jualputus Logo"
								className="w-8 h-8"
								width="32"
								height="32"
								loading="lazy"
							/>
							<span className="text-xl font-bold text-white font-roboto">
								Jualputus.com
							</span>
						</div>
						<p className="text-sm leading-relaxed">
							Platform terpercaya untuk jual putus gadget bekas
							Anda dengan proses cepat dan aman.
						</p>
					</div>

					<div>
						<h3 className="text-white font-semibold mb-4">
							Navigasi
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="#cara-kerja"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									Cara Kerja
								</a>
							</li>
							<li>
								<a
									href="#kategori"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									Kategori
								</a>
							</li>
							<li>
								<a
									href="#keamanan"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									Keamanan
								</a>
							</li>
							<li>
								<a
									href="#faq"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									FAQ
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-white font-semibold mb-4">Legal</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="#"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									Kebijakan Privasi
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									Syarat & Ketentuan
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-emerald-400 transition-colors duration-150"
								>
									Kebijakan Pengembalian
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-white font-semibold mb-4">
							Kontak
						</h3>
						<ul className="space-y-3 text-sm">
							<li className="flex items-start gap-2">
								<Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
								<span>0812-3456-7890</span>
							</li>
							<li className="flex items-start gap-2">
								<Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
								<span>info@jualputus.com</span>
							</li>
							<li className="flex items-start gap-2">
								<MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
								<span>Jakarta, Indonesia</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-slate-800 text-center text-sm">
					<p>
						&copy; {new Date().getFullYear()} Jualputus. Semua hak
						dilindungi.
					</p>
				</div>
			</div>
		</footer>
	);
}
