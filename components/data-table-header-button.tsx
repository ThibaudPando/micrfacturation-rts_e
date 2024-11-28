import { ArrowUpDown } from "lucide-react"

import { Button } from "./ui/button"

export function DataTableHeaderButton(props: any) {
  return (
    <Button
      variant="ghost"
      onClick={() =>
        props.column.toggleSorting(props.column.getIsSorted() === "asc")
      }
    >
      {props.children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}
