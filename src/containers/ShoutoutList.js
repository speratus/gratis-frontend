import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import SidebarShoutout from '../components/SidebarShoutout'

const ShoutoutList = props => {
    return <Container>
        <Header as='h2'>Your Shoutouts</Header>
        <Feed>
            {
                props.shoutouts.map((s, i) => <SidebarShoutout shoutout={s} key={i}/>)
            }
        </Feed>
    </Container>
}

export default ShoutoutList