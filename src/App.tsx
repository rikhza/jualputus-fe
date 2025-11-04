import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CaraKerja } from "./components/CaraKerja";
import { Kategori } from "./components/Kategori";
import { Keamanan } from "./components/Keamanan";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { FloatingCTA } from "./components/FloatingCTA";

// Lazy load heavy components that are not immediately visible
// const SellForm = lazy(() => import("./components/SellForm"));
const SuccessScreen = lazy(() => import("./components/SuccessScreen"));
const SendPage = lazy(() => import("./components/SendPage"));
const SuksesPage = lazy(() => import("./components/SuksesPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

function App() {
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);
	const [ticketNumber, setTicketNumber] = useState("");

	const handleOpenForm = () => {
		window.open(
			"https://wa.me/87881129916?text=Hallo%20kak%2C%20Saya%20ingin%20menjual%20perangkat%20second%20saya%20boleh%20dibantu%20proses%20penjualan.%20Terimakasih",
			"_blank"
		);
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
		<Suspense
			fallback={
				<div className="min-h-screen bg-white flex items-center justify-center">
					<div className="text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
						<p className="mt-4 text-slate-600">Loading...</p>
					</div>
				</div>
			}
		>
			<Routes>
				{/* Main landing page */}
				<Route
					path="/"
					element={
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

							{/* Form temporarily disabled - redirects to WhatsApp */}
							{/* {isFormOpen && (
								<SellForm
									isOpen={isFormOpen}
									onClose={handleCloseForm}
									onSuccess={handleFormSuccess}
								/>
							)} */}

							{isSuccessOpen && (
								<SuccessScreen
									ticketNumber={ticketNumber}
									onClose={handleCloseSuccess}
								/>
							)}
						</div>
					}
				/>

				{/* Send page - handles WhatsApp API submission */}
				<Route path="/send/payloadwa" element={<SendPage />} />

				{/* Success page - only accessible from form submission */}
				<Route path="/sukses" element={<SuksesPage />} />

				{/* 404 Not Found */}
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
}

export default App;
