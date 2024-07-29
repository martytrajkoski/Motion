import React from "react"
import '../../../../css/NoteStyle/NoteStyle.scss'
import ReminderShowHeader from "@/Components/REMINDERCOMPONENTS/ReminderShow/ReminderShowHeader"
import ReminderBody from "@/Components/REMINDERCOMPONENTS/ReminderShow/ReminderBody"

export default function ShowReminder(reminder){
    return(
        <div className="note-container py-12">
            <ReminderShowHeader reminder={reminder}/>
            <ReminderBody reminder={reminder}/>
        </div>
    )
}