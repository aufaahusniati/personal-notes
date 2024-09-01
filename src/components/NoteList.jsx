import React, { Component } from "react";
import NoteItem from "./NoteItem";

class NoteList extends Component {
  render() {
    const { notes, onDelete, onArchive } = this.props;

    return (
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-message">
            <p>No notes</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              onDelete={onDelete}
              onArchive={onArchive}
              {...note}
            />
          ))
        )}
      </div>
    );
  }
}

export default NoteList;
