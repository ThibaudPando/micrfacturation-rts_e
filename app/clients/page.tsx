"use client";
import { ClientDataTable } from "./client-data-table";
import { FormClient } from "./form-client";

export default function ClientsPage() {
	return (
		<div className="flex w-full flex-col gap-4">
			<FormClient />
			<ClientDataTable />
		</div>
	);
}
