import ReminderCard from "@/Components/REMINDERCOMPONENTS/ReminderComponent/ReminderCard";
import Dashboard from "@/Pages/Dashboard";
import { Link, usePage } from "@inertiajs/react";
import "../../../../css/ReminderStyle/ReminderStyle.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Links from "@/Components/NoteComponents/Links";

export default function Reminders() {
    const auth = usePage().props.auth;
    const [reminders, setReminders] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await axios.get(`/fetch-reminders?page=${page}`);
                setReminders(response.data.data);
                setPages(response.data)
            } catch (error) {
                console.log("Error fetching reminders", error);
            }
        };

        fetchReminders();
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

    return (
        <div>
            <Dashboard auth={auth}></Dashboard>
            <div className="reminder-container py-12">
                <Link className="new-reminder-btn" href="/reminders/create">
                    New Reminder
                </Link>
                <div className="py-4 reminders">
                    {reminders.map((reminder) => (
                        <div className="reminder" key={reminder.id}>
                            <ReminderCard reminder={reminder} />
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
