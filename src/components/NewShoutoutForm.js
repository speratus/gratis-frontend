import React from 'react'

import {Modal, Form, TextArea, Button, Header, Container, Dropdown} from 'semantic-ui-react'
import MentionSelector from './MentionSelector'
import {baseURL} from '../index'

class NewShoutoutForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.initialState
        }
        if (props.shoutout.id) {
            console.log('got a shoutout')
            const {content, mentions} = props.shoutout
            this.state = {
                content: content,
                mentionedUsers: mentions.map(m => m.user)
            }
        } else {
            console.log("didn't get a shoutout")
            
        }
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('checking props', props, 'state:', state)
        if (props.shoutout !== state.prevShoutout) {
            // console.log('change detected', state.shoutout, 'is not', props.shoutout)
            const {content, mentions} = props.shoutout
            const users = mentions.map(m => m.user)
            const prefix = users.map(u => `@${u.username}`).join(' ')
            return {
                prevShoutout: props.shoutout,
                content: prefix + content,
                mentionedUsers: users,
                removeThreshold: prefix.length
            }
        }
        return null
    }

    initialState = {
        content: this.props.shoutout.content,
        mentionedUsers: this.props.shoutout.mentions.map(m => m.user),
        removeThreshold: 0,
        showingMentioner: false,
        visibility: 'friends',
        hasChanged: false
    }

    visibilityOptions = [
        {
            key: "friends",
            value: 'friends',
            text: 'Friends Only'
        },
        {
            key: 'public',
            value: 'public',
            text: 'Public'
        }
    ]

    maxChars = 256

    mentionsLength = (usersList) => {
        if (usersList) {
            return this.contentPrefix(usersList).length
        } else {
            return this.contentPrefix().length
        }
    }

    totalLength = () => {
        console.log(this.state)
        const length = this.mentionsLength() + this.contentSuffix(this.state.content).length
        // const length = this.mentionsLength() + this.state.content.length
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

    contentPrefix = (userList) => {
        if (userList) {
            return userList.map(u => `@${u.username}`).join(' ')
        } else {
            return this.state.mentionedUsers.map(u => `@${u.username}`).join(' ')
        }
    }

    contentSuffix = content => {
        return content.substring(this.contentPrefix().length)
    }

    onType = e => {
        if (this.justAdded(e.target.value) === '@') {
            this.setState({showingMentioner: true})
            return
        }
        // console.log('threshold:', this.state.removeThreshold, 'length:', e.target.value.length, 'content:', e.target.value)
        if (e.target.value.length < this.state.removeThreshold) {
            const users = [...this.state.mentionedUsers]
            users.pop()
            let content = e.target.value
            this.setState({
                mentionedUsers: users,
                content: this.contentPrefix(users) + this.contentSuffix(content),
                removeThreshold: this.mentionsLength(users)
            })
            return
        }

        if ((this.totalLength() + this.calculateAddition(e.target.value)) <= this.maxChars) {
            this.setState({
                content: this.contentPrefix() + this.contentSuffix(e.target.value),
                removeThreshold: this.mentionsLength()
            })
        } else {
            console.log('content is too long')
        }
    }

    cancelMention = () => {
        this.setState({showingMentioner: false})
    }

    selectUser = user => {
        // console.log('selected user', user)
        // console.log('mentions length', this.mentionsLength())
        const content = this.contentSuffix(this.state.content)
        const newUsers = [...this.state.mentionedUsers, user]
        this.setState({
            showingMentioner: false, 
            mentionedUsers: newUsers,
            removeThreshold: this.mentionsLength(newUsers),
            content: this.contentPrefix(newUsers) + content
        })
    }

    onSubmit = e => {
        e.preventDefault()
        
        const content = this.contentSuffix(this.state.content)
        const mentions = this.state.mentionedUsers.map(u => {return {user_id: u.id}})
        const messageBody = {
            user_id: this.props.currentUserId,
            content: content,
            mentions_attributes: mentions,
            visibility: this.state.visibility
        }  
        console.log('sending message', messageBody)

        if (!this.props.shoutout.id) {
            fetch(baseURL+'shoutouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(messageBody)
            }).then(res => res.json()).then(shoutout => {
                console.log('received new shoutout', shoutout)
                this.props.addShoutout(shoutout)
                this.props.hideModal()
            })
        } else {
            fetch(baseURL+`shoutouts/${this.props.shoutout.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Token': localStorage.getItem('token')
                },
                body: JSON.stringify(messageBody)
            }).then(res => res.json()).then(shoutout => {
                console.log('received shoutout', shoutout)
                this.props.replaceShoutout(shoutout)
                this.props.hideModal()
            })
        }

    }

    onDropdownChange = e => {
        this.setState({visibility: e.target.value})
    }

    selectContent() {
        if (this.props.shoutout.id) {
            console.log('got a shoutout')
            const {content, mentions} = this.props.shoutout
            this.setState({
                content: content,
                mentionedUsers: mentions.map(m => m.user)
            })
        }
    }

    deleteShoutout = () => {
        fetch(baseURL+`shoutouts/${this.props.shoutout.id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Access-Token': localStorage.getItem('token')
            }
        }).then(res => res.json()).then(message => {
            console.log('the message is', message)
            this.props.removeShoutout(message.shoutout)
            this.props.hideModal()
        })
    }

    renderDeleteButton = () => {
        if (this.props.shoutout.id) {
            return <Modal.Actions>
                <Button onClick={this.deleteShoutout} color='red'>Delete Shoutout</Button>
            </Modal.Actions>
        }
    }

    render() {
        // this.selectContent()
        return <Modal 
                    open={this.props.open}
                    dimmer='blurring'
                    // trigger={this.props.trigger}
                >
            <Modal.Header>Thank Somebody!</Modal.Header>
            <Modal.Content>
                <p>Type @ to search for a user to mention.</p>
                <p>You have 256 characters in which to write your message</p>
                <label htmlFor="visibility">Select the visibility of your shoutout: </label>
                <Dropdown
                    placeholder="Select Visibility"
                    options={this.visibilityOptions}
                    name="visibility"
                    value={this.state.visibility}
                    onChange={this.onDropdownChange}
                />
                <Form
                    onSubmit={this.onSubmit}
                >
                    <TextArea 
                        placeholder="Thanks! You're a great friend" 
                        onChange={this.onType} 
                        value={this.state.content}
                        autoFocus
                    />
                    <Header.Subheader>Remaining: {this.remainingWidget()}</Header.Subheader>
                    <Button type='submit' color='green'>Save Shoutout</Button>
                    <Button color='red' onClick={() => {
                        this.setState({...this.initialState})
                        this.props.hideModal()
                        }}>Cancel</Button>
                </Form>
            </Modal.Content>
            {this.renderDeleteButton()}
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