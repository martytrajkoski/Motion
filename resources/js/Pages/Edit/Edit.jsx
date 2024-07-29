import React from "react";
import TextBox from "@/Components/EditComponents/TextBox";
import '../../../css/NoteStyle/NoteStyle.scss';

export default function Edit(note){
    return(
        <div className="note-container single-note note py-12">
            <h1 style={{fontSize: '20px'}}>Edit your note</h1>
            <TextBox note={note}/>
        </div>
    );
}