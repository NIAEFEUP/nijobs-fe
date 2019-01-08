import React, { Component } from 'react'

class OtherPage extends Component {
    render() {
        return (
            <div>
                This other page has url params! ID = 
                {' '}
                {this.props.match.params.id}
            </div>
        )
    }
}

export default OtherPage;