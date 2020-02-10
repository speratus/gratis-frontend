import React from 'react'
import {
    Container,
    Menu,
    Icon,
} from 'semantic-ui-react'

import {Link} from 'react-router-dom'

import NewShoutoutForm from './NewShoutoutForm'


const Navbar = props => {

    const loggedInRender= () => {
        if (props.loggedIn) {
            return <Menu.Item as="a" onClick={props.onLogout}>Logout</Menu.Item>
        } else {
            return <React.Fragment>
                <Menu.Item as={Link} to='/login'><Icon name="user"/>Login</Menu.Item>
                <Menu.Item as={Link} to='/signup'>Signup</Menu.Item>
            </React.Fragment>
        }
    }

    return <Menu fixed='top' inverted>
        <Container>
            <Menu.Item as={Link} to='/'><Icon name="home"/>Home</Menu.Item>
            <Menu.Menu position='right' >
                {loggedInRender()}
            </Menu.Menu>
        </Container>
    </Menu>
}

export default Navbar