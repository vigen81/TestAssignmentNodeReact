import React, { Component } from "react";
import SearchItem from "./SearchItem";
import "../AutoCompleteText.css"

class Search extends Component {
  state = {
    photos: [],
    search: "",
    auto: [],
    suggestion: []
  };

  handleSubmit = async e => {
    this.state.auto.push(this.state.search);
    this.setState({auto: [...new Set(this.state.auto)]})
    e.preventDefault();
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: this.state.search })
    });
    const body = await response.text();
    const photos = JSON.parse(body).data;

    this.setState({ photos });
  };

  onTextChanged = async e => {
    e.preventDefault();

    const value = e.target.value;
    let suggestion = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestion = this.state.auto.sort().filter(v => regex.test(v));
    }
    this.setState({ suggestion: suggestion, search: value });

  };

  suggestionSelected = async (value) => {
    
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: value })
    });
    const body = await response.text();
    const photos = JSON.parse(body).data;
    this.setState(() => ({
      search: value,
      suggestion: [],
      photos
    }));
  }

  renderSuggestions() {
    const { suggestion } = this.state;
    if (suggestion.length === 0) {
      return null;
    }

    return (
      <ul>
        {suggestion.map(item => (
          <li onClick={() => this.suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }

  render() {
    const {search} = this.state;
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Search photos:</strong>
          </p>
          <div className="AutoComleteText">
            <input
              type="text"
              value={search}
              onChange={this.onTextChanged}
            />
          </div>
        </form>
        {this.renderSuggestions()}
        <div className="itemsList">
          {this.state.photos.map(photo => (
            <SearchItem key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
