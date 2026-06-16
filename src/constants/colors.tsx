
import { Task } from "@/types/task"

interface colorProps {
    bg?: string;
    label: string;
    text: string;
    bgTransparent?: string;
    value: string
}

type ColorsName = "gray" | "yellow" | "green" | "blue" | "red" | "purple"

export const objColors: Record<ColorsName, { bg: string; text: string; bgTransparent: string }> = {
    'gray': { bg: "bg-gray-500", text: "text-gray-500", bgTransparent: "bg-gray-500/30" },
    'yellow': { bg: "bg-yellow-500", text: "text-yellow-500", bgTransparent: "bg-yellow-500/30" },
    'green': { bg: "bg-green-700", text: "text-green-700", bgTransparent: "bg-green-700/30" },
    'blue': { bg: "bg-blue-500", text: "text-blue-500", bgTransparent: "bg-blue-500/30" },
    'red': { bg: "bg-red-500", text: "text-red-500", bgTransparent: "bg-red-500/30" },
    'purple': { bg: "bg-purple-500", text: "text-purple-500", bgTransparent: "bg-purple-500/30" },
}

export const statusColors: Record<Task["status"], colorProps> = {
    0: { ...objColors.gray, label: "To Do", value: '0' },
    1: { ...objColors.yellow, label: "In Progress", value: '1' },
    2: { ...objColors.green, label: "Done", value: '2' },
}

export const priorityColors: Record<Task['priority'], colorProps> = {
    3: { ...objColors.blue, label: "Low", value: '3' },
    2: { ...objColors.yellow, label: "Medium", value: '2' },
    1: { ...objColors.red, label: "High", value: '1' },
}