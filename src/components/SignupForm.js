import React from 'react'

import {Grid, Form, Button, Header, Segment} from 'semantic-ui-react'

class SignupForm extends React.Component {
    state = {
        username: '',
        name: '',
        email: '',
        password: '',
        'password_confirmation': ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 500}}>
                <Header>Please Signup</Header>
                <Segment>
                    <Form>
                        <label>Name</label>
                        <Form.Input 
                            fluid
                            name="name"
                            placeholder='Name'
                            onChange={this.onChange}
                            value={this.state.name}
                        />
                        <label>Username</label>
                        <Form.Input 
                            fluid
                            name="username"
                            placeholder="Username"
                            onChange={this.onChange}
                            value={this.state.username}
                        />
                        <label>Email</label>
                        <Form.Input 
                            fluid
                            name="email"
                            placeholder="Email address"
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                        <label>Password</label>
                        <Form.Input 
                            fluid
                            name='password'
                            placeholder='Password'
                            type="password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <label>Confirm Password</label>
                        <Form.Input 
                            fluid
                            name='confirm_password'
                            placeholder='Confirm Password'
                            type='password'
                            onChange={this.onChange}
                            value={this.state['password_confirmation']}
                        />
                        <Button fluid >Submit</Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    }
}

export default SignupForm