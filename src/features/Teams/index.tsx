'use client'

import React from "react"
import { useForm } from "react-hook-form"
import { UserRound } from "lucide-react"

import { teams } from "./constants"

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

import { TeamFormInput } from "@/types"

function TeamModal() {

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

    const filteredTeams = teams.filter(tm => {
        if (search === '') return true;
        
        const keyword = search.toLowerCase();

        const matchName = tm.name ? tm.name.toLowerCase().includes(keyword) : false;
        const matchRole = tm.role ? tm.role.toLowerCase().includes(keyword) : false;

        return matchName || matchRole;
    });

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
                        <span className="truncate text-xs">{filteredTeams.length} members</span>
                    </div>
                </DialogTitle>
            </DialogHeader>

             <Field orientation="horizontal">
                <Input type="search" placeholder="Search name or role..." onChange={(e) => setSearch(e.target.value)}/>
                <Button>Search</Button>
            </Field>

            <div className="-mx-4 px-4">
                <TeamList teams={filteredTeams}/>
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
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">     
                {btnAction}
            </DialogTrigger>

            <TeamModal />
        </Dialog>
    )

}
