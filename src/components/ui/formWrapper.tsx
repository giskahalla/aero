import { Field, FieldLabel } from "@/components/ui/field"

export default function FormWrapper({ label, children, icon, ...props }: { label?: string; icon?: React.ReactElement, children?: React.ReactElement } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Field>
            <FieldLabel htmlFor={props.id}>{icon}{label}</FieldLabel>
            {children}
        </Field>
    )
}