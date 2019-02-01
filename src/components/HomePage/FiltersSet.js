import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { withStyles } from '@material-ui/core/styles';

const style = {
    root: {
        verticalAlign: 'middle',
        marginRight:'1em'
    }
};


class FiltersSet extends Component {
    
    static propTypes = {
        classes: PropTypes.object,
        name: PropTypes.string,
        checkboxes: PropTypes.array
    }

    constructor(props) {
        super(props);

        const initialStateCheckboxes = props.checkboxes.map(({flag, value}) => ({
            flag, 
            value,
        }));

        this.state= {
            checkboxes: [...initialStateCheckboxes],
        };
    }
    
    handleChangeCheckbox = index => event => {
        event.persist();
        this.setState((prevState) => {
            let newCheckboxes = [...prevState.checkboxes];

            newCheckboxes[index].value = event.target.checked;

            return {
                checkboxes: [...newCheckboxes]

            };
                
        });
    };
  
    render() {

        const {classes, name} = this.props;
        return (
            <React.Fragment>
                <FormLabel
                    classes={{
                        root: classes.root
                    }}    
                >
                    {name}
                </FormLabel>

                <br/>
                
                {this.state.checkboxes.map(({flag, value}, i) => {
                    return (
                        
                        <FormControlLabel
                            key={i}
                            control={
                                <Switch
                                    key={i}
                                    checked={value}
                                    onChange={this.handleChangeCheckbox(i)}
                                    name={flag}
                                    value={value}
                                    color='primary'
                                />
                            }
                            label={flag}
                        />
                    );
                })}

            </React.Fragment>            
        );
    }
}

export default withStyles(style)(FiltersSet);
