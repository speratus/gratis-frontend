import React from 'react'

import {Modal, Form, TextArea, Button, Header, Segment} from 'semantic-ui-react'
import MentionSelector from './MentionSelector'
import Mention from './Mention'

class NewShoutoutForm extends React.Component {
    state = {
        content: "",
        mentionedUsers: [],
        showingMentioner: false
    }

    maxChars = 256

    mentionsLength = () => {
        const length = this.state.mentionedUsers.map(u => u.username).join("").length
        return length
    }

    totalLength = () => {
        const length =  this.mentionsLength() + this.state.content.length
        return length
    }

    remainingWidget = () => {
        return `${this.maxChars - this.totalLength()}/${this.maxChars}`
    }

    closeModal = () => {
        this.setState({open: false, content: ""})
    }

    justAdded = newContent => {
        return newContent.substring(this.state.content.length)
    }

    calculateAddition = newContent => { 
        const effect = this.justAdded(newContent)
        return effect.length
    }

    onType = e => {
        if (this.justAdded(e.target.value) === '@') {
            this.setState({showingMentioner: true})
            return
        }

        if ((this.totalLength() + this.calculateAddition(e.target.value)) <= this.maxChars) {
            this.setState({content: e.target.value})
        } else {
            console.log('content is too long')
        }
    }

    cancelMention = () => {
        this.setState({showingMentioner: false})
    }

    selectUser = user => {
        this.setState({showingMentioner: false, mentionedUsers: [...this.state.mentionedUsers, user]})
    }

    render() {
        return <Modal 
                    open={this.props.open} 
                    dimmer='blurring'
                >
            <Modal.Header>Thank Somebody!</Modal.Header>
            <Modal.Content>
                <p>Type @ and a username to mention a user.</p>
                <p>You have 256 characters in which to write your message</p>
                <Form>
                    <TextArea 
                        placeholder="Thanks! You're a great friend" 
                        onChange={this.onType} 
                        value={this.state.content}
                    />
                    <Header.Subheader>Remaining: {this.remainingWidget()}</Header.Subheader>
                    <Button color='green'>Save Shoutout</Button>
                    <Button color='red' onClick={this.props.hideModal}>Cancel</Button>
                </Form>
            </Modal.Content>
            <MentionSelector 
                open={this.state.showingMentioner}
                friends={this.props.friends}
                cancelMention={this.cancelMention}
                selectUser={this.selectUser}
            />
        </Modal>
    }
}

export default NewShoutoutForm