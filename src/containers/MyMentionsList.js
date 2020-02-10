import React from 'react'

import {Feed, Container, Header} from 'semantic-ui-react'

import Gratis from '../components/Gratis'

const MyMentionsList = props => {
    return <Container>
        <Header>You've been thanked!</Header>
        <Feed>
            {
                props.mentions.map((m,i) => <Gratis key={i} mention={m} />)
            }
        </Feed>
    </Container>
}

export default MyMentionsList