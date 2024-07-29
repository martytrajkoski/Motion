import '../../../css/NoteStyle/NoteStyle.scss';

export default function Links({ handlePreviousPage, handleNextPage, isPreviousDisabled, isNextDisabled }) {
    return(
        <div className='pagination'>
            <button 
                onClick={handlePreviousPage} 
                disabled={isPreviousDisabled}
            >
                Previous
            </button>
            <button 
                onClick={handleNextPage} 
                disabled={isNextDisabled}
            >
                Next
            </button>
        </div>
    );
}