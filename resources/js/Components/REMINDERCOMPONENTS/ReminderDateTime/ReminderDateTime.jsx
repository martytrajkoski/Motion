import React, { useState, useEffect } from 'react';
import '../../../../css/ReminderStyle/ReminderStyle.scss';

export default function ReminderDateTime({ onDateChange, onTimeChange, initialDate, initialTime }) {
    const [date, setDate] = useState(initialDate);
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        setDate(initialDate);
        setTime(initialTime);
    }, [initialDate, initialTime]);

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        onDateChange(newDate);
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setTime(newTime);
        onTimeChange(newTime);
    };

    return (
        <div className="datetime-picker">
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="date-input"
                />
            </label>
            <label>
                Time:
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="time-input"
                />
            </label>
        </div>
    );
}
