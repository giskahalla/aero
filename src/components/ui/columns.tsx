"use client"

import { ArrowUpDown } from "lucide-react"
import { type ColumnDef } from "@tanstack/react-table"

import { Button } from "./button"

import { ColumnConfig } from "@/types"

const ColumnHeader = ({ column, title, disabled }: { column: any; title: string, disabled?: Boolean }) => {
    if(disabled) {
        return <span>{title}</span>
    }
    return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {title}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
}

export function genericColumns<TData extends Record<string, any>>(
  configs: ColumnConfig[]
): ColumnDef<TData>[] {
  return configs.map((config) => {
    switch (config.type) {

    //   case "select":
    //     return {
    //       id: config.id || "select",
    //       header: ({ table }) => (
    //         <Checkbox
    //           checked={
    //             table.getIsAllPageRowsSelected() ||
    //             (table.getIsSomePageRowsSelected() && "indeterminate")
    //           }
    //           onCheckedChange={(value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value)}
    //           aria-label="Select all"
    //           className="translate-y-[2px]"
    //         />
    //       ),
    //       cell: ({ row }) => (
    //         <Checkbox
    //           checked={row.getIsSelected()}
    //           onCheckedChange={(value: boolean | "indeterminate") => row.toggleSelected(!!value)}
    //           aria-label="Select row"
    //           className="translate-y-[2px]"
    //         />
    //       ),
    //       enableSorting: false,
    //       enableHiding: false,
    //     }

      case "text":
        return {
          accessorKey: config.accessorKey,
          header: ({ column }) => (
            <ColumnHeader column={column} title={config.title || ""} disabled={!config.enableSorting}/>
          ),
          cell: ({ row }) => (
            <div className="font-medium">
              {row.getValue(config.accessorKey || "")}
            </div>
          ),
          enableSorting: config.enableSorting ?? true,
          enableHiding: config.enableHiding ?? true,
        }

      case "badge":
        return {
          accessorKey: config.accessorKey,
          header: ({ column }) => (
            <ColumnHeader column={column} title={config.title || ""} disabled={!config.enableSorting}/>
          ),
          cell: ({ row }) => {
            const rawValue = row.getValue(config.accessorKey || "")
            const target = config.options?.find((opt) => opt.value === rawValue)

            if (!target) return null

            return (
              <div className="flex items-center gap-2">
                {/* {target.icon && (
                  <target.icon className="size-4 text-muted-foreground" />
                )} */}
                <span className={target.text}>{target.label}</span>
              </div>
            )
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
          },
          enableSorting: config.enableSorting ?? true,
          enableHiding: config.enableHiding ?? true,
        }

      case "actions":
        return {
          id: config.id || "actions",
        }

      default:
        return {
          id: config.id || "unknown",
        }
    }
  }) as ColumnDef<TData>[]
}