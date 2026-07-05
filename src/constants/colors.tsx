
import { Task } from "@/types/task"

interface colorProps {
    bg?: string;
    label: string;
    text: string;
    bgTransparent?: string;
    value: string,
    cssColor: string
}

type ColorsName = "gray" | "yellow" | "green" | "blue" | "red" | "purple"

export const objColors: Record<ColorsName, { bg: string; text: string; bgTransparent: string; cssColor: string }> = {
    'gray': { bg: "bg-gray-500", text: "text-gray-500", bgTransparent: "bg-gray-500/30", cssColor: "rgba(107, 114, 128, 0.3)" },
    'yellow': { bg: "bg-yellow-500", text: "text-yellow-500", bgTransparent: "bg-yellow-500/30", cssColor: "rgba(234, 179, 8, 0.3)" },
    'green': { bg: "bg-green-700", text: "text-green-700", bgTransparent: "bg-green-700/30", cssColor: "rgba(21, 128, 61, 0.3)" },
    'blue': { bg: "bg-blue-500", text: "text-blue-500", bgTransparent: "bg-blue-500/30", cssColor: "rgba(59, 130, 246, 0.3)" },
    'red': { bg: "bg-red-500", text: "text-red-500", bgTransparent: "bg-red-500/30", cssColor: "rgba(239, 68, 68, 0.3)" },
    'purple': { bg: "bg-purple-500", text: "text-purple-500", bgTransparent: "bg-purple-500/30", cssColor: "rgba(168, 85, 247, 0.3)" },
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