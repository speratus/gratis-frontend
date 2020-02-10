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
        console.log(value)
        const results = friends.filter(f => {
            console.log(f)
            const user = f.username.startsWith(value)
            console.log(user)
            return user
        })
        this.setState({results: results.map(f => {
            return {title: f.name, description: f.username, image: f.avatar}
        })})
    }

    onResultSelect = (e, {result}) => {
        this.props.selectUser(result)
    }

    render() {
        console.log(this.props.friends)
        return <Modal open={this.props.open}>
            <Modal.Header>Select a user to Mention</Modal.Header>
            <Modal.Content>
                <Search
                    onSearchChange={this.onSearchChange}
                    onResultSelect={this.onResultSelect}
                    value={this.state.value}
                    results={this.state.results}
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