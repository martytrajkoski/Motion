import React from "react";

export default function NoteBody(note){
    return (
        <div className="">
            <div style={{background: '#f0c806', padding: '20px', borderRadius: '8px'}}>
                {note.note.note.note}
            </div>
        </div>
    );
    
}