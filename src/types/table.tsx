



export type ColumnType = "select" | "text" | "badge" | "statusOrPriority" | "actions"

export interface ColumnConfig {
  id?: string
  accessorKey?: string
  title?: string
  type: ColumnType
  options?: { value: string; label: string; text?: string; icon?: React.ComponentType<{ className?: string }> }[]
  enableSorting?: boolean
  enableHiding?: boolean
}