import { Link } from "@inertiajs/react";
import React from "react";
import { Inertia } from "@inertiajs/inertia";

function getFirstNWords(text, wordLimit) {
    const words = text.split(/\s+/);
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
}

export default function NoteCard(note){

    const handleDelete = (e) => {
        e.preventDefault();

        Inertia.delete(`/notes/${note.note.id}`)
        window.location.reload()
    };

    return(
        <div className="note-card">
            <div className="note-body">
                {getFirstNWords(note.note.note, 30)}
            </div>
            <div className="note-buttons">
                <Link className="note-edit-button" href={`/show/${note.note.id}`}>View</Link>
                <Link className="note-edit-button" href={`/edit/${note.note.id}`}>Edit</Link>
                <form onSubmit={handleDelete}>
                    <button type="submit" className="note-delete-button">Delete</button>
                </form>
            </div>
        </div>
    );
};