import React from "react";

class NoteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChange = (e) => {
    const search = e.target.value.toLowerCase();
    this.setState({ search }, () => {
      this.props.onSearch(search);
    });
  };

  render() {
    return (
      <div className="note-search">
        <input
          type="text"
          id="search"
          placeholder="Search...."
          value={this.state.search}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default NoteSearch;
