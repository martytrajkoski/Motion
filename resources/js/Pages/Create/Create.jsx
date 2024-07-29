import React from "react";
import TextBox from "@/Components/CreateComponents/TextBox";
import '../../../css/NoteStyle/NoteStyle.scss';

export default function Create(){
    return(
        <div className="note-container single-note note py-12">
            <h1 style={{fontSize: '20px'}}>Create new note</h1>
            <TextBox/>
        </div>
    );
}