import React from 'react'

import {Modal, Search, Button, Menu, Icon} from 'semantic-ui-react'
import {baseURL} from '../index'

class UserSearchModal extends React.Component {

    state = {
        value: '',
        results: [],
        people: []
    }

    componentDidMount() {
        fetch(baseURL+'users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Access-Token': localStorage.getItem('token')
            }
        }).then(res => res.json()).then(users => {
            const people = users.map(u => {
                return {
                    title: u.name,
                    description: u.username,
                    image: u.avatar,
                    ...u
                }
            })
            this.setState({people: people})
        })
    }

    onSearchChange = (e, {value}) => {
        const results = this.state.people.filter(p => {
            const {username, name} = p
            return username.startsWith(value) || name.toLowerCase().startsWith(value)
        })

        this.setState({results: results, value: value})
    }

    render() {
        return <Modal 
                    dimmer='blurring'
                    trigger={<Menu.Item as='a'><Icon name="address book outline" />Search People</Menu.Item>}
                    closeIcon
                >
            <Modal.Header>Search for people by username or by name</Modal.Header>
            <Modal.Content>
                <Search 
                    onSearchChange={this.onSearchChange}
                    value={this.state.value}
                    results={this.state.results}
                    autoFocus
                />
            </Modal.Content>
        </Modal>
    }
}

export default UserSearchModal