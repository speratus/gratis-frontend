import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import Shoutout from '../components/Shoutout'

const SidebarList = props => {
    return <Container>
        <Header as='h2'>{props.heading}</Header>
        <Feed>
            {
                props.shoutouts.map((s, i) => <Shoutout 
                    shoutout={s} 
                    key={i} 
                    small={props.small} 
                    includeHeader={props.includeHeader}
                    removeUser={props.removeUser}
                    editable={props.editable}
                    onEdit={props.onEdit}
                />)
            }
        </Feed>
    </Container>
}

export default SidebarList