import { HeaderLayout } from "@/components/index";

export function Dashboard() {
    return (
        <HeaderLayout>
            <div>
                <h5 className="text-xl font-bold">Productivity Analytics</h5>
                <p className="text-sm text-muted-foreground">
                    Sprint 14 · May 1 – May 15, 2025
                </p>
            </div>
            <div className="flex gap-2items-end text-sm text-muted-foreground">
                <span>Updated 2 mins ago</span>
            </div>
        </HeaderLayout>
    )
}