import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Plus, Tag, Flag, UserRound, CalendarClock, CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/datePicker"
import FormWrapper from "@/components/ui/formWrapper"

import { COLOR } from "@/constants"

import { Task, TaskFormInput } from "@/types"

import { TIME } from '@/utils'

const { priorityColors } = COLOR

function TaskModalForm({ editTask, setEditTask }: { editTask: Task | null; setEditTask: (task: Task | null) => void }) {

    const { assignee, priority, status, start_date, due_date, title } = editTask || {}

    const assigneeStr = assignee?.toString() || ''
    const priorityStr = priority?.toString() || '3'
    const statusStr = status?.toString() || '0'
    const startDate = TIME.parseDateStandard(start_date)
    const dueDate = TIME.parseDateStandard(due_date)

    const { register, control, handleSubmit, reset } = useForm<TaskFormInput>({
        defaultValues: {
            title: title || "",
            assignee: assigneeStr,
            priority: priorityStr,
            start_date: startDate,
            due_date: dueDate,
        },
    })

    const handleReset = () => {
        reset({
            title: "",
            assignee: "",
            priority: "0",
            status: '',
            start_date: undefined,
            due_date: undefined,
        })
    }

    React.useEffect(() => {
        if (editTask) {
            reset({
                title: title,
                assignee: assigneeStr,
                priority: priorityStr,
                status: statusStr,
                start_date: startDate,
                due_date: dueDate,
            })
        } else {
            handleReset()
        }
    }, [editTask, reset])

    const onSubmit = (data: TaskFormInput) => {
        console.log("Data Form:", data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent className="lg:max-w-lg" onInteractOutside={(e) => e.preventDefault()} showCloseButton={false}>

            <DialogHeader>
                <DialogTitle className='flex items-center gap-2'> 
                    <Plus /> New Task
                </DialogTitle>
            </DialogHeader>

            <FieldGroup>
                <FormWrapper label="Title" id="title" icon={<Tag className="w-3 h-3" />}>
                    <Input id="title" {...register("title")} />
                </FormWrapper>

                <div className="grid grid-cols-2 gap-4">
                    <FormWrapper label="Assignee" id="assignee" icon={<UserRound className="w-3 h-3" />}>
                        <Input id="assignee" {...register("assignee")} />
                    </FormWrapper>
                    <FormWrapper label="Priority" id="priority" icon={<Flag className="w-3 h-3" />}>
                        <Controller
                                control={control}
                                name="priority"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(priorityColors).map(pc => (
                                                <SelectItem key={pc.value} value={pc.value}>
                                                    {pc.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                    </FormWrapper>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormWrapper label="Start Date" id="start_date" icon={<CalendarDays className="w-3 h-3" />}>
                        <Controller
                            control={control}
                            name="start_date"
                            render={({ field }) => (
                                <DatePicker value={field.value} onChange={field.onChange} />
                            )}
                        />
                    </FormWrapper>
                    <FormWrapper label="Due Date" id="due_date" icon={<CalendarClock className="w-3 h-3" />}>
                        <Controller
                            control={control}
                            name="due_date"
                            render={({ field }) => (
                                <DatePicker value={field.value} onChange={field.onChange} />
                            )}
                        />
                    </FormWrapper>
                </div>
            </FieldGroup>

            <DialogFooter>
                <DialogClose asChild onClick={() => handleReset()}>
                    <Button variant="outline" onClick={() => setEditTask(null)}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit">Create Task</Button>
            </DialogFooter>
            </DialogContent>
        </form>
    )
}

export default function TaskModal({ editTask, setEditTask, btnAction }: { editTask: Task | null; setEditTask: (task: Task | null) => void, btnAction: React.ReactElement })  {

    return ( 
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">     
                {btnAction}
            </DialogTrigger>

            <TaskModalForm editTask={editTask} setEditTask={setEditTask} />
        </Dialog>
    )

}
