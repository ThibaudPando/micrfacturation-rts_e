"use client";

import { useBreadcrumbStore } from "@/hooks/stores";

export default function IndexPage() {
	const breadcrumb = useBreadcrumbStore();
	breadcrumb.breadcrumb[0] !== "Accueil" &&
		breadcrumb.setBreadcrumb(["Accueil"]);
	return <div>Main</div>;
}
