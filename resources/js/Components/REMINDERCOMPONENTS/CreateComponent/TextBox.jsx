import React, { useState, useEffect } from 'react';
import '../../../../css/NoteStyle/NoteStyle.scss';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import ReminderDateTime from '../ReminderDateTime/ReminderDateTime';
import { format } from 'date-fns';

export default function TextBox() {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reminder_time, setReminderTime] = useState();
    const [priority, setPriority] = useState('None');

    useEffect(() => {
        if(date && time)
            setReminderTime(`${date} ${time}`);
        else if(time)
            setReminderTime(`${formattedDate} ${time}`);
        else if(date)
            setReminderTime(`${date} ${formattedTime}`);
        else
            setReminderTime(`${formattedDate} ${formattedTime}`);

    }, [date, time]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/reminders/create', { title, reminder, reminder_time, priority }, {
            onError: (errors) => {
                console.log('Error:', errors);
            }
        });
    };

    const handlePriority = (event) => {
        setPriority(event.target.value);
    };

    const now = new Date();
    const formattedDate = format(now, 'yyyy-MM-dd');
    const formattedTime = format(now, 'HH:mm');

    return (
        <form onSubmit={handleSubmit} className="note">
            <textarea
                name="title"
                rows='2'
                className="note-body"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                name="reminder"
                rows='10'
                className="note-body"
                placeholder="Enter Reminder"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ReminderDateTime
                    onDateChange={setDate}
                    onTimeChange={setTime}
                    initialDate={formattedDate}
                    initialTime={formattedTime}
                />
                <div className="mx-5">
                        <label>Priority:</label>
                        <select className="mx-3" value={priority} onChange={handlePriority} selected='None'>
                            <option value="None">None</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                <div className="note-buttons">
                    <Link href="/reminders" className="note-cancel-button">Cancel</Link>
                    <button type='submit' className="note-submit-button">Submit</button>
                </div>
            </div>
        </form>
    );
}
