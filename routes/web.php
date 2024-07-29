<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ReminderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login')->name('login');

Route::get('/notes', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Notes
Route::get('/notes', [NoteController::class, 'index'])->name('notes.index');
Route::get('/create', function(){
    return Inertia::render('Create/Create');
});
Route::get('/edit/{note}', [NoteController::class, 'edit']);
Route::get('/show/{note}', [NoteController::class, 'show'])->name('note.show');
Route::get('/fetch-notes', [NoteController::class, 'fetchNotes']);
Route::delete('/notes/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
Route::post('/create', [NoteController::class, 'store'])->name('notes.store');
Route::patch('/update/{note}', [NoteController::class, 'update'])->name('note.update');

// Reminders
Route::get('/reminders', [ReminderController::class, 'index'])->name('reminders.index');
Route::get('/reminders/create', [ReminderController::class, 'create'])->name('reminders.create');
Route::get('/reminders/edit/{reminder}', [ReminderController::class, 'edit']);
Route::get('/reminders/show/{reminder}', [ReminderController::class, 'show'])->name('reminders.show');
Route::get('/fetch-reminders', [ReminderController::class, 'fetchReminders']);
Route::delete('reminders/{reminder}', [ReminderController::class, 'destroy'])->name('reminders.destroy');
Route::post('/reminders/create', [ReminderController::class, 'store'])->name('reminders.store');
Route::patch('/reminders/update/{reminder}', [ReminderController::class, 'update'])->name('reminders.update');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
