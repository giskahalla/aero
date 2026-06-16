
import { UseFormRegister } from "react-hook-form" 
import { UserPlus } from "lucide-react"

import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormWrapper from "@/components/ui/formWrapper"

import { TeamFormInput } from "@/types"

interface TeamFormProps {
    register: UseFormRegister<TeamFormInput>;
}

export function TeamForm({ register }: TeamFormProps) {

    return (
        <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
                <FormWrapper id="title">
                    <Input id="title" {...register("name")} placeholder="Full Name"/>
                </FormWrapper>

                <FormWrapper id="email">
                    <Input id="email" {...register("email")} placeholder="Email Address"/>
                </FormWrapper>
            </div>
            <div className="grid grid-cols-2 gap-3 items-end">
                <FormWrapper id="role">
                    <Input id="role" {...register("role")} placeholder="Role"/>
                </FormWrapper>
                <Button type="submit" className='w-35'><UserPlus className="w-3 h-3"/>Send Invite</Button>
            </div>
        </FieldGroup>
    )
}