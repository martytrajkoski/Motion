import React from "react"
import { Link } from "@inertiajs/react";
import TextBox from "@/Components/REMINDERCOMPONENTS/ReminderEdit/TextBox";
import '../../../../css/NoteStyle/NoteStyle.scss'

export default function EditReminder(item){
    
    return(
        <div className="note-container single-note note py-12">
            <h1 style={{fontSize:'20px'}}>Edit reminder</h1>
            <div>
                <TextBox item={item}/>
            </div>
            
        </div>
    );
}