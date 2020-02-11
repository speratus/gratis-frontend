import React from 'react'

import {Grid, Card, Container, Header} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

import UserCard from '../components/UserCard'
import {baseURL} from '../index'

class FriendsContainer extends React.Component {

    state = {
        allData: {},
        friends: []
    }

    componentDidMount() {
        fetch(baseURL+'profile', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Access-Token': localStorage.getItem('token')
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                allData: data,
                friends: data.friends
            })
        })
    }
    
    renderIfLoggedIn = () => {
        if (this.props.loggedIn) {
            const {friends} = this.state
            return friends.map((f, i) => (
                <Grid.Column>
                    <Card.Group>
                        <UserCard friend user={f} key={i} />
                    </Card.Group>
                </Grid.Column>
            ))
        } else {
            return <Redirect to='/login' />
        }
    }

    render() {
        return <Container style={{marginTop: '8em'}}>
            <Header as='h1'>Your friends</Header>
            <Grid columns={4}>
                {this.renderIfLoggedIn()}
            </Grid>
        </Container>
    }

}

export default FriendsContainer