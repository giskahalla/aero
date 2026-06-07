import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { HeaderLayout } from "@/components/index"

export default function Sprints() {
    return (
        <HeaderLayout>
            <div>
                <h5 className="text-xl font-bold">Sprint Workspace</h5>
                <p className="text-sm text-muted-foreground">
                    14 tasks · 5 to do · 4 in progress · 5 done
                </p>
            </div>
            <div className="w-xs flex gap-1 items-end text-sm text-muted-foreground">
                <Tabs defaultValue="overview" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="overview">Board View</TabsTrigger>
                        <TabsTrigger value="analytics">Calendar View</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Button>
                    <Plus className="h-4 w-4" />
                    Add Task
                </Button>
            </div>
        </HeaderLayout>
    )
}