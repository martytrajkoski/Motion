import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function ReminderShowHeader(item){
    const date = new Date(item.reminder.reminder.reminder_time);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    const handleDelete = (e) => {
        e.preventDefault();

        Inertia.delete(`/reminders/${item.reminder.reminder.id}`)
        window.location.href = '/reminders'
    };
    
    return(
        <div className="note-header">
            <div>
                <h1 className="text-lg">Reminder for: {formattedDate} </h1>
                <h1 className="text-lg">Prirority: {item.reminder.reminder.priority}</h1>
            </div>
            <div className="note-buttons">
                <Link href={`/reminders`} className="note-edit-button">Reminders</Link>
                <Link href={`/reminders/edit/${item.reminder.reminder.id}`} className="note-edit-button">Edit</Link>
                <form onSubmit={handleDelete}>
                    <button className="note-delete-button">Delete</button>
                </form>
            </div>
        </div>
    )
}