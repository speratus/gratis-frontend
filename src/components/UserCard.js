import React from 'react'

import {Card, Image, CardContent, Button} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

import {baseURL} from '../index'

const UserCard = props => {

    const {id, name, username, bio, tagline, avatar} = props.user

    const clickButton = () => {
        if (props.friend) {
            props.history.push({pathname: `/users/${id}`, state: {loggedIn: true}})
        } else {
            fetch(baseURL+'friendships', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Access-Token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    friendship: {
                        follower_id: localStorage.getItem('id'),
                        followee_id: id,
                        status: 'following'
                    }
                })
            }).then(res => res.json()).then(console.log)
        }
    }

    return <Card>
        <Card.Content>
            <Image 
                floated='right'
                size='mini'
                src={avatar}
            />
            <Card.Header>{name}</Card.Header>
            <Card.Meta>{username}</Card.Meta>
            <Card.Description>
                {tagline}
            </Card.Description>
            <CardContent extra>
                {bio}
            </CardContent>
            <CardContent extra>
                <Button basic color='green' onClick={clickButton}>{props.friend ? 'View page' : 'Add Friend'}</Button>
            </CardContent>
        </Card.Content>
    </Card>

}

export default withRouter(UserCard)