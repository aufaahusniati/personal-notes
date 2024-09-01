import React from "react";
import { getInitialData } from "../utils/InitialData";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import NoteSearch from "./NoteSearch";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      archivedNotes: [],
      filteredNotes: [],
      search: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnArchiveHandler = this.onUnArchiveHandler.bind(this);
    this.searchArchivedNotes = this.searchArchivedNotes.bind(this);
  }

  onDeleteHandler(id) {
    const { notes, archivedNotes } = this.state;
    const updatedNotes = notes.filter((note) => note.id !== id);
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);

    this.setState({
      notes: updatedNotes,
      archivedNotes: updatedArchivedNotes,
    });
  }

  onArchiveHandler(id) {
    const { notes, archivedNotes } = this.state;
    const updatedNotes = notes.filter((note) => note.id !== id);
    const noteToArchive = notes.find((note) => note.id === id);

    if (noteToArchive) {
      this.setState({
        notes: updatedNotes,
        archivedNotes: [...archivedNotes, { ...noteToArchive, archived: true }],
      });
    }
  }

  onUnArchiveHandler(id) {
    const { notes, archivedNotes } = this.state;
    const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== id);
    const noteToUnArchive = archivedNotes.find((note) => note.id === id);

    if (noteToUnArchive) {
      this.setState({
        notes: [...notes, { ...noteToUnArchive, archived: false }],
        archivedNotes: updatedArchivedNotes,
      });
    }
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  searchArchivedNotes(searchTerm) {
    const { archivedNotes } = this.state;
    return archivedNotes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  handleSearch = (search) => {
    const filteredNotes = this.filterNotes(search);
    this.setState({ search, filteredNotes }, () => {
      console.log("Filtered Notes:", this.state.filteredNotes);
    });
  };

  filterNotes = (search) => {
    const { notes } = this.state;
    const filterFunction = (note) => note.title.toLowerCase().includes(search);
    const filteredActiveNotes = notes.filter(filterFunction);
    return filteredActiveNotes;
  };

  render() {
    return (
      <div className="note-app__body">
        <div className="notes-app">
          <NoteInput addNote={this.onAddNoteHandler} />
        </div>
        <div className="notes-app">
          <h2>Your notes</h2>
          <NoteSearch onSearch={this.handleSearch} />
          <NoteList
            notes={this.filterNotes(this.state.search)}
            onDelete={this.onDeleteHandler}
            search={this.state.search}
            onArchive={this.onArchiveHandler}
          />
        </div>
        <div className="notes-app">
          <h2>Archived</h2>
          <NoteList
            notes={
              this.state.search.length > 0
                ? this.searchArchivedNotes(this.state.search)
                : this.state.archivedNotes
            }
            onDelete={this.onDeleteHandler}
            onArchive={this.onUnArchiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
