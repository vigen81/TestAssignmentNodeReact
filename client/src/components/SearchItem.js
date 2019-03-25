import React, { Component } from 'react';

class SearchItem extends Component {

render () {
    const { url, title } = this.props.photo;
    console.log(this.props.key);
    return(
        <div>
            <img src={url} style={{width: '300px', height: '300px' }}/>
        </div>
    )
}
}

export default SearchItem;