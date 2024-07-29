import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function ShowHeader(note){
    console.log(note.note.note.created_at)
    const date = new Date(note.note.note.updated_at);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(note.note.note.id);

    const handleDelete = (e) => {
        e.preventDefault();

        Inertia.delete(`/notes/${note.note.note.id}`)
        window.location.href = '/notes'
    };
    
    return(
        <div className="note-header">
            <h1 className="text-lg py-4">Note: {formattedDate} </h1>
            <div className="note-buttons">
                <Link href={`/notes`} className="note-edit-button">Notes</Link>
                <Link href={`/edit/${note.note.note.id}`} className="note-edit-button">Edit</Link>
                <form onSubmit={handleDelete}>
                    <button className="note-delete-button">Delete</button>
                </form>
            </div>
        </div>
    )
}