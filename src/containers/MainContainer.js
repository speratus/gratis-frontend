import React from 'react'
import WelcomeComponent from '../components/WelcomeComponent'

class MainContainer extends React.Component {

    state = {
        mentions: []
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            //Fetch mentions
        }
    }

    renderHomeIfLoggedIn() {
        console.log('Rendering main')
        if (this.state.mentions.length > 0) {
            console.log('rendering mentions')
            //Render Mentions
            return null
        } else {
            console.log('rendering welcome')
            return <WelcomeComponent />
        }
    }

    render() {
        return <React.Fragment>
            {this.renderHomeIfLoggedIn()}
        </React.Fragment>
    }
}

export default MainContainer