import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "./ui/Button";

/**
 * NotFoundPage - 404 Error page
 * Route: /404 or catch-all route
 */
export function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
			<div className="text-center max-w-md">
				{/* Error Icon */}
				<div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
					<AlertCircle className="w-14 h-14 text-red-600" />
				</div>

				{/* 404 Text */}
				<h1 className="text-6xl font-bold text-slate-900 mb-3">404</h1>

				{/* Title */}
				<h2 className="text-2xl font-semibold text-slate-800 mb-3">
					Halaman Tidak Ditemukan
				</h2>

				{/* Description */}
				<p className="text-slate-600 mb-8">
					Maaf, halaman yang Anda cari tidak ada atau telah
					dipindahkan.
				</p>

				{/* Action Buttons */}
				<div className="space-y-3">
					<Button
						onClick={() => navigate("/")}
						className="w-full sm:w-auto"
					>
						<Home className="w-4 h-4 mr-2" />
						Kembali ke Beranda
					</Button>

					<Button
						variant="outline"
						onClick={() => navigate(-1)}
						className="w-full sm:w-auto ml-0 sm:ml-3"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Halaman Sebelumnya
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NotFoundPage;
