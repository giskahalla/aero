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
import { TeamForm, TeamList } from "./components"

import { TeamFormInput } from "@/types"

function TeamModal() {

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
                        <span className="truncate text-xs">5 members . 3 online</span>
                    </div>
                </DialogTitle>
            </DialogHeader>

            <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                <TeamList />
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
