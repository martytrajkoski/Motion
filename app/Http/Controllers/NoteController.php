<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Note/Notes');
    }

    public function fetchNotes(Request $request){
        return( Note::query()
                    ->where('user_id', request()->user()->id)
                    ->orderBy('created_at', 'desc')
                    ->paginate(12));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Create/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'note' => ['required', 'string'],
        ]);

        $data['user_id'] = $request->user()->id;

        $note = Note::create($data);

        return redirect()->route('note.show', $note->id)->with('message', 'Note was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        if($note->user_id != request()->user()->id)
            abort(403);

        return Inertia::render('Show/Show', [
            'note' => $note
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        if($note->user_id != request()->user()->id)
            abort(403);

        return Inertia::render('Edit/Edit', [
            'note' => $note
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        if($note->user_id != request()->user()->id)
            abort(403);

        $data = $request->validate([
            'note' => ['required', 'string']
        ]);

        $note->update($data);

        return redirect()->route('note.show', $note)->with('message', 'Note was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        if($note->user_id != request()->user()->id)
            abort(403);

        $note->delete();

        return Inertia::render('Note/Notes')->with('message', 'Note was deleted');
    }
}
