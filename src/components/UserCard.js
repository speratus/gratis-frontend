import React from 'react'

import {Card, Image, CardContent, Button} from 'semantic-ui-react'

const UserCard = props => {

    const {name, username, bio, tagline, avatar} = props.user
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
                <Button basic color='green'>{props.friend ? 'Following' : 'Add Friend'}</Button>
            </CardContent>
        </Card.Content>
    </Card>

}

export default UserCard