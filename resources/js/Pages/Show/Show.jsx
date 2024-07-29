import React from "react";
import ShowHeader from "@/Components/ShowComponents/ShowHeader";
import NoteBody from "@/Components/ShowComponents/NoteBody";
import '../../../css/NoteStyle/NoteStyle.scss'


export default function Show(note){
    console.log(note)
    return(
        <div className="note-container py-12">
            <ShowHeader note={note}/>
            <NoteBody note={note}/>
        </div>
    );
}