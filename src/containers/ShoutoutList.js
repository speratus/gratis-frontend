import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import Shoutout from '../components/Shoutout'

const ShoutoutList = props => {
    return <Container>
        <Header as='h1'>{props.heading}</Header>
        <Feed>
            {
                props.shoutouts.map((m,i) => <Shoutout 
                    key={i} 
                    shoutout={m} 
                    small={props.small} 
                    includeHeader={props.includeHeader}
                    removeUser={props.removeUser}
                />)
            }
        </Feed>
    </Container>
}

export default ShoutoutList