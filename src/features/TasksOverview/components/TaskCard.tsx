import { Calendar, Pencil } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TaskModal } from "./index"

import { COLOR } from "@/constants"

import { Task } from "@/types/index"

import { TIME } from "@/utils/index"

const { statusColors, priorityColors } = COLOR

export default function TaskCard({ tasks, setEditTask, editTask }: { tasks: Task[]; setEditTask: (task: Task | null) => void; editTask: Task | null }) {

    return (
        <div className="grid grid-cols-3 gap-3 mt-4">
            {Object.keys(statusColors).map((key) => (
                <div key={key}>

                    <div className={`flex items-center gap-1`}>
                        <div className={`h-2 w-2 rounded-full ${statusColors[Number(key)].bg}`}></div>
                        <span className={`${statusColors[Number(key)].text}`}>{statusColors[Number(key)].label}</span>
                    </div>

                    <div>
                        {tasks
                            .filter((task) => task.status === Number(key))
                            .map((task) => (
                                <Card className="w-full my-4" key={task.id}>
                                    <CardHeader className='flex items-center justify-between'>
                                        <CardTitle className="w-lg">{task.title}</CardTitle>
                                        <TaskModal
                                            btnAction={
                                                <Pencil className="h-4 w-4 text-muted-foreground hover:text-foreground" onClick={() => setEditTask(task)}/>
                                            }
                                            editTask={editTask}
                                            setEditTask={setEditTask}
                                        />
                                    </CardHeader>
                                    <CardContent className="flex items-center gap-4">
                                        <Badge className={`${priorityColors[task.priority].bgTransparent} ${priorityColors[task.priority].text}`}>
                                            {priorityColors[task.priority].label}
                                        </Badge>
                                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {TIME.parseDate(task.due_date)}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex items-center gap-2">
                                        <div>
                                        <Avatar className="flex items-center">
                                            <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                            className="grayscale"
                                            />
                                            <div className="flex flex-col mx-3">
                                            <span>{task?.assignee_info?.name}</span>
                                            <span className="text-xs text-muted-foreground">{task?.assignee_info?.email}</span>
                                            </div>
                                        </Avatar>
                                        </div>
                                    </CardFooter>
                                </Card>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}