import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import searchAreaStyle from "./SearchArea.module.css";


class SearchArea extends Component {
    render() {
        return (
            <div className={searchAreaStyle.searchArea}>
                <SearchBar />
            </div>
        );
    }
}

export default SearchArea;