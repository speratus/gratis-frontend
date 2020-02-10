import React from 'react'
import {Container, Header} from 'semantic-ui-react'

const WelcomeComponent = () => {
    console.log('Hello from Welcome Component')
    return <Container text>
        <Header 
            as='h1'
            content='Welcome to Gratis'
            style={{
                fontSize: '4em',
                marginTop: '3em'
            }}
        />
    </Container>
}

export default WelcomeComponent