import React, { Component } from "react";

class ArchiveButton extends Component {
  render() {
    const { id, onArchive, archived } = this.props;

    return (
      <button className="note-item__archive" onClick={() => onArchive(id)}>
        {archived ? "Unarchived" : "Archive"}
      </button>
    );
  }
}

export default ArchiveButton;
