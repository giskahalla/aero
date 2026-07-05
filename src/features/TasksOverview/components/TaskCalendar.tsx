
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { COLOR } from "@/constants"


export default function TaskCalendar({ month, tasks }: { month: Date; tasks: any[] }) {
    return (
        <div className="my-10 h-[700px] overflow-auto">
            <FullCalendar
                key={month.toISOString()}
                plugins={[dayGridPlugin]}
                headerToolbar={false}
                events={tasks.map((task) => ({
                    title: task.title,
                    start: task.start_date,
                    end: task.due_date,
                    color: COLOR.statusColors[task.status].cssColor,
                }))}
                initialDate={month}
            />
        </div>
    )
}