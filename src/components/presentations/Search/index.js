import React from 'react';
import { Input } from 'antd';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchFile = this.searchFile.bind(this);
  }

  searchFile(value) {
    this.props.onSearch(value);
  }

  render() {
    return (
      <Input.Search
        placeholder="Input folder or file name for search"
        enterButton="Search"
        size="large"
        onSearch={this.searchFile}
      />
    );
  }
}

export default Search;
