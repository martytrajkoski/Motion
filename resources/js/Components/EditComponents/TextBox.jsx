import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function TextBox(note){
    const [notee, setNote] = useState(note.note.note.note);

    const handleSubmit = (e) =>{
        e.preventDefault();
        Inertia.patch(`/update/${note.note.note.id}`, { note:notee }, {
            onSuccess: () => {
                Inertia.get(`/show/${note.note.note.id}`);
            },
            onError: (errors) => {
                console.log('Error:', errors);
            }
        });
    };
    
    return(
        <form onSubmit={handleSubmit}  className="note">
            <textarea 
                name="note" 
                rows='20' 
                className="note-body" 
                placeholder="Enter your note here..."
                onChange={(e) => setNote(e.target.value)}>{note.note.note.note}</textarea>
            <div className="note-buttons">
                <Link href="/notes" className="note-cancel-button">Cancel</Link>
                <button type='submit' className="note-submit-button">Submit</button>
            </div>
        </form>
    );
}