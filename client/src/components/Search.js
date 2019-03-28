import React, { Component } from "react";
import SearchItem from "./SearchItem";
import "../AutoCompleteText.css";
import { withRouter } from "react-router-dom";

class Search extends Component {
  state = {
    photos: [],
    search: "",
    auto: [],
    suggestion: []
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { history } = this.props;
    history.push({pathname: '/search', search:`?q=${this.state.search}`})
    this.state.auto.push(this.state.search);
    this.setState({auto: [...new Set(this.state.auto)]})
    
    const photos = await this.getPhotos(this.state.search);

    this.setState({ photos });
  };

  async getPhotos(query) {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: query })
    });
    const body = await response.text();
    const photos = JSON.parse(body).data;
    return photos;
  }


  async componentDidMount () {
    const {search} = this.props.location;

    if (search) {
      const q =  search.split('q=')[1];
      const photos = await this.getPhotos(q);
      this.setState({ photos, search: q });
    }
  }

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
    const { history } = this.props;
    history.push({pathname: '/search', search:`?q=${value}`})
    
    const photos = await this.getPhotos(value);
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
          <li onClick={() => this.suggestionSelected(item)} key={item}>{item}</li>
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

export default withRouter(Search);
