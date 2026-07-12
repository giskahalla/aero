'use client'

import React from "react"
import { useForm } from "react-hook-form"
import { UserRound } from "lucide-react"

import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TeamForm, TeamList } from "./components"
import QueryProvider from "@/components/providers"

import { TeamFormInput } from "@/types"

import { TEAM } from "@/hooks"

function TeamModal() {

    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('')
    const { register, handleSubmit } = useForm<TeamFormInput>({
        defaultValues: {
            name: '',
            email: '',
            role: ''
        },
    })

    const onSubmit = (data: TeamFormInput) => {
        console.log("Data Form:", data)
    }

    const { data: { data: teams, total } = { data: [], total: 0 } } = TEAM.getTeams({ keyword: search, page });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent className="lg:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>

            <DialogHeader>
                <DialogTitle className='flex items-center gap-2'> 
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <UserRound /> 
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">Manage Team</span>
                        <span className="truncate text-xs">{total} members</span>
                    </div>
                </DialogTitle>
            </DialogHeader>

             <Field orientation="horizontal">
                <Input 
                    type="search" 
                    placeholder="Search name or role..." 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setSearch(e.currentTarget.value);
                        }
                    }}
                />
                <Button>Search</Button>
            </Field>

            <div className="-mx-4 px-4">
                <TeamList teams={teams} total={total} onPageChange={setPage} />
            </div>

            <DialogFooter>
                <DialogClose asChild/>
                <TeamForm register={register} />
            </DialogFooter>
            </DialogContent>
        </form>
    )
}

export function Teams({ btnAction }: { btnAction: React.ReactElement })  {

    return ( 
        <QueryProvider>
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">     
                {btnAction}
            </DialogTrigger>

            <TeamModal />
        </Dialog>
        </QueryProvider>
    )

}
