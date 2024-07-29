import NoteCard from "@/Components/NoteComponents/NoteCard";
import Links from "@/Components/NoteComponents/Links";
import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../css/NoteStyle/NoteStyle.scss";
import axios from "axios";
import Dashboard from "../Dashboard";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [pages, setPages] = useState({});
    const [page, setPage] = useState(1);
    const auth = usePage().props.auth;

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`/fetch-notes?page=${page}`);
                setNotes(response.data.data);
                setPages(response.data);
            } catch (error) {
                console.log("Error fetching notes", error);
            }
        };

        fetchNotes();
    }, [page]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < pages.last_page) {
            setPage(page + 1);
        }
    };

    // console.log(pages);

    return (
        <div>
            <Dashboard auth={auth}></Dashboard>
            <div className="note-container py-12">
                <Link href="/create" className="new-note-btn">
                    New Note
                </Link>
                <div className="notes py-4">
                    {notes.map((note) => (
                        <div className="note" key={note.id}>
                            <NoteCard note={note} />
                        </div>
                    ))}
                </div>
                {pages.current_page !== pages.last_page ? (
                    <div className="py-6 links">
                        <div className="pagination">
                            <Links
                                handlePreviousPage={handlePreviousPage}
                                handleNextPage={handleNextPage}
                                isPreviousDisabled={page === 1}
                                isNextDisabled={page === pages.last_page}
                            />
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
