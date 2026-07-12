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
// import { Spinner } from "@/components/ui/spinner"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@/components/ui/combobox"
import FormWrapper from "@/components/ui/formWrapper"

import { COLOR } from "@/constants"

import { Task, TaskFormInput } from "@/types"

import { TIME } from '@/utils'
import { createTask, updateTask } from "@/hooks/tasks"
import { TEAM } from "@/hooks"

const { priorityColors } = COLOR

function TaskModalForm({ editTask, setEditTask }: { editTask: Task | null; setEditTask: (task: Task | null) => void }) {

    const { assignee_id, priority, status, start_date, due_date, title } = editTask || {}

    const assigneeStr = assignee_id?.toString() || ''
    const priorityStr = priority?.toString() || '3'
    const statusStr = status?.toString() || '0'
    const startDate = TIME.parseDateStandard(start_date)
    const dueDate = TIME.parseDateStandard(due_date)

    const { register, control, handleSubmit, reset } = useForm<TaskFormInput>({
        defaultValues: {
            title: title || "",
            assignee_id: assigneeStr,
            priority: priorityStr,
            start_date: startDate,
            due_date: dueDate,
        },
    })

    const handleReset = () => {
        reset({
            title: "",
            assignee_id: "",
            priority: "0",
            status: '',
            start_date: undefined,
            due_date: undefined,
        })
    }

    const { data: { data: teamsData } = { data: [] } } = TEAM.getTeams({ id: assignee_id });

    React.useEffect(() => {
        if (editTask) {
            reset({
                title: title,
                assignee_id: assigneeStr,
                priority: priorityStr,
                status: statusStr,
                start_date: startDate,
                due_date: dueDate,
            })
        } else {
            handleReset()
        }
    }, [editTask, reset])

    const createTaskMutation = createTask()
    const updateTaskMutation = updateTask() 
    const onSubmit = (data: TaskFormInput) => {
        console.log("Form data:", data)
        // if (editTask && editTask.id) {
        //     updateTaskMutation.mutate({ id: editTask.id, updatedTask: data }, {
        //         onSuccess: (updatedTask) => {
        //             handleReset()
        //             setEditTask(null)
        //         },
        //         onError: (error) => {
        //             console.error("Error updating task:", error)
        //         },
        //     })
        // } else {
        //     createTaskMutation.mutate(data, {
        //         onSuccess: (newTask) => {
        //             handleReset()
        //             setEditTask(null)
        //         },
        //         onError: (error) => {
        //             console.error("Error creating task:", error)
        //         },
        //     })
        // }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="task-form">
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
                    <FormWrapper label="Assignee" id="assignee_id" icon={<UserRound className="w-3 h-3" />}>
                        <Controller
                            control={control}
                            name="assignee_id"
                            render={({ field }) => {
                                const items = teamsData?.map((team: any) => ({ 
                                    label: team.name, 
                                    value: team.id.toString() 
                                })) || [];

                                const selectedItem = items.find((item: any) => item.value === field.value);

                                return (
                                    <Combobox 
                                        value={field.value} 
                                        onValueChange={field.onChange}
                                        items={items}
                                    >
                                        <ComboboxInput 
                                            value={selectedItem ? selectedItem.label : ""} 
                                            placeholder="Select assignee" 
                                        />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                );
                            }}
                        />
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
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                            handleReset();
                            setEditTask(null);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" form="task-form">
                    {editTask ? "Update Task" : "Create Task"}
                </Button>
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
