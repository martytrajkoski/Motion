<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReminderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ReminderPages/Reminder/Reminders');
    }

    public function fetchReminders(Request $request){
        return( Reminder::query()
                        ->where('user_id', request()->user()->id)
                        ->orderBy('created_at', 'desc')
                        ->paginate(12));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ReminderPages/CreateReminder/CreateReminder');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'reminder' => ['required', 'string'],
            'reminder_time' => ['required', 'date'],
            'priority' => ['required']
        ]);
        
        $data['user_id'] = $request->user()->id;

        $reminder = Reminder::create($data);
        
        return redirect()->route('reminders.show', $reminder->id)->with('message', 'Reminder was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reminder $reminder)
    {
        if($reminder->user_id != request()->user()->id)
            abort(403);

        return Inertia::render('ReminderPages/ShowReminder/ShowReminder', [
            'reminder' => $reminder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reminder $reminder)
    {
        if($reminder->user_id != request()->user()->id)
            abort(403);

        return Inertia::render('ReminderPages/EditReminder/EditReminder', [
            'reminder' => $reminder
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reminder $reminder)
    {
        if($reminder->user_id != request()->user()->id)
            abort(403);

        $data = $request->validate([
            'title' => ['required', 'string'],
            'reminder' => ['required', 'string'],
            'reminder_time' => ['required', 'date'],
            'priority' => ['required']
        ]);
    

        $reminder->update($data);
        
        return redirect()->route('reminders.show', $reminder)->with('message', 'Reminder was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reminder $reminder)
    {
        if($reminder->user_id != request()->user()->id)
            abort(403);

        $reminder->delete();

        return Inertia::render('ReminderPages/Reminder/Reminders');
    }
}
