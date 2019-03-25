import React, { Component } from 'react';
import SearchItem from './SearchItem';

class Search extends Component {
  state = {
    photos: [],
    search: '',
    auto: [],
    suggestion: []
  }

  handleSubmit = async e => {

    this.state.auto.push(this.state.search);
    e.preventDefault();
    console.log(this.state.search);
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: this.state.search }),
    });
    const body = await response.text();
    const photos = JSON.parse(body).data;

    this.setState({ photos });
    
  };

  onTextChanged = (e) => {
    console.log('auto ', this.state.auto)
    
    const value = e.target.value;
    let suggestion = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestion = this.state.auto.sort().filter(v => regex.test(v));  
      console.log(' suggestion  ',suggestion)
    }
    this.setState({suggestion: suggestion, search: value});

    console.log('sugg ', this.state.suggestion)
  }

  renderSuggestions () {
    const {suggestion} = this.state;
    console.log('renderSuggestion', this.state.suggestion)
    if (suggestion.length === 0) {
      return null;
    }  

    return (
      <ul>
          {suggestion.map((item) => <li>{item}</li>)}
      </ul> 
    )
  }

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ photos: res.data }))
    //   .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.photos)
    return (
      <div className='search'>
        <h1>Search</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Search photos:</strong>
          </p>
          <input
            type="text"
            value={this.state.search}
            onChange={this.onTextChanged}
          />
          <button type="submit">Submit</button>
        </form>

        {this.renderSuggestions()}

        <div className='itemsList'>
            {this.state.photos.map(photo => (
              <SearchItem key={photo.id} photo={photo}/>
            ))}
        </div>
      </div>
    )
  }
}

export default Search;