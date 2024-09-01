import React, { Component } from "react";

class DeleteButton extends Component {
  render() {
    const { id, onDelete } = this.props;

    return (
      <button className="note-item__delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    );
  }
}

export default DeleteButton;
