import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function TextBox(){

    const [note, setNote] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        Inertia.post('/create', { note }, {
            onSuccess: () => {
                // Use the note ID from the response (assuming it's included)
                // const noteId = page.props.note.id;
                Inertia.get(`/show/1`);
            },
            onError: (errors) => {
                console.log('Error:', errors);
            }
        });
    };

    return(
        <form onSubmit={handleSubmit} className="note">
            <textarea 
                name="note" 
                rows='10' 
                className="note-body" 
                placeholder="Enter your note here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}></textarea>
            <div className="note-buttons">
                <Link href="/notes" className="note-cancel-button">Cancel</Link>
                <button type='submit' className="note-submit-button">Submit</button>
            </div>
        </form>
    );
}