import {
	ArrowRight,
	Shield,
	Zap,
	MessageCircle,
	Sparkles,
	TrendingUp,
	CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/Button";
import { useInView } from "../hooks/useInView";

interface HeroProps {
	onJualClick: () => void;
	onLearnClick: () => void;
}

export function Hero({ onJualClick, onLearnClick }: HeroProps) {
	const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

	return (
		<section
			ref={ref}
			className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 sm:py-16 lg:py-20 overflow-hidden"
		>
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Gradient orbs */}
				<div className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
				<div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-teal-300 to-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
				<div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

				{/* Grid pattern */}
				<div className="absolute inset-0 bg-grid-pattern opacity-5" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Left content */}
					<div className="text-center lg:text-left space-y-6 sm:space-y-8">
						{/* Trust badge */}
						<div
							className={`inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-emerald-200 rounded-full shadow-sm transition-all duration-700 ${
								inView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
							<span className="text-sm font-semibold text-emerald-700">
								Terpercaya • Aman • Cepat
							</span>
						</div>

						{/* Main heading with emphasis */}
						<h1
							className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight transition-all duration-700 delay-100 ${
								inView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							Jual Gadget Bekas,{" "}
							<span className="relative inline-block">
								<span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient-x bg-300">
									Dapat Uang Cepat
								</span>
								<svg
									className="absolute -bottom-2 left-0 w-full"
									height="12"
									viewBox="0 0 200 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 10C45 4 145 4 198 10"
										stroke="url(#gradient)"
										strokeWidth="3"
										strokeLinecap="round"
										className="animate-draw-line"
									/>
									<defs>
										<linearGradient
											id="gradient"
											x1="0%"
											y1="0%"
											x2="100%"
											y2="0%"
										>
											<stop
												offset="0%"
												stopColor="#10b981"
											/>
											<stop
												offset="100%"
												stopColor="#14b8a6"
											/>
										</linearGradient>
									</defs>
								</svg>
							</span>
						</h1>

						{/* Value proposition */}
						<p
							className={`text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-700 delay-200 ${
								inView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							HP flagship, laptop gaming & PC 2020+ diterima.
							Proses 24-48 jam, harga terbaik dijamin!
						</p>

						{/* CTA Section - Most Important */}
						<div
							className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${
								inView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<Button
								onClick={onJualClick}
								size="lg"
								className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
							>
								<span className="relative z-10 flex items-center justify-center font-semibold">
									<TrendingUp className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
									Jual Sekarang
									<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
								</span>
								{/* Shine effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
							</Button>
							<Button
								onClick={onLearnClick}
								size="lg"
								variant="outline"
								className="border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 font-semibold"
							>
								Lihat Cara Kerja
							</Button>
						</div>

						{/* Social proof / Features */}
						<div
							className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 transition-all duration-700 delay-400 ${
								inView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							{[
								{
									icon: Shield,
									text: "100% Aman",
									color: "emerald",
								},
								{
									icon: Zap,
									text: "Proses 24-48 Jam",
									color: "amber",
								},
								{
									icon: MessageCircle,
									text: "Support WA",
									color: "blue",
								},
							].map((feature, index) => (
								<div
									key={index}
									className="flex items-center gap-3 justify-center lg:justify-start group hover:scale-105 transition-all duration-300 cursor-pointer"
								>
									<div
										className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-50 flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-${feature.color}-200 transition-all duration-300 group-hover:rotate-6`}
									>
										<feature.icon
											className={`w-6 h-6 text-${feature.color}-600`}
										/>
									</div>
									<span className="text-sm font-semibold text-slate-700">
										{feature.text}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Right side - 3D Device Preview (Mobile & Desktop) */}
					<div
						className={`relative transition-all duration-1000 ${
							inView
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-10"
						}`}
						style={{ transitionDelay: "500ms" }}
					>
						<div className="relative w-full max-w-md mx-auto perspective-1000">
							{/* Mobile Phone Mockup - 3D Style */}
							<div className="relative transform-3d animate-float-gentle">
								<div className="relative w-64 sm:w-72 mx-auto group cursor-pointer">
									{/* Phone Frame */}
									<div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-4 border-slate-700 transform hover:scale-105 transition-all duration-500 hover:rotate-y-6">
										{/* Screen */}
										<div className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] shadow-inner">
											{/* Status Bar */}
											<div className="absolute top-0 left-0 right-0 h-7 bg-black rounded-b-3xl flex items-center justify-between px-6 text-white text-xs">
												<span>9:41</span>
											</div>

											{/* App Preview Content */}
											<div className="p-4 sm:p-6 pt-10 sm:pt-12 space-y-3 sm:space-y-4">
												{/* Header */}
												<div className="flex items-center justify-between animate-fade-in">
													<div className="flex items-center gap-2">
														<div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
														<div className="space-y-1">
															<div className="h-2 w-16 bg-slate-200 rounded" />
															<div className="h-2 w-12 bg-slate-100 rounded" />
														</div>
													</div>
												</div>

												{/* Device Card */}
												<div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200 shadow-lg animate-scale-in animation-delay-300">
													<div className="flex items-center gap-3 mb-3">
														<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 shadow-lg" />
														<div className="flex-1 space-y-2">
															<div className="h-3 bg-slate-300 rounded w-3/4" />
															<div className="h-2 bg-slate-200 rounded w-1/2" />
														</div>
													</div>

													{/* Price Highlight */}
													<div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-3 text-white shadow-lg">
														<div className="text-xs opacity-90 mb-1">
															Estimasi Harga
														</div>
														<div className="text-xl font-bold flex items-center gap-2">
															Rp 12.500.000
															<CheckCircle2 className="w-5 h-5" />
														</div>
													</div>
												</div>

												{/* Info Cards */}
												<div className="grid grid-cols-2 gap-2 animate-fade-in animation-delay-600">
													{[
														{
															label: "Kondisi",
															value: "Mulus",
														},
														{
															label: "Tahun",
															value: "2023",
														},
													].map((item, i) => (
														<div
															key={i}
															className="bg-white rounded-lg p-2 border border-slate-200"
														>
															<div className="text-xs text-slate-500">
																{item.label}
															</div>
															<div className="text-sm font-semibold text-emerald-600">
																{item.value}
															</div>
														</div>
													))}
												</div>

												{/* CTA Button in Phone */}
												<button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in animation-delay-800 flex items-center justify-center gap-2">
													<TrendingUp className="w-4 h-4" />
													Terima Penawaran
													<ArrowRight className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>

									{/* 3D Shadow/Glow */}
									<div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[3rem] blur-3xl opacity-30 -z-10 transform translate-y-8 group-hover:opacity-50 transition-opacity duration-500" />
								</div>

								{/* Floating Elements */}
								<div className="absolute -top-6 -right-4 sm:-right-8 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce-slow border-2 border-emerald-100">
									<TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
								</div>
								<div className="absolute -bottom-4 -left-4 sm:-left-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-xl flex items-center justify-center animate-bounce-slow animation-delay-1000">
									<CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
								</div>

								{/* Sparkle Effects */}
								<div className="absolute top-1/4 right-4 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
								<div className="absolute bottom-1/3 left-4 w-2 h-2 bg-teal-400 rounded-full animate-ping animation-delay-700" />
								<div className="absolute top-1/2 -right-2 w-2 h-2 bg-amber-400 rounded-full animate-ping animation-delay-1400" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				/* Animations */
				@keyframes blob {
					0%, 100% { transform: translate(0px, 0px) scale(1); }
					33% { transform: translate(30px, -50px) scale(1.1); }
					66% { transform: translate(-20px, 20px) scale(0.9); }
				}

				@keyframes gradient-x {
					0%, 100% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
				}

				@keyframes float-gentle {
					0%, 100% { transform: translateY(0px) rotateY(2deg); }
					50% { transform: translateY(-15px) rotateY(-2deg); }
				}

				@keyframes bounce-slow {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-12px); }
				}

				@keyframes fade-in {
					from { opacity: 0; }
					to { opacity: 1; }
				}

				@keyframes scale-in {
					from { 
						opacity: 0;
						transform: scale(0.9);
					}
					to { 
						opacity: 1;
						transform: scale(1);
					}
				}

				@keyframes draw-line {
					from {
						stroke-dasharray: 200;
						stroke-dashoffset: 200;
					}
					to {
						stroke-dasharray: 200;
						stroke-dashoffset: 0;
					}
				}

				/* Animation classes */
				.animate-blob {
					animation: blob 7s infinite;
				}

				.animate-gradient-x {
					animation: gradient-x 3s ease infinite;
				}

				.animate-float-gentle {
					animation: float-gentle 6s ease-in-out infinite;
				}

				.animate-bounce-slow {
					animation: bounce-slow 3s ease-in-out infinite;
				}

				.animate-fade-in {
					animation: fade-in 0.6s ease forwards;
					opacity: 0;
				}

				.animate-scale-in {
					animation: scale-in 0.5s ease forwards;
					opacity: 0;
				}

				.animate-draw-line {
					animation: draw-line 1.5s ease forwards;
				}

				/* Delays */
				.animation-delay-200 { animation-delay: 200ms; }
				.animation-delay-300 { animation-delay: 300ms; }
				.animation-delay-600 { animation-delay: 600ms; }
				.animation-delay-700 { animation-delay: 700ms; }
				.animation-delay-800 { animation-delay: 800ms; }
				.animation-delay-1000 { animation-delay: 1000ms; }
				.animation-delay-1400 { animation-delay: 1400ms; }
				.animation-delay-2000 { animation-delay: 2s; }
				.animation-delay-4000 { animation-delay: 4s; }

				/* 3D Transforms */
				.perspective-1000 {
					perspective: 1000px;
				}

				.transform-3d {
					transform-style: preserve-3d;
				}

				.rotate-y-6 {
					transform: rotateY(6deg);
				}

				/* Utilities */
				.bg-300 {
					background-size: 300% auto;
				}

				.bg-grid-pattern {
					background-image: 
						linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
						linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
					background-size: 50px 50px;
				}

				/* Hover effects */
				.hover\\:rotate-y-6:hover {
					transform: rotateY(6deg);
				}
			`}</style>
		</section>
	);
}
