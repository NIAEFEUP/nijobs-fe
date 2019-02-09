import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

const style = {
    formControl: {
        minWidth: 120
    }
};

class OutlinedSelector extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                label: PropTypes.string,
            })
        ).isRequired,
        handleChange: PropTypes.func.isRequired,
        className: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this.state = {
            labelWidth: 0
        };
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }


    render() {

        
        const { label, name, value, options, handleChange, classes, className } = this.props;

        return (
            
            <FormControl
                variant="outlined"
                className={`${classes.formControl} ${className}`}
            >
                <InputLabel
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor={name}
                >
                    {label}
                </InputLabel>
                <Select
                    value={value}
                    onChange={handleChange}
                    autoWidth
                    input={
                        <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name={name}
                            id={name}
                        />
                    }
                >
                
                    {options.map(({value, label}, i) => {
                        return (
                            <MenuItem
                                value={value}
                                key={i}
                            >
                                {label}
                            </MenuItem>
                        );
                    })}
                    
                    
                </Select>

            </FormControl>
        );
    }
}

export default withStyles(style)(OutlinedSelector);