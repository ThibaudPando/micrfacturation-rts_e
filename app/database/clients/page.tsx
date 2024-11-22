"use client";
import { useBreadcrumbStore } from "@/hooks/stores";
import { ClientDataTable } from "./client-data-table";
import { FormClient } from "./form-client";

export default function ClientsPage() {
	const breadcrumb = useBreadcrumbStore();
	breadcrumb.breadcrumb[1] !== "Clients" &&
		breadcrumb.setBreadcrumb(["Database", "Clients"]);
	return (
		<div className="flex w-full flex-col gap-4">
			<FormClient />
			<ClientDataTable />
		</div>
	);
}
