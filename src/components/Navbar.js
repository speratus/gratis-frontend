import React from 'react'
import {
    Container,
    Menu,
    Icon,
    MenuItem
} from 'semantic-ui-react'

import {Link} from 'react-router-dom'


const Navbar = props => {

    const newShoutoutIfLoggedIn = () => {
        if (props.loggedIn) {
            return <Menu.Item as='a'><Icon name='add'/>Thank somebody!</Menu.Item>
        }
    }

    return <Menu fixed='top' inverted>
        <Container>
            <Menu.Item as={Link} to='/'><Icon name="home"/>Home</Menu.Item>
            {newShoutoutIfLoggedIn()}
            <Menu.Menu position='right' >
                <Menu.Item as={Link} to='/login'><Icon name="user"/>Login</Menu.Item>
                <Menu.Item as={Link} to='/signup'>Signup</Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
}

export default Navbar