import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react"
import { format } from "date-fns";

function getFirstNWords(text, wordLimit) {
    const words = text.split(/\s+/);
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
}

export default function ReminderCard(item){
    
    const handleDelete = (e) => {
        e.preventDefault();

        Inertia.delete(`/reminders/${item.reminder.id}`)
        window.location.reload()
    };

    const formattedDateTime = format(item.reminder.reminder_time, 'yyyy-MM-dd HH:mm')
    
    return(
        <div className="reminder-card">
            <div className="reminder-body">
                <div className="reminder-title">{item.reminder.title}</div>
                <div>{getFirstNWords(item.reminder.reminder, 30)}</div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <small>Day: {formattedDateTime}</small>
                    <small>Priority: {item.reminder.priority}</small>
                </div>
            </div>
            <div className="reminder-buttons">
                <Link className="reminder-edit-button" href={`/reminders/show/${item.reminder.id}`}>View</Link>
                <Link className="reminder-edit-button" href={`/reminders/edit/${item.reminder.id}`}>Edit</Link>
                <form onSubmit={handleDelete}>
                    <button type="submit" className="reminder-delete-button">Delete</button>
                </form>
            </div>
        </div>
    )
}