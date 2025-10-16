import { Plus, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";

interface FloatingCTAProps {
	onClick: () => void;
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			// Hide button when scrolling down, show when scrolling up
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false);
				setIsExpanded(false);
			} else {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		// Auto-expand on first load to catch attention
		const timer = setTimeout(() => {
			setIsExpanded(true);
			setTimeout(() => setIsExpanded(false), 3000);
		}, 1000);

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			clearTimeout(timer);
		};
	}, [lastScrollY]);

	return (
		<div
			className={`fixed bottom-6 right-4 z-40 md:hidden transition-all duration-300 ${
				isVisible
					? "translate-y-0 opacity-100"
					: "translate-y-24 opacity-0"
			}`}
		>
			<Button
				onClick={onClick}
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
				onTouchStart={() => setIsExpanded(true)}
				size="lg"
				className={`
          group relative overflow-hidden
          bg-gradient-to-r from-emerald-600 to-emerald-500
          hover:from-emerald-500 hover:to-emerald-600
          shadow-2xl hover:shadow-emerald-500/50
          transition-all duration-300
          ${
				isExpanded
					? "rounded-full px-6 py-4"
					: "rounded-full w-16 h-16 p-0"
			}
          flex items-center justify-center gap-2
          active:scale-95
          touch-manipulation
        `}
				style={{ minHeight: "48px", minWidth: "48px" }}
			>
				<span className="relative z-10 flex items-center gap-2 font-semibold text-white">
					{isExpanded ? (
						<>
							<TrendingUp className="w-5 h-5 animate-bounce" />
							<span className="whitespace-nowrap text-sm">
								Jual Sekarang
							</span>
						</>
					) : (
						<Plus className="w-7 h-7" />
					)}
				</span>

				{/* Ripple effect background */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

				{/* Pulsing ring */}
				<div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
			</Button>

			{/* Tooltip hint */}
			{!isExpanded && (
				<div className="absolute -top-12 right-0 bg-slate-900 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-xl">
					Jual Gadget Anda
					<div className="absolute bottom-[-4px] right-6 w-2 h-2 bg-slate-900 rotate-45" />
				</div>
			)}
		</div>
	);
}
