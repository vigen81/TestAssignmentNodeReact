import React, { Component } from "react";

class SearchItem extends Component {
  render() {
    const { url } = this.props.photo;
    return (
      <div>
        <img src={url} style={{ width: "300px", height: "300px" }} />
      </div>
    );
  }
}

export default SearchItem;
