
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-full">
            <Spinner className="size-10" />
            <span className="ml-2">Loading...</span>
        </div>
    )
}