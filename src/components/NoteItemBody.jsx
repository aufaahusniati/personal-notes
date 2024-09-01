import React, { Component } from "react";
import { showFormattedDate } from "../utils/InitialData.js";

class NoteItemBody extends Component {
  render() {
    const { title, body, createdAt } = this.props;

    return (
      <div className="note-item__body">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__date">{showFormattedDate(createdAt)}</p>
        <p className="note-item__body">{body}</p>
      </div>
    );
  }
}

export default NoteItemBody;
