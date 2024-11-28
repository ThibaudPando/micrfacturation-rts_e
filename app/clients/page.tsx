import { getClients } from "@/actions/client-action"

import { ClientDataTable } from "./client-data-table"
import { FormClient } from "./form-client"

export default async function ClientsPage() {
  const data = await getClients()
  return (
    <div className="flex w-full flex-col gap-4">
      <FormClient />
      <ClientDataTable data={data} />
    </div>
  )
}
