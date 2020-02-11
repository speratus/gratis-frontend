import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import SidebarShoutout from '../components/SidebarShoutout'

const SidebarList = props => {
    return <Container>
        <Header as='h2'>{props.heading}</Header>
        <Feed>
            {
                props.shoutouts.map((s, i) => <SidebarShoutout shoutout={s} key={i}/>)
            }
        </Feed>
    </Container>
}

export default SidebarList