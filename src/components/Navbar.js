import React from 'react'
import {
    Container,
    Menu,
    Icon,
} from 'semantic-ui-react'

import {Link, withRouter} from 'react-router-dom'
import UserSearchModal from './UserSearchModal'

const Navbar = props => {

    const loggedInRightRender = () => {
        if (props.loggedIn) {
            return <React.Fragment>
                <Menu.Item to={`/users/${props.currentUserId}`} as={Link}><Icon name="user"/>Profile</Menu.Item>
                <Menu.Item as="a" onClick={props.onLogout}>Logout</Menu.Item>
            </React.Fragment>
        } else {
            return <React.Fragment>
                <Menu.Item as={Link} to='/login'><Icon name="user"/>Login</Menu.Item>
                <Menu.Item as={Link} to='/signup'>Signup</Menu.Item>
            </React.Fragment>
        }
    }

    const displayUserPage = user => {
        console.log('displaying user', user)
        props.history.push({pathname: `/users/${user.id}`, state: {loggedIn: true}})
    }

    const loggedInLeftRender = () =>  {
        if (props.loggedIn) {
            return <React.Fragment>
                <Menu.Item as={Link} to='/friends'><Icon name='users' />Friends</Menu.Item>
                <UserSearchModal selectUser={displayUserPage}/>
            </React.Fragment>
        }
    }

    return <Menu fixed='top' inverted>
        <Container>
            <Menu.Item as={Link} to='/'><Icon name="home"/>Home</Menu.Item>
            {loggedInLeftRender()}
            <Menu.Menu position='right' >
                {loggedInRightRender()}
            </Menu.Menu>
        </Container>
    </Menu>
}

export default withRouter(Navbar)