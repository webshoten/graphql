"use client";

import { Camera } from "lucide-react";
import { useState } from "react";
import { CaptureCamera } from "~/components/CaptureCamera";
import { Button } from "~/components/ui/button";

export default function Index() {
	const [showCamera, setShowCamera] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const handleCapture = (imageData: string) => {
		setCapturedImage(imageData);
		setShowCamera(false);
	};

	return (
		<>
			<div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-md">
				<div className="text-center">
					<h1 className="text-2xl font-bold">モバイルカメラデモ</h1>
					<p className="mt-2 text-gray-600">
						スマートフォンのカメラを使って写真を撮影できます
					</p>
				</div>

				<div className="flex flex-col items-center space-y-4">
					<Button
						onClick={() => setShowCamera(true)}
						className="flex items-center gap-2"
					>
						<Camera className="h-5 w-5" />
						カメラを開く
					</Button>
				</div>
			</div>

			{showCamera && (
				<CaptureCamera
					onCapture={handleCapture}
					onClose={() => setShowCamera(false)}
				/>
			)}
		</>
	);
}
