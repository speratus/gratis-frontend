import React from 'react'

import {Modal, Search, Button} from 'semantic-ui-react'

class MentionSelector extends React.Component {
    state = {
        value: '',
        results: [],
    }

    onSearchChange = (e, {value}) => {
        const {friends} = this.props
        this.setState({value: value})
        // console.log(value)
        const results = friends.filter(f => (
            f.username.startsWith(value) || f.name.toLowerCase().startsWith(value.toLowerCase())
            ))
        this.setState({results: results.map(f => {
            return {title: f.name, description: f.username, image: f.avatar, ...f}
        })})
    }

    onResultSelect = (e, {result}) => {
        this.props.selectUser(result)
    }

    render() {
        return <Modal open={this.props.open}>
            <Modal.Header>Select a user to Mention</Modal.Header>
            <Modal.Content>
                <label>Type the username you want to find below</label>
                <Search
                    onSearchChange={this.onSearchChange}
                    onResultSelect={this.onResultSelect}
                    value={this.state.value}
                    results={this.state.results}
                    autoFocus
                ></Search>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={this.props.cancelMention}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    }
}

export default MentionSelector