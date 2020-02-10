import React from 'react'

import {Modal, Form, TextArea, Button, Header, Segment} from 'semantic-ui-react'

class NewShoutoutForm extends React.Component {
    state = {
        content: "",
        maxChars: 256,
    }

    closeModal = () => {
        this.setState({open: false, content: ""})
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
                    <TextArea placeholder="Thanks! You're a great friend"/>
                    <Button color='green'>Save Shoutout</Button>
                    <Button color='red' onClick={this.props.hideModal}>Cancel</Button>
                </Form>
            </Modal.Content>
        </Modal>
        // return <Segment>
        //     <Header as='h1'>Create a new Shoutout</Header>
        //     <p> Type @ followed by a username to create a new mention</p>
        //     <Form>
        //         <TextArea placeholder="Thanks! You're a great friend"/>
        //         <Button color="green">Save Shoutout</Button>
        //         <Button color="red">Cancel</Button>
        //     </Form>
        // </Segment>
    }
}

export default NewShoutoutForm