import { useState, lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CaraKerja } from "./components/CaraKerja";
import { Kategori } from "./components/Kategori";
import { Keamanan } from "./components/Keamanan";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { FloatingCTA } from "./components/FloatingCTA";

// Lazy load heavy components that are not immediately visible
const SellForm = lazy(() => import("./components/SellForm"));
const SuccessScreen = lazy(() => import("./components/SuccessScreen"));

function App() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);
	const [ticketNumber, setTicketNumber] = useState("");

	const handleOpenForm = () => {
		setIsFormOpen(true);
		document.body.style.overflow = "hidden";
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
		document.body.style.overflow = "auto";
	};

	const handleFormSuccess = (ticket: string) => {
		setTicketNumber(ticket);
		setIsFormOpen(false);
		setIsSuccessOpen(true);
	};

	const handleCloseSuccess = () => {
		setIsSuccessOpen(false);
		document.body.style.overflow = "auto";
	};

	const handleSelectCategory = () => {
		handleOpenForm();
	};

	const scrollToCaraKerja = () => {
		const element = document.getElementById("cara-kerja");
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<Navbar onJualClick={handleOpenForm} />
			<Hero
				onJualClick={handleOpenForm}
				onLearnClick={scrollToCaraKerja}
			/>
			<CaraKerja />
			<Kategori onSelectCategory={handleSelectCategory} />
			<Keamanan />
			<FAQ />
			<Footer />
			<FloatingCTA onClick={handleOpenForm} />

			<Suspense fallback={<div className="sr-only">Loading...</div>}>
				{isFormOpen && (
					<SellForm
						isOpen={isFormOpen}
						onClose={handleCloseForm}
						onSuccess={handleFormSuccess}
					/>
				)}

				{isSuccessOpen && (
					<SuccessScreen
						ticketNumber={ticketNumber}
						onClose={handleCloseSuccess}
					/>
				)}
			</Suspense>
		</div>
	);
}

export default App;
