import React from 'react';
import PropTypes from 'prop-types';

import productDescriptionStyle from './ProductDescription.module.css';

const ProductDescription = props => {

    const {setRef} = props;
    const ref = React.useRef(null);
    setRef(ref);
    
    return (
        <div 
            ref={ref}
            className={productDescriptionStyle.container}
        >
                Other content, like what is this for and cool vector and stock images with no copyright
        </div>
    );
};

ProductDescription.propTypes = {
    setRef: PropTypes.func.isRequired
};

export default ProductDescription;