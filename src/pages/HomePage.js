import React, { Component } from 'react';

import MainView from "../components/HomePage/MainView";
import SearchResults from "../components/HomePage/SearchResults";
import ProductDescription from "../components/HomePage/ProductDescription";


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productDescriptionRef: null
        };
    }


    render() {
        return (
            <React.Fragment>
                <MainView scrollToProductDescription={this.scrollToProductDescription}/>
                <ProductDescription setRef={this.setProductDescriptionRef}/>
                <SearchResults />
            </React.Fragment>
        );
    }

    setProductDescriptionRef = ref => {
        this.setState({
            productDescriptionRef: ref
        });
    }

    scrollToProductDescription = () => {
        this.state.productDescriptionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

export default HomePage;