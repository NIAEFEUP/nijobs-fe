import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const SubmitSearchButton = ({submitSearch}) => {
    return (
        <Button 
            variant="filled"
            color="primary"
            onClick={submitSearch}
        >
            Search
        </Button>
    );
};

SubmitSearchButton.propTypes = {
    submitSearch: PropTypes.func.isRequired
};

export default SubmitSearchButton;