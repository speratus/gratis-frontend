import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import Mention from '../components/Mention'

const MyMentionsList = props => {
    return <Container>
        <Header as='h1'>You've been thanked!</Header>
        <Feed>
            {
                props.mentions.map((m,i) => <Mention key={i} mention={m} />)
            }
        </Feed>
    </Container>
}

export default MyMentionsList