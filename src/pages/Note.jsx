import React, { useState, useEffect, useRef } from 'react';
import './Note.css'; // Import the CSS file
import taskAddedSound from '../assets/audio.mp3'; // Import the audio file

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const audioRef = useRef(null);

  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const addNote = () => {
    if (noteInput.trim() !== '') {
      const currentTime = new Date().toLocaleString(); // Get current time and date
      const updatedNotes = [...notes, { text: noteInput, time: currentTime }]; // Include time and date in the note
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNoteInput('');

      // Play the audio when a note is added
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const removeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      addNote();
    }
  };

  return (
    <div className="note-container">
      <h1>Notes</h1>
      <div className="input-container">
        <input
          type="text"
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress on key press
          placeholder="Enter a new note"
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <audio ref={audioRef}>
        <source src={taskAddedSound} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <div>
              <p>{note.text}</p>
              <small>{note.time}</small> {/* Display time and date */}
            </div>
            <button onClick={() => removeNote(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
