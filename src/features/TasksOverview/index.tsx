'use client'

import React from "react"
import { Plus, Calendar, Menu, Kanban, SearchIcon } from "lucide-react"
import { parseISO, getMonth, getYear } from "date-fns"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Field } from "@/components/ui/field"
import { MonthYearPicker } from "@/components/ui/datePicker"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox"
import { HeaderLayout } from "@/components/index"
import { TaskCard, TaskCalendar, TaskList, TaskModal } from "./components"

import { Task } from "@/types/index"

import { COLOR } from "@/constants"

export function TasksOverview({ tasks }: { tasks: Task[] }) {

    const [date, setDate] = React.useState<Date>(new Date())
    const [viewType, setViewType] = React.useState<"card" | 'list' | "calendar">("card")
    const [editTask, setEditTask] = React.useState<Task | null>(null)
    const [filter, setFilter] = React.useState({ search: '', priority: 'all' })

   const filteredTasks = tasks.filter((task) => {
        if (!task?.due_date) return false;
            
        const taskDate = parseISO(task.due_date);
        const matchMonth = getMonth(taskDate) === getMonth(date);
        const matchYear = getYear(taskDate) === getYear(date);
        
        if (!matchMonth || !matchYear) return false;

        const keyword = filter.search?.toLowerCase();
        const matchSearch = !filter.search || task.title.toLowerCase().includes(keyword);

        const matchPriority = filter.priority === 'all' ? true : String(task.priority) === String(filter.priority);

        return matchSearch && matchPriority;
    });

    const eachStatusCount = filteredTasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
    }, {} as Record<number, number>)


    const basePriorityOptions = Object.values(COLOR.priorityColors)

    const priorityOptions = [
        { label: "All Priority", value: 'all' },
        ...basePriorityOptions
    ]

    const renderView = () => {
        switch(viewType){
            case 'card':
                return <TaskCard tasks={filteredTasks} setEditTask={setEditTask} editTask={editTask} />
            case 'list':
                return <TaskList tasks={filteredTasks} setEditTask={setEditTask} editTask={editTask} />
            case 'calendar':
                return <TaskCalendar />
        }
    }

    const FilterSelect = ({ items }: { items: any[] }) => {
        return(
            <Combobox
                items={items}
                value={items.find(item => String(item.value) === filter.priority)?.label || ""}
                onValueChange={(value) => {
                    setFilter((prev) => ({ ...prev, priority: String(value) }));
                }}
            >
                <ComboboxInput placeholder="Select Priority" />
                <ComboboxContent className='w-10'>
                    <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.value} value={String(item.value)}>
                        {item.label}
                        </ComboboxItem>
                    )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
    )}

    return (
        <>
            <HeaderLayout>
                <div>
                    <h5 className="text-xl font-bold">Tasks Overview</h5>
                    <p className="text-sm text-muted-foreground">
                        {filteredTasks.length} Tasks · {eachStatusCount[0] || 0} To Do · {eachStatusCount[1] || 0} In Progress · {eachStatusCount[2] || 0} Done
                    </p>
                </div>
                
                <div className="w-xl flex gap-2 items-end justify-end text-sm text-muted-foreground">
                    <Tabs defaultValue="card" onValueChange={(value) => setViewType(value as "card" | "calendar")} className="w-xl">
                        <TabsList className="w-full justify-end">
                            <TabsTrigger value="card"><Kanban className="h-3 w-3" /> Board View</TabsTrigger>
                            <TabsTrigger value="list"><Menu className="h-3 w-3" /> List View</TabsTrigger>
                            <TabsTrigger value="calendar"><Calendar className="h-3 w-3" /> Calendar View</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    
                    <TaskModal
                        btnAction={
                            <Button>
                                <Plus className="h-4 w-4" />
                                Add Task
                            </Button>
                        }
                        editTask={editTask}
                        setEditTask={setEditTask}
                    />
                </div>
            </HeaderLayout>

            <div className="flex justify-end items-center gap-2">
                <MonthYearPicker value={date} onChange={setDate} />
                <Field orientation="horizontal" className="w-70">
                    <InputGroup>
                        <InputGroupInput 
                            id="inline-start-input" 
                            placeholder="Search..." 
                            onChange={(e) => {
                                const value = e.target.value;
                                setFilter((prev) => ({ ...prev, search: value }));
                            }}
                        />
                        <InputGroupAddon align="inline-start">
                        <SearchIcon className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
                <FilterSelect items={priorityOptions} />
            </div>
            
            {renderView()}
        </>
    )
}