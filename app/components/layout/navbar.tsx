import { Link, useLocation } from "@remix-run/react";
import { Camera, FolderOpen } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
	const location = useLocation();

	return (
		<div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background">
			<div className="flex h-16 items-center justify-around">
				<Link to="/">
					<Button
						variant={location.pathname === "/" ? "default" : "ghost"}
						size="lg"
						className="flex flex-col items-center gap-1 h-auto py-2"
					>
						<Camera className="h-5 w-5" />
						<span className="text-xs">撮影</span>
					</Button>
				</Link>
				<Link to="/folders">
					<Button
						variant={
							location.pathname.startsWith("/folders") ? "default" : "ghost"
						}
						size="lg"
						className="flex flex-col items-center gap-1 h-auto py-2"
					>
						<FolderOpen className="h-5 w-5" />
						<span className="text-xs">フォルダ</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
