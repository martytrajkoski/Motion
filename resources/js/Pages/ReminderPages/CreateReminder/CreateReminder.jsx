import { Link } from '@inertiajs/react';
import '../../../../css/NoteStyle/NoteStyle.scss';
import TextBox from '@/Components/REMINDERCOMPONENTS/CreateComponent/TextBox';
import ReminderDateTime from '@/Components/REMINDERCOMPONENTS/ReminderDateTime/ReminderDateTime';

export default function CreateReminder() {
    return (
        <div className='note-container single-note note py-12'>
            <h1 style={{fontSize: '20px'}}>Create new note</h1>
            <div>
                <TextBox/>
            </div>
        </div>
    );
}
