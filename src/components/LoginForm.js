import React from 'react'
import {Button, Form, Grid, Header, Segment, Message} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import {baseURL} from '../index'

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        fetch(baseURL+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({...this.state})
        }).then(res => res.json()).then(message => {
            localStorage.setItem('token', message.token)
            this.props.history.push({pathname: '/', state: {loggedIn:true}})
            this.props.setLoggedIn(true)
        })
        this.setState({username: '', password: ''})
    }

    render() {
        return <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 500}}>
                <Header>Please Log in</Header>
                <Form onSubmit={this.onSubmit}>
                    <Segment>
                        <label>Username</label>
                        <Form.Input 
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Username'
                            name='username'
                            onChange={this.onChange}
                            value={this.state.username}
                        />
                        <label>Password</label>
                        <Form.Input 
                            fluid 
                            icon='lock' 
                            iconPosition='left' 
                            placeholder='Password' 
                            type='password'
                            name='password'
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <Button fluid>Login</Button>
                    </Segment>
                </Form>
                <Message>
                    Don't have an account? &nbsp;<Link to='/signup'>Signup</Link>
                </Message>
            </Grid.Column>
        </Grid>
    }
}

export default withRouter(LoginForm)