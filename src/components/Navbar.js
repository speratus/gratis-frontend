import React from 'react'
import {
    Container,
    Menu
} from 'semantic-ui-react'

import {Link} from 'react-router-dom'


const Navbar = props => {
    return <Menu fixed='top' inverted>
        <Container>
            <Menu.Menu position='right' >
                <Menu.Item as={Link} to='/login'>Login</Menu.Item>
                <Menu.Item as={Link} to='/signup'>Signup</Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
}

export default Navbar