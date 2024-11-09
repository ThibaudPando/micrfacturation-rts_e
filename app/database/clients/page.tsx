"use client";
import { useBreadcrumbStore } from "@/hooks/stores";

export default function ClientsPage() {
	const breadcrumb = useBreadcrumbStore();
	breadcrumb.breadcrumb[1] !== "Clients" &&
		breadcrumb.setBreadcrumb(["Database", "Clients"]);
	return <div className="flex-1">
		
		</div>
	);
}
