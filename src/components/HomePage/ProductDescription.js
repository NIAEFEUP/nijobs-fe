import React, { Component } from 'react';
import PropTypes from 'prop-types';

import productDescriptionStyle from './ProductDescription.module.css';

class ProductDescription extends Component {
    static propTypes = {
        setRef: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        props.setRef(this.ref);
    }
    render() {
        return (
            <div 
                ref={this.ref}
                className={productDescriptionStyle.container}
            >
                Other content, like what is this for and cool vector and stock images with no copyright
            </div>
        );
    }
}

export default ProductDescription;