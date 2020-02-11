import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import Shoutout from '../components/Shoutout'

const MainList = props => {
    return <Container>
        <Header as='h1'>{props.heading}</Header>
        <Feed>
            {
                props.shoutouts.map((m,i) => <Shoutout key={i} mention={m} />)
            }
        </Feed>
    </Container>
}

export default MainList