import React from "react";

export default function ReminderBody(item){
    return (
        <div className="">
            <div className="my-4" style={{background: '#f0c806', padding: '20px', borderRadius: '8px'}}>
                {item.reminder.reminder.title}
            </div>
            <div style={{background: '#f0c806', padding: '20px', borderRadius: '8px'}}>
                {item.reminder.reminder.reminder}
            </div>
        </div>
    );
    
}