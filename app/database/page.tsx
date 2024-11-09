"use client";

import { useBreadcrumbStore } from "@/hooks/stores";

export default function DatabasePage() {
	const breadcrumb = useBreadcrumbStore();
	breadcrumb.breadcrumb[0] !== "Base de données" &&
		breadcrumb.setBreadcrumb(["Base de données"]);
	return <div>Main</div>;
}
