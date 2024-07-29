import React, { useEffect, useState } from "react";
import '../../../../css/NoteStyle/NoteStyle.scss';
import { format } from 'date-fns';
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import ReminderDateTime from "../ReminderDateTime/ReminderDateTime";

export default function TextBox(item){
    const [title, setTitle] = useState(item.item.reminder.title);
    const [reminder, setReminder] = useState(item.item.reminder.reminder);
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [reminder_time, setReminderTime] = useState();
    const [priority, setPriority] = useState(item.item.reminder.priority);

    const formattedDate = format(item.item.reminder.reminder_time, 'yyyy-MM-dd');
    const formattedTime = format(item.item.reminder.reminder_time, 'HH:mm');

    useEffect(() => {
        if(date && time)
            setReminderTime(`${date} ${time}`);
        else if(time)
            setReminderTime(`${formattedDate} ${time}`);
        else if(date)
            setReminderTime(`${date} ${formattedTime}`);
        else
            setReminderTime(`${formattedDate} ${formattedTime}`);

    }, [date, time, formattedTime, formattedDate]);
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        Inertia.patch(`/reminders/update/${item.item.reminder.id}`, { title:title, reminder:reminder,  reminder_time:reminder_time, priority:priority}, {
            onSuccess: () => {
                Inertia.get(`reminders/show/${item.item.reminder.id}`);
            },
            onError: (errors) => {
                console.log('Error:', errors);
            }
        });
    };
    
    const handlePriority = (event) => {
        setPriority(event.target.value);
    };

    return(
        <form onSubmit={handleSubmit} className="note">
            <textarea 
                name="title" 
                rows='2'
                className="note-body"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                >{item.item.reminder.title}</textarea>
            <textarea 
                name="reminder" 
                rows='10'
                className="note-body"
                placeholder="Enter reminder"
                onChange={(e) => setReminder(e.target.value)}
                >{item.item.reminder.reminder}</textarea>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex'}}>
                    <ReminderDateTime 
                        onDateChange={setDate} 
                        onTimeChange={setTime}
                        initialDate={formattedDate}
                        initialTime={formattedTime}
                        />
                    <div className="mx-5">
                        <label>Priority:</label>
                        <select className="mx-3" value={priority} onChange={handlePriority}>
                            <option value="None">None</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className="note-buttons">
                    <Link href="/reminders" className="note-cancel-button">Cancel</Link>
                    <button type='submit' className="note-submit-button">Submit</button>
                </div>
            </div>
        </form>
    );
}